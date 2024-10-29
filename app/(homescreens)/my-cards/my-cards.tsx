'use client';

import useAppState from '@/app/lib/app-state/app-state';
import CompanyIcon from '@/app/ui/company-icon';
import { IconStar } from '@tabler/icons-react';

export default function MyCards() {
  const [state] = useAppState();

  return (
    <ul className="menu menu-sm rounded-box gap-2">
      {state.cards.map(card => (
        <li key={card.name}>
          <div className="grid grid-cols-[auto_1fr_auto] justify-between flex-row gap-2 border items-center">
            <span className="w-10 h-10">
              <CompanyIcon {...card} />
            </span>
            <span>{card.name}</span>
            <button className="btn btn-ghost btn-square btn-primary">
              <IconStar className="h-6 w-6" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
