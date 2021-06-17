import React, { FC, useState, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import Input from 'src/components/atoms/Input'
import PrimaryButton from 'src/components/atoms/PrimaryButton'
import { signIn, signUp } from 'src/actions/authenticationActions'
import { IAuthentication } from 'src/type'
import { AuthType } from 'src/containers/pages/AuthenticationPage'
import AuthError from 'src/components/atoms/AuthError'

type Props = {
  authType: AuthType
}

const AuthenticationForm: FC<Props> = ({ authType }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onClick = () => {
    const user: IAuthentication = {
      email,
      password,
    }
    if (authType === AuthType.SIGNIN) dispatch(signIn(user))
    if (authType === AuthType.SIGNUP) dispatch(signUp(user))
  }

  const title = authType === AuthType.SIGNIN ? 'Sign In' : 'Sign Up'

  return (
    <div className="sign">
      <div className="sign__content">
        <span className="sign__title">{title}</span>
        <Input
          className="input"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          title="Your email"
          type="text"
          placeholder="info@aiit.ac.jp"
        />
        <Input
          className="input"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          title="Password"
          type="password"
          placeholder="******"
        />
        <div className="sign__button">
          <PrimaryButton buttonName={title} onClick={onClick} />
          <AuthError />
        </div>
      </div>
    </div>
  )
}
export default AuthenticationForm
