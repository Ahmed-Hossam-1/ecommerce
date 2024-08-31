import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./web/pages/Home";
import AdminPage from "./dashboard/pages/admin/AdminPage";
import Signup from "./auth/auth";
import RegisterSeller from "./auth/RegisterSeller";
import AuthRounting from "./auth/AuthRounting";
import NotFoundPage from "./auth/NotFoundPage";
import RequierBack from "./auth/RequierBack";
import AuthRoutingWeb from "./auth/AuthRoutingWeb";
import DashboardLayout from "./layout/DashboardLayout";
import Categories_page from "./dashboard/pages/categories/Categories.page";
import Products_page from "./dashboard/pages/products/Products.page";
import UsersPage from "./dashboard/pages/users/Users.page";
import UseFormUser from "./dashboard/pages/users/UseFormUser";
import Seller_req_page from "./dashboard/pages/seller/Seller_req.page";
import UseFormProduct from "./dashboard/pages/products/UseFormProduct";
import UseFormCategory from "./dashboard/pages/categories/UseFormCategory";
import CartPage from "./web/pages/CartPage";
import ProductDetails from "./web/pages/ProductDetails";
import PaymentPage from "./web/pages/PaymentPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ResultSearchPage from "./web/pages/ResultSearchPage";

const App = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_SECRET_KEY);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          {/* Register Seller */}
          <Route path="register_seller" element={<RegisterSeller />} />
          {/* Home */}
          <Route element={<AuthRoutingWeb />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="results-search" element={<ResultSearchPage />} />
            <Route
              path="payment"
              element={
                <Elements stripe={stripePromise}>
                  <PaymentPage />
                </Elements>
              }
            />
          </Route>
          {/* Auth */}
          <Route element={<RequierBack />}>
            <Route path="signin" element={<Signup />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Route>

        <Route element={<AuthRounting allowedRole="admin" />}>
          <Route path="admin_page" element={<DashboardLayout />}>
            <Route index element={<AdminPage />} />
            {/* users */}
            <Route path="users" element={<Outlet />}>
              <Route index element={<UsersPage />} />
              <Route path="adduser" element={<UseFormUser isEdit={false} />} />
              <Route
                path="edite/:userId"
                element={<UseFormUser isEdit={true} />}
              />
            </Route>
            {/* categories */}
            <Route path="categories" element={<Outlet />}>
              <Route index element={<Categories_page />} />
              <Route
                path="addcategory"
                element={<UseFormCategory isEdit={false} />}
              />
              <Route
                path="edite/:categoryId"
                element={<UseFormCategory isEdit={true} />}
              />
            </Route>
            {/* prodcut */}
            <Route path="products" element={<Outlet />}>
              <Route index element={<Products_page />} />
              <Route
                path="addproduct"
                element={<UseFormProduct isEdit={false} />}
              />
              <Route
                path="edit/:productId"
                element={<UseFormProduct isEdit={true} />}
              />
            </Route>
            {/* seller_req */}
            <Route path="seller_req" element={<Seller_req_page />} />
          </Route>
        </Route>

        {/* Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
