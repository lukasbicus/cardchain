import Link from "next/link";

export default function Home() {
  return (
      <main
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(hero.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Tilda</h1>
            <h2 className="mb-5 text-3xl font-bold">Manage your loyalty cards</h2>
            <p className="mb-5">
              Simplify your loyalty card management with LoyaltyControl, the app that puts you in charge of your data and cards.
            </p>
            <div className="flex justify-center gap-4">
              <Link className="btn btn-primary " href="/my-cards">Get Started</Link>
              <button className="btn">About</button>
            </div>
          </div>
        </div>
      </main>
  );
}
