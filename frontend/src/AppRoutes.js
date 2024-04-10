import Calculator from './components/Calculator';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { Home } from "./components/Home";


const AppRoutes = createBrowserRouter([
  // {
  //   index: true,
  //   element: <Home />
  // },
  {
    path: '/calculator',
    element: <Calculator />
  },


]);

export default AppRoutes;
