import { ReactLenis } from '@studio-freight/react-lenis'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
    return (
        <ReactLenis root>
            <Router
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <div className="bg-deep-black min-h-screen">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </ReactLenis>
    )
}

export default App
