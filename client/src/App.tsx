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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route element={<RequierBack />}>
          <Route path="signin" element={<Signup />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<AuthRounting allowedRole={['admin', 'seller']} />}>
          <Route path="admin_page" element={<AdminPage />}></Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
