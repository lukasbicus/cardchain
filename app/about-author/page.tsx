import { Routes } from '@/app/lib/shared';
import { PageTemplate } from '@/app/ui/page-template';
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
        <div className="text-center">
          <Image
            src="https://2.gravatar.com/avatar/539b51ba48d1d7d21abb176cc32b7c6d8d421185282f1b49458960283d44942c?size=256"
            width="256"
            height="256"
            alt="Lukas Bicus"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNkYJCsZyACMI4qpK9CAC7WBfuNZKZrAAAAAElFTkSuQmCC"
            className="rounded-full max-w-[33%] md:max-w-none inline-block"
          />
        </div>
        <div className="py-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">Lukáš Bičuš</h1>
          <span className="text-xl">The fullstack developer</span>
        </div>
        <div className="card flex flex-col gap-2 px-4 py-6 bg-base-300">
          <p>Hello, everyone!</p>
          <p className="text-justify">
            {`I'm the creator of the app you're currently exploring. My ambition was to craft a tool that's both functional and enjoyable, hoping it adds value to your daily routine. I'm thrilled to have you on board and I hope you're loving the experience.`}
          </p>
          <p className="text-justify">
            This project is a labor of love and is open source, which means
            anyone interested can view, contribute, or learn from the code. You
            can find the repository here:{' '}
            <Link
              href="https://github.com/lukasbicus/tilda"
              className="font-bold underline"
            >
              Tilda on github
            </Link>
          </p>
          <p className="text-justify">
            {`I'm always on the lookout for ways to improve and evolve the app, so your input is incredibly important. If you've stumbled upon a bug, have ideas for new features, or just want to share your thoughts, please don't hesitate to reach out. You can contact me via LinkedIn, email me directly at `}
            <Link
              href="mailto:ing.lukas.bicus@gmail.com"
              className="font-bold underline"
            >
              ing.lukas.bicus@gmail.com
            </Link>
            {`, or even contribute to the project on GitHub.`}
          </p>
          <p className="text-justify">
            {`For a glimpse into my other projects or to connect professionally, visit my profiles:`}
          </p>
          <div className="flex flex-col gap-2 md:flex-row md:justify-center p-4">
            <Link
              href="https://github.com/lukasbicus/"
              className="btn btn-primary md:w-auto"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
              Github
            </Link>
            <Link
              href="https://www.linkedin.com/in/lukasbicus/"
              className="btn btn-primary md:w-auto"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
              Linked in
            </Link>
          </div>
          <p className="text-justify">
            {
              'Your support and feedback are what drive the continuous improvement of this app. Thank you for being a part of this journey.'
            }
          </p>
          <p>
            Warmest regards, <br />
            <span className="italic">Lukáš Bičuš</span>
          </p>
        </div>
      </div>
    </PageTemplate>
  );
}
