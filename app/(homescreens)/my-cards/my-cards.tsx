'use client';

import useAppState from '@/app/lib/app-state/app-state';
import Image from 'next/image';

export default function MyCards() {
  const [state] = useAppState();

  return (
    <>
      {state.cards.map(card => (
        <div key={card.name}>
          <div>
            {typeof card.icon === 'string' ? (
              card.icon
            ) : card.icon === null ? null : (
              <Image src={card.icon} alt={card.name} className="w-10 h-10" />
            )}
          </div>
          {card.name}
        </div>
      ))}
    </>
  );
}
