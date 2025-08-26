import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import EventDetailsRoute from "./pages/EventDetailsRoute";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    children: [
      {
        path: "",
        element: <AppLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "details/:id",
            element: <EventDetailsRoute />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}> </RouterProvider>;
};

export default App;
