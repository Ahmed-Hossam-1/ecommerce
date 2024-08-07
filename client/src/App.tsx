import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./web/pages/Home";
import AdminPage from "./dashboard/pages/AdminPage";
import Signup from "./auth/auth";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="signin" element={<Signup />} />
        <Route path="signup" element={<Signup />} />
        <Route path="admin_page" element={<AdminPage />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
