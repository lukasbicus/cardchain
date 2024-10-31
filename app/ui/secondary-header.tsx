import { IconArrowLeft } from '@tabler/icons-react';
import Link, { LinkProps } from 'next/link';

export function SecondaryHeader({
  title,
  href,
  rightAction,
}: {
  title?: string;
  rightAction?: React.ReactNode;
  href: LinkProps['href'];
}) {
  return (
    <header className="navbar bg-base-200">
      <div className="navbar-start">
        <Link className="btn btn-square btn-ghost" href={href} replace>
          <IconArrowLeft />
        </Link>
      </div>
      <div className="navbar-center">
        <span className="font-bold text-lg">{title}</span>
      </div>
      <div className="navbar-end">{rightAction}</div>
    </header>
  );
}
