'use client';

import { useAppState } from '@/app/ui/app-state-context';
import { Routes } from '@/app/lib/shared';
import Link from 'next/link';

export function GetStartedButton() {
  const [state] = useAppState();
  return (
    <Link
      className="btn btn-primary"
      href={state.cards.length > 0 ? Routes.MyCards : Routes.AddCards}
    >
      Get Started
    </Link>
  );
}
