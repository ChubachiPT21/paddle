import React, { FC } from 'react'
import { IUser } from 'src/type'

type Props = {
  user: IUser
}

const HeaderRightMenu: FC<Props> = ({ user }) => (
  <div className="rightMenu">
    {user.token && <span>Welcome! {user.email}</span>}
    {!user.token && (
      <>
        <a href="/signin" className="rightMenu__item">
          Sign In
        </a>
        <a href="/signup" className="rightMenu__item rightMenu__item--border">
          Sign Up
        </a>
      </>
    )}
  </div>
)

export default HeaderRightMenu
