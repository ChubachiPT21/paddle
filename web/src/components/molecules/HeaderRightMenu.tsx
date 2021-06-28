import React, { FC } from 'react'
import { signOut } from 'src/actions/authenticationActions'
import { IUser } from 'src/type'
import { useDispatch } from 'react-redux'
import { Provider } from 'react-redux'
import store from '../../store'



type Props = {
  user: IUser
}

const HeaderRightMenu: FC<Props> = ({ user }) => {

  const onClick = async () => {
    const dispatch = useDispatch()
    await dispatch(signOut())
    window.location.href = '/signin'
  }

  const configuredStore = store


  return (
    <Provider store={configuredStore}>
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
    </Provider>
  )
}

export default HeaderRightMenu
