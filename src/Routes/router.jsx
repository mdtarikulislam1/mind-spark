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
import Expense from "../Pages/Expense";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: DashBoard,
      },

      // single component
      {
        path: "/sales",
        Component: Sales,
      },
      {
        path: "/orders",
        Component: Orders,
      },
      {
        path: "/expenses",
        Component: Expense,
      },

      //   product sub component
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
        Component: Inventory,
      },
      {
        path: "/product/addProduct",
        Component: AddProduct,
      },

      // setting sub component

      {
        path: "/settings/history",
        Component: History,
      },
    ],
  },
]);
