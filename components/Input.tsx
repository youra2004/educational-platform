// components/CustomInput.tsx
import clsx from "clsx";

type Variant = "default" | "error" | "success";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: Variant;
}

export function Input({
  variant = "default",
  className,
  ...props
}: CustomInputProps) {
  const baseStyles =
    "w-full px-4 py-2 rounded-2xl focus:outline-none transition";
  const variants: Record<Variant, string> = {
    default: "border border-gray-300 focus:ring-2 focus:ring-secondary",
    error: "border border-red-500 focus:ring-2 focus:ring-red-300",
    success: "border border-green-500 focus:ring-2 focus:ring-green-300",
  };

  return (
    <input
      {...props}
      className={clsx(baseStyles, variants[variant], className)}
    />
  );
}
