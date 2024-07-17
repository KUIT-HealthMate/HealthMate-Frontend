import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./pages/Home/Home";
import SupplementChallengeEditingPage from './pages/Home/SupplementChallengeEditingPage';

const Router = () => {
    const router = createBrowserRouter([
        {
            index: true,
            path: '/',
            element: <Home />,
        },
        {
            index: true,
            path: '/supplementChallengeEdit',
            element: <SupplementChallengeEditingPage />,
        }
        //,
        // {
        //     index: true,
        //     path: '/habitChallengEdit',
        //     element: <HabitChallengeEditingPage />,
        // }
    ]);

    return <RouterProvider router={router} />;
};

export default Router;