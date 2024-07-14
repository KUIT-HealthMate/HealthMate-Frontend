import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home/Home";

const Router = () => {
    const router = createBrowserRouter([
        {
            index: true,
            path: '/',
            element: <Home />,
        }
    ]);

    return <RouterProvider router={router} />;
};

export default Router;