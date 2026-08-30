interface ProgressItem {
  readonly key: string;
  readonly label: string;
  readonly current: boolean;
  readonly completed?: boolean;
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
          className={[
            "progress-step",
            item.current ? "current" : "",
            item.completed ? "completed" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-current={item.current ? "step" : undefined}
          aria-label={
            item.label +
            ", " +
            (item.current ? "현재 단계" : item.completed ? "완료" : "남은 단계")
          }
        >
          <span className="progress-label">{item.label}</span>
          <span className="progress-status">
            {item.current ? "현재 단계" : item.completed ? "완료" : "남은 단계"}
          </span>
        </li>
      ))}
    </ol>
  );
}
