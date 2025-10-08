type Props = {
  title?: string;
  children: React.ReactNode;
  minHeight?: number;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const widthMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export default function FormContainer({
  title,
  children,
  minHeight = 480,
  maxWidth = "md",
  className,
}: Props) {
  return (
    <div className="min-h-dvh bg-gray-800 grid place-items-center">
      <main className={`w-full ${widthMap[maxWidth]} px-4`}>
        <section
          className={`bg-slate-200 rounded-xl p-6 shadow flex flex-col justify-center ${className || ""}`}
          style={{ minHeight }}
        >
          {title && (
            <h1 className="mb-6 text-3xl font-bold text-center text-indigo-700">
              {title}
            </h1>
          )}
          {children}
        </section>
      </main>
    </div>
  );
}
