"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "clsx";
import { IconCards, IconDeviceIpadHorizontal, IconSettings } from '@tabler/icons-react';

const links = [
  { name: 'My cards', href: '/my-cards', icon: IconCards },
  {
    name: 'Add cards',
    href: '/add-cards',
    icon: IconDeviceIpadHorizontal,
  },
  { name: 'Settings', href: '/settings', icon: IconSettings },
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