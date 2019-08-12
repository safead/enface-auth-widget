import QrCode from 'qrcode';

export const QrCodeImage = value => {
  return new Promise( res => {
    QrCode.toDataURL( value, {
      color: {
        dark: '#000'
      }, width: 300
    }, ( err, url ) => {
      err && console.error( '[err]', value );
      res( url );
    } );
  } );
};
