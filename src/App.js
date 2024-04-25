import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from "./routes";
import DefaultComponent from "./components/Default/DefaultComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  //useEffect(() => {
  //  fetchApi()
  //}, [])

  // const fetchApi = async () => {
  //   const res = await axios.get('http://localhost:3001/api/product/get-all-product')
  //   return res.data
  // }

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log(query)
  
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <route.page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
