import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "../App";
import Users from "../Modules/users/Users";
import EditUser from "../Modules/editUser/EditUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "editUser/:id",
    element: <EditUser />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
