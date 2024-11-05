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
            className="w-1/2 object-cover max-w-56"
          />
          <h1 className="text-3xl">Tilda</h1>
          <span className="text-xl">The loyalty card application</span>
        </div>

        <div className="px-4 py-6 bg-base-300">
          <h2 className="text-2xl font-bold">About Tilda</h2>
          <p className="pt-3 pb-6">
            {
              "Welcome to the future of loyalty card management! Our cutting-edge application is designed to revolutionize the way you store and use your loyalty cards. With a focus on convenience, security, and versatility, we're proud to introduce an app that's not just another digital wallet - it's your personal pocket-sized companion for all your shopping needs. Here's what makes our app stand out:"
            }
          </p>
          <h3 className="text-lg font-bold first-letter:text-7xl first-letter:float-left first-letter:mr-3">
            🚀 Progressive Web App (PWA) Technology
          </h3>
          <p className="pt-3 pb-6">
            {
              "Our app harnesses the power of Progressive Web App technology to deliver a seamless experience across all your devices. Whether you're on a smartphone, tablet, or desktop, our app is optimized to work flawlessly. The best part? It's built to work offline, so you can access your loyalty cards even when you're not connected to the internet. Say goodbye to the frustration of poor connectivity in stores - your loyalty cards are always at your fingertips, no matter where you are."
            }
          </p>
          <h3 className="text-lg font-bold first-letter:text-7xl first-letter:float-left first-letter:mr-3">
            🔒 Your Data, Your Privacy - Effortlessly Transferable
          </h3>
          <p className="py-3">
            We put you in complete control of your data. All your loyalty card
            information is securely stored on your device, ensuring your privacy
            is never compromised. No cloud storage, no servers - just
            straightforward privacy.
          </p>
          <p className="py-3">
            <b>Export with Freedom:</b>{' '}
            {
              "Ready to move on? Export your data quickly and carry it with you. It's yours, after all, and we've made sure you can take it wherever you go, no strings attached."
            }
          </p>
          <p className="py-3">
            <b>Import with Simplicity:</b>&nbsp; Syncing across devices is a
            breeze. Transfer your loyalty card data to any device with our app,
            keeping your digital wallet consistent and ready whenever you are.
          </p>
          <p className="pt-3 pb-6">
            Our app is your secure bridge to managing loyalty cards across your
            digital world, always respecting your right to privacy and data
            autonomy.
          </p>
          <h3 className="text-lg font-bold first-letter:text-7xl first-letter:float-left first-letter:mr-3">
            🃏 Versatile Loyalty Card Management
          </h3>
          <p className="pt-3 pb-6">
            {
              "Diverse shopping habits require a versatile solution. Our app is meticulously crafted to manage a wide array of loyalty card codes. From traditional barcodes such as EAN13, EAN8, UPC, CODE39, and CODE93 to modern QR codes, our app is equipped to handle them all. Whether it's your favorite coffee shop, the supermarket down the street, or the bookstore around the corner, our app simplifies your loyalty cards into one easy-to-use platform. No more fumbling through a stack of cards at checkout - just a quick scan from your device, and you're all set to enjoy your rewards."
            }
          </p>
          <p>
            {
              "Join us on this journey to smarter shopping. With our loyalty card app, you're not just a shopper; you're a savvy consumer with the world of rewards right in your pocket."
            }
          </p>
        </div>
      </div>
    </PageTemplate>
  );
}
