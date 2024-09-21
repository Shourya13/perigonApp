import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Users from "../Modules/users/Users";
import EditUser from "../Modules/editUser/EditUser";

const router = createBrowserRouter([
  {
    path: "/",
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
