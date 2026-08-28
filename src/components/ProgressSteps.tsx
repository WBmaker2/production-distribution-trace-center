interface ProgressItem {
  readonly key: string;
  readonly label: string;
  readonly current: boolean;
}

interface ProgressStepsProps {
  readonly items: readonly ProgressItem[];
}

export function ProgressSteps({ items }: ProgressStepsProps) {
  return (
    <ol className="progress-steps" aria-label="학습 진도">
      {items.map((item) => (
        <li
          key={item.key}
          className={item.current ? "progress-step current" : "progress-step"}
          aria-current={item.current ? "step" : undefined}
        >
          {item.label}
        </li>
      ))}
    </ol>
  );
}
