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
  IconShirt,
  IconShoppingCart,
  IconTheater,
  IconTicket,
  IconToolsKitchen2,
} from '@tabler/icons-react';

export enum Routes {
  AddCards = '/add-cards',
  MyCards = '/my-cards',
  Settings = '/settings',
  Offline = '/offline',
  CreateCard = '/create-card',
  EditCard = '/edit-card',
  Card = '/card',
  About = '/about',
  AboutAuthor = '/about-author',
  ExportData = '/export-data',
  ImportData = '/import-data',
}

export const PRIMARY_COLOR = 'oklch(0.4912 0.3096 275.75)';

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
  Clothes = 'Clothes',
}
export const iconsMap = {
  [CardIcon.Grocery]: IconShoppingCart,
  [CardIcon.Clothes]: IconShirt,
  [CardIcon.Retail]: IconPaperBag,
  [CardIcon.Pharmacy]: IconFirstAidKit,
  [CardIcon.Restaurant]: IconToolsKitchen2,
  [CardIcon.Cafes]: IconCoffee,
  [CardIcon.Gas]: IconGasStation,
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

export type SvgProps = {
  src: string;
  width: number;
  height: number;
};
