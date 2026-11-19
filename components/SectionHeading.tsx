export default function SectionHeading({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="mb-10 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">
        {label}
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-white">{title}</h2>
      <div className="mx-auto mt-3 h-0.5 w-10 bg-purple-500" />
    </div>
  );
}