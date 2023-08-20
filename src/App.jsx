import Login from "./pages/Login";
import Register from "./pages/Register";
import './style.scss'
import './style.css'
import Home from "./pages/Home";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Chat from "./components/Chat";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Protected from "./routes/Protected";
import Public from "./routes/Public";
import 'react-spinner-animated/dist/index.css'

const router = createBrowserRouter([
  {
    path:'/',
    element: <Public>
              <Login />
            </Public>
  },
  {
    path: 'login',
    element: <Public>
                <Login />
              </Public>
  },
  {
    path: 'registration',
    element: <Public>
              <Register />
            </Public>
  },
  {
    path: 'chatRoom',
    element: (<Protected>
              <Home />
            </Protected> )
  }
])



function App() {



  return (
    <RouterProvider router={router}>
      <Register />
    </RouterProvider>
  )
}

export default App;
