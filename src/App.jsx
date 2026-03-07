import { Suspense, lazy } from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

const Home = lazy(() => import('./pages/Home'))

function App() {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.05, // Lower lerp for smoother scrolling (less aggressive snapping)
                duration: 1.5,
                smoothWheel: true,
                smoothTouch: false,
                wheelMultiplier: 1.2,
                touchMultiplier: 2,
            }}
        >
            <Router
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <div className="bg-background-light min-h-screen relative">
                    <Navbar />
                    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </Suspense>
                </div>
            </Router>
        </ReactLenis>
    )
}

export default App
