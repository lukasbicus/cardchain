import { BottomNavigationLinks } from '@/app/ui/bottom-navigation-links';
import clsx from 'clsx';
import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <div className={styles.childrenHeight}>{children}</div>
      <footer
        className={clsx(
          `btm-nav btm-nav-lg text-base-content bg-base-300`,
          styles.bottomBarNavHeight
        )}
      >
        <BottomNavigationLinks />
      </footer>
    </div>
  );
}
