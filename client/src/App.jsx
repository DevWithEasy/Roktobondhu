import { useRoutes } from "react-router-dom"
import { About, AddContributer, AllPartners, AllVolantears, Blog, BlogCreate, BlogDetails, BlogUpdate, Contact, Find, Forget, Home, Info, Layout, Login, NotFound, Partners, Profile, Protected, Registration, ResetPassword, UpdateAddress, UpdateContributer, UpdateDonate, UpdateInfo, UpdatePassword, Verification, Volantears,Users,UpdateUser } from './pages/index'

function App() {
  const routes = useRoutes([
    {
      path: '',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/find',
          element: <Find />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/blog',
          element: <Blog />
        },
        {
          path: '/blog/create',
          element: <Protected>
            <BlogCreate />
          </Protected>
        },
        {
          path: '/blog/update/:id',
          element: <Protected>
            <BlogUpdate />
          </Protected>
        },
        {
          path : '/blog/:id',
          element: <BlogDetails />
        },
        {
          path: '/partners',
          element: <Partners />
        },
        {
          path: '/volanrears',
          element: <Volantears />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/registration',
          element: <Registration />
        },
        {
          path : '/verification',
          element: <Verification />
        },
        {
          path: '/forget',
          element: <Forget />
        },
        {
          path: '/reset',
          element: <ResetPassword />
        },
        {
          path: '/profile',
          element: <Protected>
            <Profile>
              <Info />
            </Profile>
          </Protected>
        },
        {
          path: '/user/update/info',
          element: <Profile>
            <UpdateInfo />
          </Profile>
        },
        {
          path: '/user/update/address',
          element: <Profile>
            < UpdateAddress/>
          </Profile>
        },
        {
          path: '/user/update/donate',
          element: <Profile>
            <UpdateDonate />
          </Profile>
        },
        {
          path: '/user/add/contributor',
          element: <Profile>
            <AddContributer />
          </Profile>
        },
        {
          path: '/user/update/contributor/:id',
          element: <Profile>
            <UpdateContributer />
          </Profile>
        },
        {
          path: '/user/all/volantears',
          element: <Profile>
            <AllVolantears />
          </Profile>
        },
        {
          path: '/user/all/partners',
          element: <Profile>
            <AllPartners />
          </Profile>
        },
        {
          path: '/user/all/users',
          element: <Profile>
            <Users />
          </Profile>
        },
        {
          path: '/user/all/users/update/:id',
          element: <Profile>
            <UpdateUser />
          </Profile>
        },
        {
          path: '/user/update/password',
          element: <Profile>
            <UpdatePassword />
          </Profile>
        },
        {
          path: '*',
          element: <NotFound/>
        }
      ]
    }
  ])
  return routes
}

export default App
