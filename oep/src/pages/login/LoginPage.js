import React from 'react'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import LoginForm from '../../components/form/LoginForm'
import OepBrand from '../../components/Brand/OepBrand'
import { BsLock } from 'react-icons/bs'

function LoginPage() {
  return (
    <body>
    <OepBrand/>
    <LoginForm>
      <h3>Giriş yap</h3>
      <Input type={'text'} placeholder={'Email'} />
      <Input type={'password'} placeholder={'Şifre'} />
      <Button className={'button-secondary'}>Giriş</Button>
      <a href='#'>Kayıt ol</a>
      <br></br>
      <a href="#">Şifremi Unuttum<BsLock/></a>
    </LoginForm>
    </body>
  )
}

export default LoginPage