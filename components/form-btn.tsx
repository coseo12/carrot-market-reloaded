interface FormBtnProps {
  children: React.ReactNode[] | string;
  type: "submit" | "reset" | "button";
  disabled?: boolean;
  loading?: boolean;
}

export default function FormBtn({
  children,
  type,
  disabled = false,
  loading = false,
}: FormBtnProps) {
  return (
    <button
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:cursor-not-allowed"
      type={type}
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
