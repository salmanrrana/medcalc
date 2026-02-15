import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

import Header from '../components/Header'

import appCss from '../styles.css?url'

interface AppErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorId: string | null
}

class AppErrorBoundary extends Component<
  { children: ReactNode },
  AppErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null, errorId: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Generate unique error ID for user reference
    const errorId = crypto.randomUUID()

    // Log error with full context
    const errorPayload = {
      id: errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }

    console.error('Application Error:', errorPayload)

    // In production, this would send to error tracking service
    // await fetch('/api/errors', { method: 'POST', body: JSON.stringify(errorPayload) })

    // Store errorId in state so it can be displayed to user
    this.setState({ errorId })
  }

  render() {
    if (this.state.hasError) {
      return (
        <html lang="en">
          <head>
            <title>Error - MedCalc</title>
            <style>{`
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background: white; }
              .error-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
              .error-content { max-width: 32rem; text-align: center; }
              .error-title { font-size: 32px; font-weight: bold; color: rgb(17, 24, 39); margin-bottom: 16px; }
              .error-text { font-size: 18px; color: rgb(75, 85, 99); margin-bottom: 32px; }
              .error-button { padding: 12px 24px; background: rgb(37, 99, 235); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
              .error-button:hover { background: rgb(29, 78, 216); }
              .error-details { margin-top: 32px; text-align: left; background: rgb(249, 250, 251); padding: 16px; border-radius: 8px; }
              .error-details summary { cursor: pointer; font-weight: 600; color: rgb(55, 65, 81); margin-bottom: 8px; }
              .error-details pre { font-size: 12px; color: rgb(220, 38, 38); overflow: auto; margin: 0; }
            `}</style>
          </head>
          <body>
            <div className="error-container">
              <div className="error-content">
                <h1 className="error-title">Something went wrong</h1>
                <p className="error-text">
                  The application encountered an unexpected error. Please refresh the page to try again.
                </p>
                {this.state.errorId && (
                  <p style={{ fontSize: '14px', color: 'rgb(107, 114, 128)', marginBottom: '16px' }}>
                    Error ID: <code style={{ fontFamily: 'monospace', backgroundColor: 'rgb(243, 244, 246)', padding: '2px 4px', borderRadius: '4px' }}>{this.state.errorId}</code>
                  </p>
                )}
                <button className="error-button" onClick={() => window.location.reload()}>
                  Refresh Page
                </button>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="error-details">
                    <summary>Error Details (Development Only)</summary>
                    <pre>{this.state.error.toString()}\n\n{this.state.error.stack}</pre>
                  </details>
                )}
              </div>
            </div>
          </body>
        </html>
      )
    }

    return this.props.children
  }
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'MedCalc - Medical Date Calculators',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <AppErrorBoundary>
          <Header />
          {children}
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </AppErrorBoundary>
        <Scripts />
      </body>
    </html>
  )
}
