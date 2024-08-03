import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ContactPage from './Pages/ContactPage/ContactPage.tsx'
import MainPage from './Pages/MainPage/MainPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
    children: [

    ]
  },
  {
    path: "contact/:contactId",
    element: <ContactPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
