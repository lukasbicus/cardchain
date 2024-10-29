'use client';

import useAppState from '@/app/lib/app-state/app-state';
import { Card } from '@/app/lib/app-state/reducer';
import { iconsMap } from '@/app/lib/shared';
import Image from 'next/image';

function Icon({ icon, name }: Pick<Card, 'icon' | 'name'>) {
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

export default function MyCards() {
  const [state] = useAppState();

  return (
    <ul className="menu menu-lg rounded-box">
      {state.cards.map(card => (
        <li key={card.name}>
          <div>
            <Icon {...card} />
          </div>
          {card.name}
        </li>
      ))}
    </ul>
  );
}
