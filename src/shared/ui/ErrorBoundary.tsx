import { Component, ReactNode } from 'react';

interface Props {
  /**
   * 자식 컴포넌트
   */
  children: ReactNode;
  /**
   * 에러 발생 시 표시할 컴포넌트
   */
  fallback?: ReactNode;
}

/**
 * ErrorBoundary의 State 타입
 */
interface State {
  /**
   * 에러 발생 여부
   */
  hasError: boolean;
  /**
   * 발생한 에러 객체
   */
  error: Error | null;
}

/**
 * React 에러 경계(Error Boundary) 컴포넌트
 *
 * 하위 컴포넌트 트리에서 발생한 JavaScript 에러를 포착하고,
 * 에러 로그를 기록하며, 대체 UI를 표시합니다.
 *
 * @example
 * // 기본 사용 (기본 에러 UI 표시)
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 *
 * @example
 * // 커스텀 대체 UI 제공
 * <ErrorBoundary fallback={<div>문제가 발생했습니다</div>}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * 에러가 발생했을 때 state를 업데이트하는 정적 메서드
   *
   * @param error - 발생한 에러
   * @returns 업데이트된 state
   */
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /**
   * 에러가 발생했을 때 호출되는 생명주기 메서드
   * 에러 정보를 콘솔에 로깅합니다.
   *
   * @param error - 발생한 에러
   * @param errorInfo - 에러 정보 (컴포넌트 스택 등)
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError === false) {
      return this.props.children;
    }

    if (this.props.fallback) {
      return this.props.fallback;
    }

    return (
      <div style={{ padding: '16px', textAlign: 'center', color: '#ff4444' }}>
        {this.state.error?.message || '오류가 발생했습니다'}
      </div>
    );
  }
}
