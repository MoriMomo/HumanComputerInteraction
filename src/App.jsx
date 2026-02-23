import { Routes, Route } from 'react-router-dom'
import { ReactLenis } from '@studio-freight/react-lenis'
import Home from './pages/Home.jsx'

const lenisOptions = {
    lerp: 0.08,
    smoothWheel: true,
    smoothTouch: false,
}

function App() {
    return (
        <ReactLenis root options={lenisOptions}>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </ReactLenis>
    )
}

export default App
