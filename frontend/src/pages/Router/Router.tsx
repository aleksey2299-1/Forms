import { createBrowserRouter } from 'react-router-dom';

import { fetchActiveFormData } from '@utils/api/FormApi';

import { adminLoader } from '@utils/loaders/AdminLoader';

import Admin from '../Admin/Admin';
import ErrorPage from '../ErrorPage/ErrorPage';
import FormForFill from '../FormForFill/FormForFill';
import LoginPage from '../Login/Login';


const router = createBrowserRouter([
  {
    path: 'forms',
    element: <Admin />,
    loader: adminLoader,
    children: [
      {
        path: '/forms/:formId',
        element: <Admin />,
        loader: adminLoader,
      },
      {
        path: '/forms/filled-forms/:formId',
        element: <Admin />,
        loader: adminLoader,
      },
    ],
  },
  {
    path: '/login/',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <FormForFill />,
    loader: fetchActiveFormData,
    errorElement: <ErrorPage />,
  },
]);

export default router;
