import { CodeType, SvgProps } from '@/app/lib/shared';

export const predefinedCompanies: {
  name: string;
  svg: SvgProps;
  codeType: CodeType;
}[] = [
  {
    name: 'DM',
    svg: {
      src: '/company-logos/dm.svg',
      height: 1620,
      width: 2500,
    },
    codeType: CodeType.Barcode,
  },
  {
    name: 'Albert',
    svg: {
      src: '/company-logos/albert.svg',
      width: 2500,
      height: 2500,
    },
    codeType: CodeType.Barcode,
  },
  {
    name: 'Bata',
    svg: {
      src: '/company-logos/bata.svg',
      width: 2500,
      height: 2500,
    },
    codeType: CodeType.Barcode,
  },
  {
    name: 'Biedronka',
    svg: {
      src: '/company-logos/biedronka.svg',
      width: 2500,
      height: 2500,
    },
    codeType: CodeType.Barcode,
  },
  {
    name: 'Fresh',
    svg: {
      src: '/company-logos/fresh.svg',
      width: 510.5,
      height: 182.7,
    },
    codeType: CodeType.Barcode,
  },
  {
    name: 'Ikea',
    svg: {
      src: '/company-logos/ikea.svg',
      width: 2500,
      height: 2500,
    },
    codeType: CodeType.Barcode,
  },
  {
    name: 'Kaufland',
    svg: {
      src: '/company-logos/kaufland.svg',
      width: 2500,
      height: 2500,
    },
    codeType: CodeType.Barcode,
  },
  {
    name: 'Lidl',
    svg: {
      src: '/company-logos/lidl.svg',
      width: 2500,
      height: 2500,
    },
    codeType: CodeType.QrCode,
  },
  {
    name: 'Billa',
    svg: {
      src: '/company-logos/billa.svg',
      width: 2500,
      height: 2500,
    },
    codeType: CodeType.Barcode,
  },
  {
    name: 'O2',
    svg: {
      src: '/company-logos/o2.svg',
      width: 2500,
      height: 2500,
    },
    codeType: CodeType.Barcode,
  },
  {
    name: 'Rossmann',
    svg: {
      src: '/company-logos/rossmann.svg',
      width: 116.6,
      height: 14.3,
    },
    codeType: CodeType.Barcode,
  },
  {
    name: 'Tesco',
    svg: {
      src: '/company-logos/tesco.svg',
      width: 2500,
      height: 2500,
    },
    codeType: CodeType.Barcode,
  },
];
