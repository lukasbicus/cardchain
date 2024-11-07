import { Card } from '@/app/lib/app-state/reducer';
import { iconsMap } from '@/app/lib/shared';
import clsx from 'clsx';
import Image from 'next/image';

type CompanyIconProps = Pick<Card, 'icon' | 'name'> & {
  className?: string;
};

export function CompanyIcon({ icon, name, className }: CompanyIconProps) {
  if (typeof icon === 'string') {
    if (iconsMap[icon]) {
      const TheIcon = iconsMap[icon];
      return <TheIcon name={name} className={clsx('w-10 h-10', className)} />;
    }
    return icon;
  }
  if (icon === null) {
    return null;
  }
  return (
    <Image {...icon} alt={name} className={clsx('w-10 h-10', className)} />
  );
}
