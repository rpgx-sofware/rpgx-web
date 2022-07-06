import React from "react";
import Register from "./views/register";
import Login from "./views/login";
import Layout from "./views/shared/layout"
import RequireAuth from "./components/RequireAuth";
import {Routes, Switch, Route} from "react-router-dom"
import Dashboard from './views/Dashboard'
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin/>}>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>} />
          <Route element={<RequireAuth neededPerms={["view.basic"]} />}>
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
