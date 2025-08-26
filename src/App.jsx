import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Dashboard } from "./pages/Dashboard";
import EventDetailsRoute from "./pages/EventDetailsRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireAuth from "./components/RequireAuth";
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
            element: (
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            ),
          },
          {
            path: "details/:id",
            element: (
              <RequireAuth>
                <EventDetailsRoute />
              </RequireAuth>
            ),
          },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

const App = () => {
  return <RouterProvider router={router}> </RouterProvider>;
};

export default App;
