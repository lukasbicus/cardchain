import Image from 'next/image';

export function PrimaryHeader({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <Image
            src="/logo.svg"
            alt="Tilda logo"
            className="w-8 rounded-lg bg-white"
            width={24}
            height={24}
          />
          <h1 className="text-lg pl-4">{title}</h1>
        </div>
        {actions && <div className="navbar-end flex gap-2">{actions}</div>}
      </div>
      {children && (
        <div className="navbar bg-base-100 text-base-content gap-2">
          {children}
        </div>
      )}
    </header>
  );
}
