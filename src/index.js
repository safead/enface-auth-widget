import * as constants from './constants';
import * as templates from './templates';
import { QrCodeImage } from './qrcode';

export const EnfaceAuthWidget = function ( {
  url,
  onUserAuthInfo,
  onChangeState,
  onAuthorized,
  onFailed
} ) {
  if ( typeof onUserAuthInfo !== 'function' ) {
    console.error( 'You should provide a "onUserAuthInfo" function to send user authorization info' );
    return;
  }
  if ( typeof onChangeState !== 'function' ) {
    console.error( 'Please provide an "onChangeState" callback' );
    return;
  }
  if ( typeof onAuthorized !== 'function' ) {
    console.error( 'Please provide an "onAuthorized" callback to process user authorization data on the client side' );
    return;
  }
  this._DEBUG = false;
  this.url = url;
  this.isHttp = this.url.startsWith( 'http' );
  this.url.endsWith( '/' ) && ( this.url = this.url.substring( 0, this.url.length - 1 ) );
  this.isHttp && ( this.url += constants.HTTP_URI );
  this.onUserAuthInfo = onUserAuthInfo;
  this.onChangeState = onChangeState;
  this.onAuthorized = onAuthorized;
  this.onFailed = onFailed || null;
  this.wsResolver = null;
  this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( navigator.userAgent );
  this.init();
};

EnfaceAuthWidget.prototype.log = function ( value ) {
  this._DEBUG && console.log( value );
};

EnfaceAuthWidget.prototype.logError = function ( value ) {
  this._DEBUG && console.error( value );
};

EnfaceAuthWidget.prototype.init = function () {
  if ( !this.checkEnvironment() ) return;
  const userData = this.onUserAuthInfo() || null;
  const request = {
    _: userData
      ? constants.COMMAND_ENABLE
      : constants.COMMAND_AUTH
  };
  userData && ( request.userData = userData );
  this.button.onclick = function () {
    this.cancel();
    this.send( request );
  }.bind( this );
  userData && this.send( {
    _: constants.COMMAND_STATUS,
    userData
  } );
};

EnfaceAuthWidget.prototype.wsBackendConnect = function () {
  return new Promise( function ( resolve, reject ) {
    if ( this.ws ) {
      resolve( constants.WS_ALREADY_CONNECTED );
      return;
    }
    this.ws = new WebSocket( this.url );
    this.ws.onopen = function () {
      resolve( constants.CONNECTED );
    };
    this.ws.onclose = function () {
      this.cancel( constants.WS_CONNECTION_CLOSE );
    }.bind( this );
    this.ws.onmessage = function ( event ) {
      this.log( '[ws.onmessage] event.data', event.data );
      if ( this.wsResolver ) {
        this.wsResolver.resolve( event.data );
        delete this.wsResolver;
      } else this.readMessage( event.data );
    }.bind( this );
    this.ws.onerror = function () {
      reject( constants.WS_CONNECTION_FAILED );
    };
  }.bind( this ) );
};

EnfaceAuthWidget.prototype.send = function ( command ) {
  return (
    this.isHttp
      ? this.sendHttp( command )
      : this.sendWs( command )
  )
    .then( function ( data ) {
      this.log( '[EnfaceAuthWidget.send] resolved', data );
      this.readMessage( data );
    }.bind( this ) )
    .catch( function ( error ) {
      this.logError( '[send]', error );
      this.cancel();
    }.bind( this ) );
};

EnfaceAuthWidget.prototype.sendWs = function ( command ) {
  return new Promise( function ( resolve, reject ) {
    this.wsResolver = { resolve, reject };
    this
      .wsBackendConnect()
      .then( function () {
        this.ws.send( JSON.stringify( command ) );
      }.bind( this ) )
      .catch( function ( error ) {
        this.wsResolver && this.wsResolver.reject( error );
      }.bind( this ) );
  }.bind( this ) );
};

