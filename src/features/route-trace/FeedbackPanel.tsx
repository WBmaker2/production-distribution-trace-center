import type { ReactNode } from "react";

interface FeedbackPanelProps {
  readonly tone?: "info" | "success" | "warning";
  readonly title: string;
  readonly children: ReactNode;
}

export function FeedbackPanel({ tone = "info", title, children }: FeedbackPanelProps) {
  return (
    <div className={`feedback-panel tone-${tone}`} role="status">
      <p className="feedback-title">{title}</p>
      {children}
    </div>
  );
}
