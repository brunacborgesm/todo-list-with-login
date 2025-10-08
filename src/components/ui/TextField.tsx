import * as React from "react";

type Props = {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  error?: string | null;
  className?: string;
};

export default function TextField({
  id, label, type = "text", value, onChange,
  placeholder, autoComplete, error, className
}: Props) {
  return (
    <div className={`space-y-1 ${className || ""}`}>
      <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full border border-indigo-700/30 rounded px-3 py-2 bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
