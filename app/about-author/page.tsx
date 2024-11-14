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
        <div className="card flex flex-col gap-2 px-4 py-6  bg-base-300">
          <p>Hello, everyone!</p>
          <p>
            I'm the mind behind the app you're currently enjoying. My goal was
            to create a tool that not only serves your needs but also enhances
            your everyday experiences. I sincerely hope that you find it useful
            and delightful.
          </p>
          <p>
            Your feedback is invaluable to me. If you encounter any issues or
            have suggestions for new features, I'd love to hear from you. Feel
            free to connect with me on LinkedIn or shoot me an email at
            ing.lukas.bicus@gmail.com.
          </p>
          <p>
            Curious about what else I'm working on? Take a peek at my projects
            and professional journey:
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
          <p>
            Thank you for your support, and I look forward to making your
            experience even better with each update.
          </p>
          <p>
            Warm regards, <br />
            Lukáš Bičuš
          </p>
        </div>
      </div>
    </PageTemplate>
  );
}
