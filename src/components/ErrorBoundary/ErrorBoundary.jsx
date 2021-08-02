import React, {PureComponent} from 'react';
import ErrorMessage from './ErrorMessage';

class ErrorBoundary extends PureComponent {
    state = {errorPresent: false};

    static getDerivedStateFromError(error) {
        return ()=>({errorPresent: true})
    };

    render() {
        if (this.state.errorPresent) {
            return <ErrorMessage/>
        } else
            return this.props.children
    }
}

export default ErrorBoundary;