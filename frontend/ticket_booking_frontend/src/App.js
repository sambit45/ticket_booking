import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Main/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
