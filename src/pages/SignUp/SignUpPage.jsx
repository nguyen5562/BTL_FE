import React, { useEffect, useState } from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import imageLogo from '../../assets/images/logo-login.png'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { userService } from '../../services/UserService'
import { useMutationHook } from '../../hooks/useMutationHook'
import Loading from '../../components/Loading/Loading'
import * as message from '../../components/Message/Message'

const SignUpPage = () => {
  const [isShowPass, setIsShowPass] = useState(false)
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setComfirmPassword] = useState('')

  const navigate = useNavigate()
  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }

  const mutation = useMutationHook(
    data => userService.createUser(data)
  )
  const { data, isPending, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess) {
      message.success()
      handleNavigateSignIn()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangeName = (value) => {
    setName(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeConfirmPassword = (value) => {
    setComfirmPassword(value)
  }

  const handleSignUp = () => {
    mutation.mutate({
      name,
      email,
      password,
      confirmPassword
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '500px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng ký tài khoản</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="name" value={name} onChange={handleOnchangeName} />

          <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />

          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <span
              onClick={() => setIsShowPass(!isShowPass)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowPass ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm
              placeholder="password"
              type={isShowPass ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPass(!isShowConfirmPass)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowConfirmPass ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm
              placeholder="confirm password"
              type={isShowConfirmPass ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
            />
          </div>

          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}

          <Loading isLoading={isPending}>
            <ButtonComponent
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textbutton={'Đăng ký'}
              styleText={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </Loading>

          <p></p>
          <p style={{ fontSize: '13px' }}>Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="iamge-logo" height="203px" width="203px" />
          <h4>Mua sắm tại LTTD</h4>
        </WrapperContainerRight>
      </div>
    </div >
  )
}

export default SignUpPage