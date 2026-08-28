import { ModalDialog } from "./ModalDialog";
import { updateHistoryEntries } from "../update/updateHistory";

interface UpdateHistoryDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export function UpdateHistoryDialog({ open, onClose }: UpdateHistoryDialogProps) {
  return (
    <ModalDialog open={open} onClose={onClose} title="업데이트 내역">
      <p>이 학습 앱이 바뀐 기록이에요. 최신 날짜가 가장 앞에 있어요.</p>
      <ul className="update-history-list">
        {updateHistoryEntries.map((entry) => (
          <li key={`${entry.date}-${entry.note}`}>
            <strong>{entry.date}</strong> — <span>{entry.note}</span>
          </li>
        ))}
      </ul>
    </ModalDialog>
  );
}
