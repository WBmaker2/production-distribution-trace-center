interface UpdateHistoryButtonProps {
  readonly onClick: () => void;
}

export function UpdateHistoryButton({ onClick }: UpdateHistoryButtonProps) {
  return (
    <button
      type="button"
      className="history-button"
      aria-haspopup="dialog"
      onClick={onClick}
    >
      업데이트 내역
    </button>
  );
}
