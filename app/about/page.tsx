import { Routes } from '@/app/lib/shared';
import PageTemplate from '@/app/ui/page-template';
import Image from 'next/image';
import { SecondaryHeader } from '@/app/ui/secondary-header';

export default function Page() {
  return (
    <PageTemplate
      header={<SecondaryHeader title="About" href={Routes.Settings} />}
    >
      <div className="grid w-full grid-rows-[auto_1fr] px-4 py-6">
        <div className="py-6 flex items-center justify-center flex-col">
          <Image
            src="/logo.svg"
            alt="logo"
            width={512}
            height={512}
            className="w-1/2 object-cover"
          />
          <h1 className="text-3xl">Tilda</h1>
          <h1 className="text-xl">The loyalty card application</h1>
        </div>

        <div className="px-4 py-6 bg-base-300">
          <h3>What is this app about</h3>
          <p className="pt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </PageTemplate>
  );
}
