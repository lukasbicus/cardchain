import { Card } from '@/app/lib/app-state/reducer';
import { iconsMap } from '@/app/lib/shared';
import Image from 'next/image';

type CompanyIconProps = Pick<Card, 'icon' | 'name'>;

export default function CompanyIcon({ icon, name }: CompanyIconProps) {
  if (typeof icon === 'string') {
    if (iconsMap[icon]) {
      const TheIcon = iconsMap[icon];
      return <TheIcon name={name} className="w-10 h-10" />;
    }
    return icon;
  }
  if (icon === null) {
    return null;
  }
  return <Image {...icon} alt={name} className="w-10 h-10" />;
}
