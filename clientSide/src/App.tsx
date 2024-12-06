import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './Styles/App.css'
import './Styles/Components/Header/Header.css'
import './Styles/Pages/Home.css'
import './Styles/Components/Footer/Footer.css'
import './Styles/Components/Home/FreshPicks.css'
import './Styles/Components/Button/Buttons.css'
import './Styles/Components/Home/MovieCarousel.css'
import './Styles/Components/Home/NowShowing.css'
import './Styles/Components/Home/Popular.css'
import './Styles/Components/Home/Upcoming.css'
import './styles/Components/Header/Admin/Header.css'
import Home from './pages/Home'
import MovieList from './pages/Lists/MovieList'
import TvList from './pages/Lists/TvList'
import PeopleList from './pages/Lists/PeopleList'
import './styles/Components/Lists/GridView.css'
import MovieDetails from './pages/Details/MovieDetails'
import MovieImages from './pages/Details/MovieImages'
import MovieCredits from './pages/Details/MovieCredits'
import MovieVideos from './pages/Details/MovieVideos'
import TvDetails from './pages/Details/TvDetails'
import TvCredits from './pages/Details/TvCredits'
import TvVideos from './pages/Details/TvVideos'
import TvImages from './pages/Details/TvImages'
import SignIn from './pages/SignIn'
import { AuthProvider } from './context/AuthContext'
import PublicLayout from './pages/PublicLayout'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminPage from './pages/Admin/AdminPage'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './pages/PersistLogin'
import AdminMovie from './pages/Admin/AdminMovie'
import CreateMovie from './pages/Admin/CreateMovie'
import EditMovie from './pages/Admin/EditMovie'
import AdminMovieDetails from './pages/Admin/AdminMovieDetails'
import Register from './pages/Register'

const adminRole = Number(import.meta.env.VITE_YT_ROLE_ADMIN);
export const LOCALHOST = 'http://localhost:3000';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/movies',
        element: <MovieList />
      },
      {
        path: '/movies/:movieId',
        element: <MovieDetails />
      },
      {
        path: '/movies/:movieId/cast',
        element: <MovieCredits />
      },
      {
        path: '/movies/:movieId/videos',
        element: <MovieVideos />
      },
      {
        path: '/movies/:movieId/images/:mediaType',
        element: <MovieImages />
      },
      {
        path: '/tv',
        element: <TvList />
      },
      {
        path: '/tv/:tvId',
        element: <TvDetails />
      },
      {
        path: '/tv/:tvId/cast',
        element: <TvCredits />
      },
      {
        path: '/tv/:tvId/videos',
        element: <TvVideos />
      },
      {
        path: '/tv/:tvId/images/:mediaType',
        element: <TvImages />
      },
      {
        path: '/people',
        element: <PeopleList />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/signup',
        element: <Register />
      }
    ]
  },
  {
    path: '*',
    element: <PersistLogin />,
    children: [
      {
        path: 'admin',
        element: (
          <RequireAuth allowedRoles={[adminRole]}>
            <AdminLayout />
          </RequireAuth>
        ),
        children: [
          { path: '', element: <AdminPage /> },
          { path: 'movie', element: <AdminMovie /> },
          { path: 'movie/create', element: <CreateMovie /> },
          { path: 'movie/:movieId', element: <AdminMovieDetails /> },
          { path: 'movie/:movieId/edit', element: <EditMovie /> },
        ]
      }
    ]
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

