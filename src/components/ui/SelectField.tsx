type Option = { value: string; label: string };

export default function SelectField({
  id, label, value, onChange, options, className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
}) {
  return (
    <div className={`space-y-1 ${className || ""}`}>
      <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full border border-indigo-700/30 rounded px-3 py-2 bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        {options.map((op) => (
          <option key={op.value} value={op.value}>{op.label}</option>
        ))}
      </select>
    </div>
  );
}
