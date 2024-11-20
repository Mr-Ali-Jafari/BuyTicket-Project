// componetns
import Home from "./pages/home"
import Dashboard from './pages/Dashboard'
import { Profile } from "./Components/Profile/Profile"
import EditUser from "./Components/Profile/EditUser/EditUser"

const routes = [
    { path: '/', element: <Home /> },
    { path: 'dd', element: <p>dd page</p> },
    {
        path: 'dashboard', element: <Dashboard />, children: [
            { index: true, element: <Profile />},
            { path: 'edit-info', element: <EditUser /> },
            { path: 'travels', element: <p>wallet</p> },
            { path: 'wallet', element: <p>wallet</p> },
            { path: 'tickets', element: <p>ticket</p> },
        ]
    }
]

export default routes