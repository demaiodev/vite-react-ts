import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import Home from "./routes/Home";
import MyList from "./routes/MyList";

const routes = [
  {
    path: "/",
    text: "Home",
    component: <Home />,
  },
  {
    path: "my-list",
    text: "My List",
    component: <MyList />,
  },
];

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="my-4">
          {routes.map(({ path, text }) => (
            <NavLink
              key={text}
              to={path}
              className="px-2 hover:text-white hover:underline"
            >
              {text}
            </NavLink>
          ))}
        </nav>
        <Routes>
          {routes.map(({ component, text, path }) => (
            <Route key={text} path={path} element={component} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
