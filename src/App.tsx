import { Fragment } from "react/jsx-runtime";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import listRoute from "./routes";

const router = createBrowserRouter(
  listRoute.map((item) => {
    const Page = item.component;
    const Layout = item.layout ?? Fragment;

    return {  
      path: item.path,
      element: (
        <>
          <ScrollRestoration />
          <Layout>{Page}</Layout>
        </>
      ),
    };
  })
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
