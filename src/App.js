import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from "./routes";
import DefaultComponent from "./components/Default/DefaultComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, resetUser } from "./redux/slides/userSlide";
import Loading from "./components/Loading/Loading";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { userService } from "./services/UserService"
import { isJsonString } from './utils'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const { decoded, storageData } = handleDecoded()
    if (decoded?.id) {
      handleGetUser(decoded?.id, storageData)
    }
    setIsLoading(false)
  }, [])

  const handleGetUser = async (id, token) => {
    const storage = localStorage.getItem('refresh_token')
    const refresh_token = JSON.parse(storage)
    const res = await userService.getUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refresh_token }))
  }

  const handleDecoded = () => {
    let storageData = user?.access_token || localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }

  axios.create().interceptors.request.use(async (config) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await userService.refreshToken(refreshToken)
      config.headers['token'] = `Bearer ${data?.access_token}`
    } else {
      dispatch(resetUser())
    }
    return config
  }, (err) => {
    return Promise.reject(err)
  })

  return (
    <div>
      <Loading isLoading={isLoading}>
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
      </Loading>
    </div>
  );
}

export default App;
