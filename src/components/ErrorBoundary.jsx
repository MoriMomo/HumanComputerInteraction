"use client";
import PropTypes from 'prop-types'
import { Component } from 'react'

/**
 * Error boundary component for catching React errors
 * Provides fallback UI when component tree crashes
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error boundary caught:', error, errorInfo)
    }

    handleReload = () => {
        window.location.reload()
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div
                    className="flex flex-col items-center justify-center w-full h-full min-h-screen"
                    style={{ background: '#F6F6F4', color: '#333333' }}
                >
                    <div className="text-center max-w-md px-8">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
                        <p className="mb-4" style={{ color: '#666666' }}>
                            {this.props.errorMessage || 'An unexpected error occurred'}
                        </p>
                        <button
                            onClick={this.handleReload}
                            style={{
                                padding: '12px 24px',
                                background: '#584738',
                                color: 'white',
                                borderRadius: '6px',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#4a3a2c'}
                            onMouseLeave={e => e.currentTarget.style.background = '#584738'}
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

ErrorBoundary.propTypes = {
    /** Custom fallback UI rendered when an error is caught */
    fallback: PropTypes.node,
    /** Custom error message shown in the default fallback */
    errorMessage: PropTypes.string,
    /** Child components wrapped by the error boundary */
    children: PropTypes.node.isRequired,
}

export default ErrorBoundary
