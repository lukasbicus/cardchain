import clsx from 'clsx';

export function TextField({
  label,
  placeholder = `Your ${label.toLowerCase()}`,
  className,
}: {
  label: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={clsx('form-control w-full', className)}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
    </label>
  );
}
