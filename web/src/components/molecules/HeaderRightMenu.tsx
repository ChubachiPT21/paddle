import React, { FC } from 'react'
import { signOut } from 'src/actions/authenticationActions'
import { IUser } from 'src/type'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

type Props = {
  user: IUser
}

const HeaderRightMenu: FC<Props> = ({ user }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onClick = async () => {
    await dispatch(signOut())
    history.replace('/signin')
  }

  return (
    <div className="rightMenu">
      {user.token && (
        <span>
          Welcome! {user.email}
          <span
            id="right-menu-sign-out"
            className="rightMenu__item rightMenu__item--border pointer"
            onKeyDown={onClick}
            onClick={onClick}
            role="link"
            tabIndex={0}
          >
            Sign Out
          </span>
        </span>
      )}
      {!user.token && (
        <>
          <a id="right-menu-sign-in" href="/signin" className="rightMenu__item">
            Sign In
          </a>
          <a
            id="right-menu-sign-up"
            href="/signup"
            className="rightMenu__item rightMenu__item--border"
          >
            Sign Up
          </a>
        </>
      )}
    </div>
  )
}

export default HeaderRightMenu
