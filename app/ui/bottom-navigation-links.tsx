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
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600': pathname === link.href
              })}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  )
}