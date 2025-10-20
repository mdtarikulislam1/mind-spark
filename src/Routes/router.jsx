import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import About from "../Component/About";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
         index: true,
         Component: About

        }
    ]
  },
]);