interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {subtitle && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#B64627]">
          {subtitle}
        </p>
      )}

      <h2 className="text-4xl font-bold">{title}</h2>

      {description && (
        <p className="mt-4 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}
