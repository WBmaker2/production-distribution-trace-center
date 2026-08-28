import { useEffect, useState } from "react";

export function AccessibilityToolbar() {
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("large-text", largeText);
  }, [largeText]);

  return (
    <div className="a11y-toolbar" role="group" aria-label="화면 도구">
      {largeText ? (
        <button
          type="button"
          className="history-button"
          aria-pressed="true"
          onClick={() => setLargeText(false)}
        >
          글자 보통
        </button>
      ) : (
        <button
          type="button"
          className="history-button"
          aria-pressed="false"
          onClick={() => setLargeText(true)}
        >
          글자 크게
        </button>
      )}
    </div>
  );
}
