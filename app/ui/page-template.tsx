export function PageTemplate({
  header,
  children,
  footer,
}: {
  header: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col text-base-content">
      {header}
      <main className="overflow-y-auto flex-1 bg-base-100">{children}</main>
      {footer}
    </div>
  );
}
