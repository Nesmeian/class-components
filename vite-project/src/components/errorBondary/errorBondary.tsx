import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo?: ErrorInfo | null;
}
interface Props {
    children?: ReactNode;
}
interface Props {}
class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Можно также залогировать ошибку в сервисе отчетов об ошибках
        console.error('Uncaught error:', error, errorInfo);
        this.setState({ errorInfo });
    }

    render(): ReactNode {
        if (this.state.hasError) {
            // Можно отрендерить любой запасной UI
            return (
                <div>
                    <h2>Что-то пошло не так.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo?.componentStack}
                    </details>
                </div>
            );
        }

        // Если нет ошибок, рендерим детей
        return this.props.children;
    }
}

export default ErrorBoundary;
