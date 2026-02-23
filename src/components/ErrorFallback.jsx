import PropTypes from 'prop-types'

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-deep-black px-6 text-white">
            <div className="glass max-w-lg rounded-2xl p-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-electric-cyan">
                    System Alert
                </p>
                <h1 className="mt-4 text-2xl font-semibold">Something slipped out of alignment.</h1>
                <p className="mt-3 text-sm text-gray-400">{error?.message}</p>
                <button
                    type="button"
                    onClick={resetErrorBoundary}
                    className="mt-6 rounded-full border border-electric-cyan px-6 py-2 text-sm font-semibold text-electric-cyan transition hover:glow-cyan"
                >
                    Reload Interface
                </button>
            </div>
        </div>
    )
}

ErrorFallback.propTypes = {
    error: PropTypes.instanceOf(Error),
    resetErrorBoundary: PropTypes.func.isRequired,
}

export default ErrorFallback
