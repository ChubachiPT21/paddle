import React, { FC, useEffect } from 'react'
import { HeaderNavigation } from 'src/components/molecules/Header'
import AuthenticationForm from 'src/containers/organisms/AuthenticationForm'
import DefaultTemplate from 'src/containers/templates/DefaultTemplate'
import { useSelector, useDispatch } from 'react-redux'
import { IUser } from 'src/type'
import { useHistory } from 'react-router'
import { getAuthentication } from 'src/actions/authenticationActions'

export enum AuthType {
  SIGNUP = 'SIGNUP',
  SIGNIN = 'SIGNIN',
  SIGNOUT = 'SIGNOUT',
}

type Props = {
  authType: AuthType
}

const AuthenticationPage: FC<Props> = ({ authType }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(
    (state: { user: { user: IUser } }) => state.user.user
  )

  useEffect(() => {
    if (!user.token) {
      const asyncFunc = () => {
        dispatch(getAuthentication())
      }
      asyncFunc()
    }
  }, [])

  if (user.token) history.replace('/')

  return (
    <DefaultTemplate defaultNavigation={HeaderNavigation.headerRightMenu}>
      <AuthenticationForm authType={authType} />
    </DefaultTemplate>
  )
}

export default AuthenticationPage
