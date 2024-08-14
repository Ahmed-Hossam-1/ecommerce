import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './web/pages/Home';
import AdminPage from './dashboard/pages/AdminPage';
import Signup from './auth/auth';
import AuthRounting from './auth/AuthRounting';
import NotFoundPage from './auth/NotFoundPage';
import RequierBack from './auth/RequierBack';
import AuthRoutingWeb from './auth/AuthRoutingWeb';
import DashboardLayout from './layout/DashboardLayout';
import UsersPage from './dashboard/pages/Users.page';
import Seller_page from './dashboard/pages/Seller.Page';
import Seller_req_page from './dashboard/pages/Seller_req.page';
import Categories_page from './dashboard/pages/Categories.page';
import Products_page from './dashboard/pages/Products.page';
import Reports_page from './dashboard/pages/Reports.page';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route element={<AuthRoutingWeb />}>
          <Route index element={<Home />}></Route>
        </Route>
        <Route element={<RequierBack />}>
          <Route path="signin" element={<Signup />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<AuthRounting allowedRole={['admin', 'seller']} />}>
          <Route path="admin_page" element={<DashboardLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="sellers" element={<Seller_page />} />
            <Route path="seller_req" element={<Seller_req_page />} />
            <Route path="categories" element={<Categories_page />} />
            <Route path="products" element={<Products_page />} />
            <Route path="reports" element={<Reports_page />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
