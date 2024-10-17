import BottomNavigationLinks from "@/app/ui/bottom-navigation-links";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex h-screen flex-col">
      <div>
        {children}
      </div>
      <div className="btm-nav btm-nav-lg text-primary">
        <BottomNavigationLinks />
      </div>
    </div>
  )
}