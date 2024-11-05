import clsx from 'clsx';

export function MainMessage({
  className,
  children,
  title,
  description,
}: {
  className?: string;
  children?: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className={clsx('text-center', className)}>
      <p className="text-xl py-4">{title}</p>
      <p className="text-sm text-gray-500 pb-4">{description}</p>
      {children}
    </div>
  );
}
