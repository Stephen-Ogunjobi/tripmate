import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Homepage from "./pages/Homepage";
import MyTrips from "./pages/MyTrips";
import DestinationExplorer from "./pages/DestinationExplorer";
import TripPlanner from "./pages/TripPlanner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/my-trips",
          element: <MyTrips />,
        },
        {
          path: "/destination-explorer",
          element: <DestinationExplorer />,
        },
        {
          path: "/trip-planner",
          element: <TripPlanner />,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </QueryClientProvider>
  );
}
