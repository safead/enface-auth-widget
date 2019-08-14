# Enface biometric authentication (browser widget)

![Hello World](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAACWCAMAAAAMsZ2AAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGAUExURRW89S3D9gCq5AVadgN1mwZFWAwQEAy59czx/WrU+QC//0VNTgGYywwMCvn9/0XK91XO+ACx7Nz1/aPk+wC490vM9wg7S2PS+Ojo6ITc+gDA/+j4/hu+9VzR+AGTxARlhJvi+wC8/MPu/Lrr/CXB9gN7owkqNHza+QGc0AVUbQC6+Yze+vX8/+36/jPF9tLy/QKBq7Pp/LGyswkjK3HW+QNqiwC5+DrH9+H2/gVgfqjm+wGi2ACu6TA0NQDC/w0FAfH7/pXh+gKMuwZMYgCm3gC7+Nf0/QC18QgxPeX4/gC28w0IBQGf1dTz/QC9/godIgGWyARvkgDF/wKJtQC8+woZHAKFsPz+/63o+yC/9Qi49AW39ACj2gC//QCz7wsUFQK39BIWFgwQDwC39fP8/pDf+gC18wKQvwC7+wCn3wwODj/I93fY+dXp793t8iPJ/X6GiKSioRjO/wbA/i5YZhJkfTvL+/j4+MDBwQRnh2tubvP4+fb29gCp4QC29P///wAsppkAAACAdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AOAVLZwAACn5JREFUeNrsm/tf4kgSwAMSwKwBUcS1fcYHA6gjLhpfTOKKOkg0iILvERdmMkz07nbvbu/WuzP+61cdQAEDCZDs3Q9bn/mBQbq+6eqq7qp0N/FsVDzr7ov5lX6vzUaoYrN5+1dGBqcHFgyrIIz9bGBzZWjWpWjI1aW3d2rJNJjn6IuXuFNaCXE/4l4wATY6OORSDMi198eBLmEHIzbFsMw+7HcBGx0ZU9oSYmWgQ9j5oE1pWy7nP3cC2++/UzqR++n2YYNjSofimve0B1t4uFY6l/HRdmCj/UpXsnZkHLa+pnQps26jsIH3imIJTQN2YAILaEtGYNtexRSxrRuADSsmiXdbF/ZFMU169WDTLvNg15ut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
)

Enface offers biometric authorization feature for any websites (or apps) using [Enface application](https://apps.apple.com/us/app/enface/id1464761858 "Enface application") and neural networks face recognition engine. Our authentication process is based on strong cryptographic algorithms combined with biometric user's data.

To enable our solution you should pass the following steps:

- Integrate the [EnfaceAuth library](https://github.com/safead/enface-auth-node "EnfaceAuth library") with your backend.
- Setup frontend widget on your website or application, using instructions below.

## Installation

### npm

```bash
npm i --save enface-auth-widget
```

### yarn

```bash
yarn add enface-auth-widget
```

## Usage

ES2015 module import:
```js
import { EnfaceAuthWidget } from "enface-auth-widget";
```
CommonJS module require:
```js
const { EnfaceAuthWidget } = require("enface-auth-widget");
```

### Initialization:
```js
new EnfaceAuthWidget({

	url: <string>,
	buttonHolderId: <string>
	debug: <boolean> // debug logs

	onUserAuthInfo() {
		// get user's session token, session id, cookie etc.
	},

	onChangeState(isActive, isInitialCheck) {
		// status of biometric signin for current user.
	},

	onAuthorized(token) {
		// user succesfully authorized
	},

	onFailed() {
		//user authorization failed
	},

});
 ```
### EnfaceAuthWidget parameters and callbacks (all functions can be asynchronous):

`url <string>`

Full [EnfaceAuth library](https://github.com/safead/enface-auth-node "EnfaceAuth library") backend URL. If backend mode is "WebSockets", this variable should looks like ws(s)://yourdomain.com:12345, where "12345" is the listening port of EnfaceAuth library. If backend mode is "HTTP/S" this variable should looks like http(s)://yourdomain.com

`buttonHolderId: <string>`

Upon creation Enface Widget will look for the element with corresponding "id" on the page and attach "onClick" handler with biometric actions. If "onUserAuthInfo" will return any data (user is currently logged in) - the enable/disable actions will be performed, authorization chain will be started instead.

`onUserAuthInfo(): <string>`

Return current user authorization data (token, session id, cookie etc.) if any. The returned value will be processed in "onUserValidate" callback of [EnfaceAuth library](https://github.com/safead/enface-auth-node "EnfaceAuth library") and must definetly identify the user. If current user is guest, return an empty string, null of nothing at all.

`onChangeState(isActive, isInitialCheck)`

This function is used to determine current state of biometric signin (turned ON/OFF). The only task of this callback is to correctly visualize your interface parts to let the user manipulate biometric signin state - show a button with appropriate caption, checkbox etc. See example below.

`onAuthorized(token)`

This function will be called on successfull user authorization. "onUserTokenByBioId" method of [EnfaceAuth library](https://github.com/safead/enface-auth-node "EnfaceAuth library") should send a valid user session data in incoming "token" variable (token, session id, cookie etc). Javascript should use this data to initialize authorized session for current user.

`onFailed : <string>`

This function will be called on biometric authorization failure. Show any messages or dialogs to notify the user about the failure.

###Here is how EnfaceAuthWidget is integrated at our own React frontend.

We are widely using hooks in the frontend application, so we put "useAuthWidget" at signin page and in the settings component, where the switcher "Turn biometric signin ON/OF" is placed.
```js
export const SignInPage = () => {

	useAuthWidget();

	/* the rest of SignInPage component's code*/
}
```
```js
export const TopBar = () => {

	useAuthWidget();

	/* the rest of TopBar component's code*/
}
```
Here is full "useAuthWidget" hook code:
```js
const useAuthWidget = () => {

	const { history } = useReactRouter();

	useEffect(() => {
		new EnfaceAuthWidget({
			url: 'https://enface-api-server.herokuapp.com',
			buttonHolderId: 'enfaceWidgetButtonHolder',

			onUserAuthInfo() {
				// return current session token
				return sessionStorage.getItem('token');
			},

			onChangeState(isActive, isInitialCheck) {
				// if "isInitialCheck" is true - this is just initialization check and no messages should be shown to the user
				const statusElem = document.getElementById('enfaceWidgetButtonHolder');
				// changing interface elements regarding the biometric state
				statusElem && (statusElem.innerHTML = `${isActive ? 'Disable' : 'Enable'} biometric sign in`);
				isInitialCheck || dialog.show({
					caption: 'Operation succeed',
					message: `Your biometric signin is now ${isActive ? 'enabled' : 'disabled'}`,
					buttons: ['I got it'],
				});
			},

			onAuthorized(token) {
				// use the "token" variable to initialize authorized session
				sessionStorage.setItem('token', token);
				history.push(paths.PATH_ROOT);
			},

			onFailed() {
				dialog.show({
					caption: 'Biometric signin failed',
					message: "We don't know you or biometric signin is turned off in your profile settings. Please sign in using email & password and enable biometric authorization in the members are.",
					buttons: ['I got it'],
				});
			},

		});
	}, []);
};
```
