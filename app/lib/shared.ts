import {
  IconBarbell,
  IconBed,
  IconBooks,
  IconCar,
  IconChess,
  IconCoffee,
  IconDeviceLaptop,
  IconFirstAidKit,
  IconFlower,
  IconGasStation,
  IconPaint,
  IconPaperBag,
  IconPaperclip,
  IconPaw,
  IconPlane,
  IconShoppingCart,
  IconTheater,
  IconTicket,
  IconToolsKitchen2,
} from '@tabler/icons-react';
import dmSvg from '@/public/company-logos/dm.svg';
import albertSvg from '@/public/company-logos/albert.svg';
import bataSvg from '@/public/company-logos/bata.svg';
import biedronkaSvg from '@/public/company-logos/biedronka.svg';
import freshSvg from '@/public/company-logos/fresh.svg';
import ikeaSvg from '@/public/company-logos/ikea.svg';
import kauflandSvg from '@/public/company-logos/kaufland.svg';
import lidlSvg from '@/public/company-logos/lidl.svg';
import billaSvg from '@/public/company-logos/billa.svg';
import o2Svg from '@/public/company-logos/o2.svg';
import rossmannSvg from '@/public/company-logos/rossmann.svg';
import tescoSvg from '@/public/company-logos/tesco.svg';

export enum Routes {
  AddCards = '/add-cards',
  MyCards = '/my-cards',
  Settings = '/settings',
  Offline = '/offline',
  CreateCard = '/create-card',
  ScanCard = '/scan-card',
}

export enum Cookies {
  LandingPage = 'LandingPage',
}

export const ICON_COLOR = '#db924b';

export enum CardIcon {
  Grocery = 'Grocery',
  Retail = 'Retail',
  Pharmacy = 'Pharmacy',
  Gas = 'Gas Station',
  Restaurant = 'Restaurant',
  Cafes = 'Cafés',
  Accommodation = 'Accommodation',
  Airlines = 'Airlines',
  Car = 'Car Rental',
  Culture = 'Culture',
  Beauty = 'Beauty',
  Books = 'Books',
  Fitness = 'Fitness',
  Electronic = 'Electronic',
  Pet = 'Pet',
  Hobby = 'Hobby',
  Office = 'Office',
  Gaming = 'Gaming',
  Entertainment = 'Entertainment',
}
export const iconsMap = {
  [CardIcon.Grocery]: IconShoppingCart,
  [CardIcon.Retail]: IconPaperBag,
  [CardIcon.Pharmacy]: IconFirstAidKit,
  [CardIcon.Gas]: IconGasStation,
  [CardIcon.Restaurant]: IconToolsKitchen2,
  [CardIcon.Cafes]: IconCoffee,
  [CardIcon.Accommodation]: IconBed,
  [CardIcon.Airlines]: IconPlane,
  [CardIcon.Car]: IconCar,
  [CardIcon.Culture]: IconTheater,
  [CardIcon.Beauty]: IconFlower,
  [CardIcon.Books]: IconBooks,
  [CardIcon.Fitness]: IconBarbell,
  [CardIcon.Electronic]: IconDeviceLaptop,
  [CardIcon.Pet]: IconPaw,
  [CardIcon.Hobby]: IconPaint,
  [CardIcon.Office]: IconPaperclip,
  [CardIcon.Gaming]: IconChess,
  [CardIcon.Entertainment]: IconTicket,
};

export enum Colors {
  SkyBlue = '#87CEEB',
  Coral = '#FF7F50',
  LightGreen = '#90EE90',
  SandyBrown = '#F4A460',
  Plum = '#DDA0DD',
  CadetBlue = '#5F9EA0',
  Salmon = '#FA8072',
  Khaki = '#F0E68C',
  SlateGray = '#708090',
  Thistle = '#D8BFD8',
  LightCoral = '#F08080',
  PaleTurquoise = '#AFEEEE',
  Tan = '#D2B48C',
  LightSlateGray = '#778899',
  Burlywood = '#DEB887',
}

export const colorNames = {
  [Colors.SkyBlue]: 'Sky blue',
  [Colors.Coral]: 'Coral',
  [Colors.LightGreen]: 'Light green',
  [Colors.SandyBrown]: 'Sandy brown',
  [Colors.Plum]: 'Plum',
  [Colors.CadetBlue]: 'Cadet blue',
  [Colors.Salmon]: 'Salmon',
  [Colors.Khaki]: 'Khaki',
  [Colors.SlateGray]: 'Slate gray',
  [Colors.Thistle]: 'Thistle',
  [Colors.LightCoral]: 'Light coral',
  [Colors.PaleTurquoise]: 'Pale turquoise',
  [Colors.Tan]: 'Tan',
  [Colors.LightSlateGray]: 'Light slate gray',
  [Colors.Burlywood]: 'Burlywood',
};

export enum CodeType {
  QrCode = 'QrCode',
  Barcode = 'Barcode',
}

export const predefinedCompaniesMap: {
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
