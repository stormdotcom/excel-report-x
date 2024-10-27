/* eslint-disable no-console */
// src/components/ErrorBoundary.js
import React, { Component } from "react";
import ErrorFallback from "./ErrorFallback";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    resetErrorBoundary = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorFallback error={this.state.error} resetErrorBoundary={this.resetErrorBoundary} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
