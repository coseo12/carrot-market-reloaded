"use client";

import { useFormStatus } from "react-dom";

interface FormBtnProps {
  children: React.ReactNode | string;
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
  const { pending } = useFormStatus();

  return (
    <button
      type={type}
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:cursor-not-allowed"
      disabled={disabled || loading || pending}
    >
      {loading || pending ? "Loading..." : children}
    </button>
  );
}
