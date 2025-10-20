import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import DashBoard from "../Pages/DashBoard";
import Procurement from "../Pages/Procurement";
import Orders from "../Pages/Orders";
import History from "../Pages/History";
import Sales from "../Pages/Sales";
import Received from "../Pages/Received";
import Inventory from "../Pages/Inventory";
import AddProduct from "../Pages/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: DashBoard,
      },
    //   product
      {
        path: "/product/procurement",
        Component: Procurement,
      },
      {
        path: "/product/received",
        Component: Received,
      },
      {
        path: "/product/inventory",
        Component: Inventory
      },
      {
        path: "/product/addProduct",
        Component: AddProduct
      },
      {
        path: "/orders",
        Component: Orders
      },
      {
        path: "/settings/history",
        Component: History
      },
      {
        path: "/sales",
        Component: Sales
      },
      
    ],
  },
]);
