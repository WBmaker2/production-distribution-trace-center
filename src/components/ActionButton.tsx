import type { ButtonHTMLAttributes } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: "primary" | "secondary" | "danger" | "ghost";
  /** 필수 다음 행동 버튼에만 붙인다 (계획 문서 10). */
  readonly pulse?: boolean;
}

export function ActionButton({
  variant = "primary",
  pulse = false,
  className,
  type = "button",
  ...rest
}: ActionButtonProps) {
  const classes = [
    "action-button",
    `variant-${variant}`,
    pulse ? "gi-pulse" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return <button type={type} className={classes} {...rest} />;
}