EnfaceAuthWidget.prototype.sendHttp = function ( command ) {
  this.controller = new AbortController();
  this.log( 'go to http fetch', command );
  return fetch( this.url, {
    signal: this.controller.signal,
    method: 'post',
    headers: constants.HTTP_HEADERS,
    body: JSON.stringify( command )
  } )
    .then( function ( res ) { return res.text(); } );
};

EnfaceAuthWidget.prototype.cancel = function ( reason ) {
  this.log( `[EnfaceAuthWidget.cancel] ${reason}` );
  if ( this.ws ) {
    this.ws.close();
    this.ws = null;
    this.wsResolver && this.wsResolver.reject( new Error( reason ) );
    this.wsResolver = null;
  } else if ( this.controller ) {
    this.controller.abort();
    this.controller = null;
  }
  this.hideQr();
};

EnfaceAuthWidget.prototype.readMessage = function ( message ) {
  try {
    const data = JSON.parse( message );
    this.log( `[EnfaceAuthWidget.readMessage] ${ JSON.stringify( data ) }` );
    switch ( data._ ) {
      case constants.COMMAND_ERROR:
        this.logError( `Server error: ${data.message}` );
        this.cancel();
        break;
      case constants.COMMAND_STATUS:
        this.onChangeState( data.isActive );
        this.cancel();
        break;
      case constants.COMMAND_AUTH:
      case constants.COMMAND_ENABLE:
        this.log( 'Server has initiated enable/auth chain' );
        this.showQr( {
          t: data.token,
          u: data.id
        } );
        this.isHttp && this.send( {
          _: data._,
          clientId: data.clientId
        } );
        break;
      case constants.COMMAND_TOKEN:
        this.log( `Biometric signin successfull. Token: ${data.token}` );
        if ( data.token ) {
          this.onAuthorized( data.token );
        } else {
          this.onFailed( 'We don\'t know you' );
        }
        this.hideQr();
        break;
      case constants.COMMAND_FAILED:
        this.logError( 'Biometric signin failed.' );
        this.onFailed && this.onFailed();
        break;
      default:
        this.logError( new Error( 'Unknown command' ) );
        break;
    }
  } catch ( error ) {
    this.logError( 'Wrong data', error );
    this.cancel( error );
  }
};

EnfaceAuthWidget.prototype.showQr = function ( data ) {
  data = JSON.stringify( data );
  this.hideQr();
  this.qrDiv = document.createElement( 'DIV' );
  this.qrDiv.innerHTML = templates.qrCode;
  this.qrDiv.onclick = this.cancel.bind( this );
  document.body.appendChild( this.qrDiv );
  QrCodeImage( data ).then( function ( imageUrl ) {
    this.qrDiv
      .querySelector( '#qrCodeImage' )
      .src = imageUrl;
  }.bind( this ) );
};

EnfaceAuthWidget.prototype.hideQr = function () {
  if ( !this.qrDiv ) return;
  this.qrDiv.parentNode.removeChild( this.qrDiv );
  this.qrDiv = null;
};

EnfaceAuthWidget.prototype.checkEnvironment = function () {
  if ( !this.isHttp && typeof WebSocket === 'undefined' ) {
    console.error( 'This browser do not supports WebSockets. Enface authentification will not work correctly.' );
    return false;
  } if ( this.isHttp && typeof AbortController === 'undefined' ) {
    console.error( 'This browser do not supports AbortController. Enface authentification will not work correctly.' );
    return false;
  }
  const buttonHolder = document.getElementById( constants.BUTTON_HOLDER_ID );
  if ( !buttonHolder ) {
    console.error( `[Enface auth] Element with id="${constants.BUTTON_HOLDER_ID}" not found on the page` );
    return false;
  }
  if ( buttonHolder.innerHTML ) {
    this.button = buttonHolder;
  } else {
    buttonHolder.innerHTML = templates.button;
    this.button = document.getElementById( constants.BUTTON_ID );
  }
  return !!this.button;
};
