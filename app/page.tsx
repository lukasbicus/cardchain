import { saveLandingPageCookieAndRedirect } from '@/app/actions';
import { Cookies, Routes } from '@/app/lib/shared';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Home() {
  const cookieStore = cookies();
  const landingPage = cookieStore.get(Cookies.LandingPage)?.value;
  if (landingPage) {
    redirect(landingPage);
  }
  return (
    <main
      className="hero min-h-screen"
      style={{
        backgroundImage: 'url(hero.jpg)',
      }}
    >
      <div className="hero-overlay bg-opacity-60"> </div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Tilda</h1>
          <h2 className="mb-5 text-3xl font-bold">Manage your loyalty cards</h2>
          <p className="mb-5">
            Simplify your loyalty card management with Tilda, the app that puts
            you in charge of your data and cards.
          </p>
          <div className="flex justify-center gap-4">
            <form action={saveLandingPageCookieAndRedirect}>
              <button className="btn btn-primary" type="submit">
                Get Started
              </button>
            </form>
            <Link className="btn" href={Routes.About}>
              About
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
