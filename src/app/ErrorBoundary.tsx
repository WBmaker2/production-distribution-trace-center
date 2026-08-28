import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly onReset: () => void;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
}

/** 계획 문서 11: 어린이용 안내만 보여 주고 기술 정보를 노출하지 않는다. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(_error: unknown, _info: ErrorInfo) {
    // 학생 화면에 오류 내용을 보여 주지 않는다.
  }

  override render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }
    return (
      <div className="error-boundary" role="alert">
        <h2>활동을 다시 불러오지 못했어요</h2>
        <p>일시적인 문제가 생겼어요. 처음부터 다시 시작할 수 있어요.</p>
        <button
          type="button"
          className="action-button variant-primary"
          onClick={() => {
            this.setState({ hasError: false });
            this.props.onReset();
          }}
        >
          처음부터 다시 하기
        </button>
      </div>
    );
  }
}
