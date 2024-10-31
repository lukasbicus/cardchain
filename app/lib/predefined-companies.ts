import { SvgProps } from '@/app/lib/shared';
import { Html5QrcodeSupportedFormats } from 'html5-qrcode';

/**
 * @see https://worldvectorlogo.com/search/terno for logos
 */

export const predefinedCompanies: {
  name: string;
  svg: SvgProps;
  codeFormat: Html5QrcodeSupportedFormats;
}[] = [
  {
    name: 'DM',
    svg: {
      src: '/company-logos/dm.svg',
      height: 1620,
      width: 2500,
    },
    codeFormat: Html5QrcodeSupportedFormats.EAN_13,
  },
  {
    name: 'Albert',
    svg: {
      src: '/company-logos/albert.svg',
      width: 2500,
      height: 2500,
    },
    codeFormat: Html5QrcodeSupportedFormats.EAN_13,
  },
  {
    name: 'Bata',
    svg: {
      src: '/company-logos/bata.svg',
      width: 2500,
      height: 2500,
    },
    codeFormat: Html5QrcodeSupportedFormats.EAN_13,
  },
  {
    name: 'Biedronka',
    svg: {
      src: '/company-logos/biedronka.svg',
      width: 2500,
      height: 2500,
    },
    codeFormat: Html5QrcodeSupportedFormats.EAN_13,
  },
  {
    name: 'Fresh',
    svg: {
      src: '/company-logos/fresh.svg',
      width: 510.5,
      height: 182.7,
    },
    codeFormat: Html5QrcodeSupportedFormats.EAN_13,
  },
  {
    name: 'Ikea',
    svg: {
      src: '/company-logos/ikea.svg',
      width: 2500,
      height: 2500,
    },
    codeFormat: Html5QrcodeSupportedFormats.EAN_13,
  },
  {
    name: 'Kaufland',
    svg: {
      src: '/company-logos/kaufland.svg',
      width: 2500,
      height: 2500,
    },
    codeFormat: Html5QrcodeSupportedFormats.EAN_13,
  },
  {
    name: 'Lidl',
    svg: {
      src: '/company-logos/lidl.svg',
      width: 2500,
      height: 2500,
    },
    codeFormat: Html5QrcodeSupportedFormats.QR_CODE,
  },
  {
    name: 'Billa',
    svg: {
      src: '/company-logos/billa.svg',
      width: 2500,
      height: 2500,
    },
    codeFormat: Html5QrcodeSupportedFormats.EAN_13,
  },
  {
    name: 'O2',
    svg: {
      src: '/company-logos/o2.svg',
      width: 2500,
      height: 2500,
    },
    codeFormat: Html5QrcodeSupportedFormats.EAN_13,
  },
  {
    name: 'Rossmann',
    svg: {
      src: '/company-logos/rossmann.svg',
      width: 116.6,
      height: 14.3,
    },
    codeFormat: Html5QrcodeSupportedFormats.EAN_13,
  },
  {
    name: 'Tesco',
    svg: {
      src: '/company-logos/tesco.svg',
      width: 2500,
      height: 2500,
    },
    codeFormat: Html5QrcodeSupportedFormats.EAN_13,
  },
];
