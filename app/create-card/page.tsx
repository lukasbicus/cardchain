import PageTemplate from '@/app/ui/page-template';

export default function Page() {
  return (
    <PageTemplate header={<>secondary header</>}>
      <div>Scan card page</div>
      <form>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your name?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
      </form>
    </PageTemplate>
  );
}
