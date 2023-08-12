import {
  createBrowserRouter,
  Link,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import './styles.css';
// @ts-ignore
import logo from './logo.png';
import { Login } from './components/Login';
import Search from './components/Search';
import { Profile } from './components/Profile';
import { Register } from './components/Register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const redirectIfUser = () => {
  const prevUser = localStorage.getItem('condor-user');
  if (prevUser) return redirect('/search');
  return null;
};
const redirectIfNoUser = () => {
  const prevUser = localStorage.getItem('condor-user');
  if (!prevUser) return redirect('/login');
  return null;
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'login',
        loader: redirectIfUser,
        element: <Login />,
      },
      {
        path: 'register',
        loader: redirectIfUser,
        element: <Register />,
      },
      {
        path: 'search',
        loader: redirectIfNoUser,
        element: <Search />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

function Root() {
  return (
    <>
      <header className='flex px-10 py-8 drop-shadow-lg items-center bg-white mb-5'>
        <Link to='/search'>
          <img src={logo} className='w-8' />
        </Link>
        <a href='#' className='ml-auto'>
          Search
        </a>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
