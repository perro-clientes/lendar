import { type ButtonHTMLAttributes } from "react";

export function CTAButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="hover:cursor-pointer rounded-full bg-teal px-8 h-11 text-sm font-semibold text-white hover:bg-teal-dark transition-colors"
      {...props}
    />
  );
}
