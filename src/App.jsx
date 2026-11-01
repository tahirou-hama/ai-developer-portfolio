import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectDetails from './pages/ProjectDetails.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectDetails />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;