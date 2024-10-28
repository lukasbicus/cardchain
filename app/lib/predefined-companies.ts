import { CodeType } from '@/app/lib/shared';
import albertSvg from '@/public/company-logos/albert.svg';
import bataSvg from '@/public/company-logos/bata.svg';
import biedronkaSvg from '@/public/company-logos/biedronka.svg';
import billaSvg from '@/public/company-logos/billa.svg';
import dmSvg from '@/public/company-logos/dm.svg';
import freshSvg from '@/public/company-logos/fresh.svg';
import ikeaSvg from '@/public/company-logos/ikea.svg';
import kauflandSvg from '@/public/company-logos/kaufland.svg';
import lidlSvg from '@/public/company-logos/lidl.svg';
import o2Svg from '@/public/company-logos/o2.svg';
import rossmannSvg from '@/public/company-logos/rossmann.svg';
import tescoSvg from '@/public/company-logos/tesco.svg';

export const predefinedCompanies: {
  name: string;
  svg: string;
  bgColor: string;
  codeType: CodeType;
}[] = [
  {
    name: 'DM',
    svg: dmSvg,
    bgColor: '#30318b',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Albert',
    svg: albertSvg,
    bgColor: '#f2d740',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Bata',
    svg: bataSvg,
    bgColor: '#cc2229',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Biedronka',
    svg: biedronkaSvg,
    bgColor: '#fff22d',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Fresh',
    svg: freshSvg,
    bgColor: '#fff',
    codeType: CodeType.Barcode,
  },
  {
    name: 'IKEA',
    svg: ikeaSvg,
    bgColor: '#2360a5',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Kaufland',
    svg: kauflandSvg,
    bgColor: '#e10915',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Lidl',
    svg: lidlSvg,
    bgColor: '#003278',
    codeType: CodeType.QrCode,
  },
  {
    name: 'Billa',
    svg: billaSvg,
    bgColor: '#d2091e',
    codeType: CodeType.Barcode,
  },
  {
    name: 'O2',
    svg: o2Svg,
    bgColor: '#fff',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Rossmann',
    svg: rossmannSvg,
    bgColor: '#fff',
    codeType: CodeType.Barcode,
  },
  {
    name: 'Tesco',
    svg: tescoSvg,
    bgColor: '#fff',
    codeType: CodeType.Barcode,
  },
];
