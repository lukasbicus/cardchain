import { Html5QrcodeSupportedFormats } from 'html5-qrcode';

/**
 * @param codeFormat
 * jsbarcode format docs:
 * @link https://github.com/lindell/JsBarcode/wiki/Options#format
 * @link https://github.com/lindell/JsBarcode/wiki#barcodes
 * html5-code format docs:
 * https://scanapp.org/html5-qrcode-docs/docs/supported_code_formats
 */
export function mapHtml5QrcodeFormatToJsbarcodeFormat(
  codeFormat: Html5QrcodeSupportedFormats
): string {
  switch (codeFormat) {
    case Html5QrcodeSupportedFormats.QR_CODE:
      return 'QR';
    case Html5QrcodeSupportedFormats.CODE_128:
      return 'CODE128';
    case Html5QrcodeSupportedFormats.EAN_13:
      return 'EAN13';
    case Html5QrcodeSupportedFormats.EAN_8:
      return 'EAN8';
    case Html5QrcodeSupportedFormats.UPC_A:
    case Html5QrcodeSupportedFormats.UPC_E:
    case Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION:
      return 'UPC';
    case Html5QrcodeSupportedFormats.ITF:
      return 'ITF14'; // ITF format in jsbarcode is often represented as ITF14
    case Html5QrcodeSupportedFormats.CODE_39:
      return 'CODE39';
    case Html5QrcodeSupportedFormats.CODE_93:
      return 'CODE93';
    case Html5QrcodeSupportedFormats.CODABAR:
      return 'codebar';
    case Html5QrcodeSupportedFormats.AZTEC:
    case Html5QrcodeSupportedFormats.DATA_MATRIX:
    case Html5QrcodeSupportedFormats.MAXICODE:
    case Html5QrcodeSupportedFormats.PDF_417:
    case Html5QrcodeSupportedFormats.RSS_14:
    case Html5QrcodeSupportedFormats.RSS_EXPANDED:
    default:
      throw new Error(`Unsupported code format: ${codeFormat}`);
  }
}
