import * as constants from './constants';
import './assets/styles.css';

export const button = `
    <button id="${constants.BUTTON_ID}">LOGIN WITH ENFACE</button>
`;

export const qrCode = `
<div class="overlay">
  <div class="popup-overlay">
    <div class="qrCode">
      <img id="qrCodeImage" alt="" title="Scan this image with Enface application QR code reader" src="">
    </div>
  </div>
</div>
`;
