import React, { FC } from 'react'
import { HeaderNavigation } from 'src/components/molecules/Header'
import AuthenticationForm from 'src/containers/organisms/AuthenticationForm'
import DefaultTemplate from 'src/containers/templates/DefaultTemplate'
import { useSelector } from 'react-redux'
import { IUser } from 'src/type'
import { useHistory } from 'react-router'

export enum AuthType {
  SIGNUP = 'SIGNUP',
  SIGNIN = 'SIGNIN',
}

type Props = {
  authType: AuthType
}

const AuthenticationPage: FC<Props> = ({ authType }) => {
  const history = useHistory()
  const user = useSelector(
    (state: { user: { user: IUser } }) => state.user.user
  )

  if (user.token) {
    // TODO:
    history.replace('/')
  }

  return (
    <DefaultTemplate defaultNavigation={HeaderNavigation.headerRightMenu}>
      <AuthenticationForm authType={authType} />
    </DefaultTemplate>
  )
}

export default AuthenticationPage
