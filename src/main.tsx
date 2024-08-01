import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ContactPage from './Components/ContactPage/ContactPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
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
