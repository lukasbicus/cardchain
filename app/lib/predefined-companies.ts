import { CodeType } from '@/app/lib/shared';

export const predefinedCompanies: {
  name: string;
  svg: string;
  width: number;
  height: number;
  bgColor: string;
  codeType: CodeType;
}[] = [
  {
    name: 'DM',
    svg: '/company-logos/dm.svg',
    height: 1620,
    width: 2500,
    bgColor: '#30318b',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Albert',
    svg: '/company-logos/albert.svg',
    width: 2500,
    height: 2500,
    bgColor: '#f2d740',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Bata',
    svg: '/company-logos/bata.svg',
    width: 2500,
    height: 2500,
    bgColor: '#cc2229',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Biedronka',
    svg: '/company-logos/biedronka.svg',
    width: 2500,
    height: 2500,
    bgColor: '#fff22d',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Fresh',
    svg: '/company-logos/fresh.svg',
    width: 510.5,
    height: 182.7,
    bgColor: '#fff',
    codeType: CodeType.Barcode,
  },
  {
    name: 'IKEA',
    svg: '/company-logos/ikea.svg',
    width: 2500,
    height: 2500,
    bgColor: '#2360a5',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Kaufland',
    svg: '/company-logos/kaufland.svg',
    width: 2500,
    height: 2500,
    bgColor: '#e10915',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Lidl',
    svg: '/company-logos/lidl.svg',
    width: 2500,
    height: 2500,
    bgColor: '#003278',
    codeType: CodeType.QrCode,
  },
  {
    name: 'Billa',
    svg: '/company-logos/billa.svg',
    width: 2500,
    height: 2500,
    bgColor: '#d2091e',
    codeType: CodeType.Barcode,
  },
  {
    name: 'O2',
    svg: '/company-logos/o2.svg',
    width: 2500,
    height: 2500,
    bgColor: '#fff',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Rossmann',
    svg: '/company-logos/rossmann.svg',
    width: 116.6,
    height: 14.3,
    bgColor: '#fff',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Tesco',
    svg: '/company-logos/tesco.svg',
    width: 2500,
    height: 2500,
    bgColor: '#fff',
    codeType: CodeType.Barcode,
  },
];
