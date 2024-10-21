'use server';

import { Cookies, Routes } from '@/app/lib/shared';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function saveLandingPageCookieAndRedirect() {
  const route = Routes.AddCards;
  cookies().set(Cookies.LandingPage, route);
  redirect(route);
}
