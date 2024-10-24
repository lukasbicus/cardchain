export function TextAreaField({
  label,
  placeholder = `Your ${label.toLowerCase()}`,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-24"
        placeholder={placeholder}
      ></textarea>
    </label>
  );
}
