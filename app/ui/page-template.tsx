export default function PageTemplate({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col text-base-content">
      <header>{header}</header>
      <main className="overflow-y-auto flex-1 bg-base-100">{children}</main>
    </div>
  );
}
