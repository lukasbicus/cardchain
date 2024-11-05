import { Routes } from '@/app/lib/shared';
import PageTemplate from '@/app/ui/page-template';
import { SecondaryHeader } from '@/app/ui/secondary-header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <PageTemplate
      header={<SecondaryHeader title="About author" href={Routes.Settings} />}
    >
      <div className="px-2 py-6">
        <Image
          src="https://2.gravatar.com/avatar/539b51ba48d1d7d21abb176cc32b7c6d8d421185282f1b49458960283d44942c?size=256"
          width="256"
          height="256"
          alt="Lukas Bicus"
          className="rounded-full self-center max-w-[33%] md:max-w-none justify-self-center"
        />
        <div className="py-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">Lukáš Bičuš</h1>
          <span className="text-xl">The fullstack developer</span>
        </div>
        <div className="flex flex-col gap-2 px-2 py-3 mb-3 w-full bg-base-300">
          <p className="px-2 pb-3">
            Seasoned Software Developer with over a decade of experience in
            JavaScript and 8 years specializing in React. I like clean code,
            test driven development and code reviews. My expertise spans both
            frontend and backend development.
          </p>
          <Link
            href="https://github.com/lukasbicus/"
            className="btn btn-primary w-full"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
            Github
          </Link>
          <Link
            href="https://www.linkedin.com/in/lukasbicus/"
            className="btn btn-primary w-full"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
            Linked in
          </Link>
        </div>
        <div className="flex flex-col gap-2 px-2 py-3 mb-3 w-full bg-base-300">
          <h3 className="pt-2 text-xl">Support me</h3>
          <p className="py-3">
            Your support helps me to keep creating content. Thank you for your
            generosity!
          </p>
          <p>Bank account: SK85 8330 0000 0023 0179 7796</p>
        </div>
      </div>
    </PageTemplate>
  );
}
