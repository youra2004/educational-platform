import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = ({
  variant = "primary",
  className,
  children,
  ...props
}: CustomButtonProps) => {
  const baseStyles = "px-6 py-2 rounded-lg transition";
  const variants: Record<Variant, string> = {
    primary: "bg-secondary text-white hover:bg-secondary/90",
    secondary: "bg-primary text-black hover:bg-primary/80",
    outline: "border border-secondary text-secondary hover:bg-secondary/10",
  };

  return (
    <button
      {...props}
      className={clsx(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
};
