"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "clsx";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

const links = [
  { name: 'My cards', href: '/my-cards', icon: HomeIcon },
  {
    name: 'Add cards',
    href: '/add-cards',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Settings', href: '/settings', icon: UserGroupIcon },
];

export default function BottomNavigationLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              {
                'active': pathname === link.href
              })}
          >
            <LinkIcon className="w-6"/>
            <span className="btm-nav-label">{link.name}</span>
          </Link>
        );
      })}
    </>
  )
}