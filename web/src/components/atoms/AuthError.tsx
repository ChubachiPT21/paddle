import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { IUserState } from 'src/reducers/userReducers'

const AuthError: FC = () => {
  const authenticationError = useSelector(
    (state: { user: IUserState }) => state.user.error
  )

  if (authenticationError) {
    return (
      <div className="auth-error">Email or password is invalid</div>
    )
  }
  return <div />
}

export default AuthError
