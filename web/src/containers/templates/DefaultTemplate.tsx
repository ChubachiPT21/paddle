import React, { FC } from 'react'
import Header, { HeaderNavigation } from 'src/components/molecules/Header'
import { IUser } from 'src/type'
import { useSelector } from 'react-redux'

type Props = {
  defaultNavigation: HeaderNavigation
}

const DefaultTemplate: FC<Props> = ({ children, defaultNavigation }) => {
  const user = useSelector(
    (state: { user: { user: IUser } }) => state.user.user
  )

  return (
    <div className="fullHeight">
      <Header user={user} currentNavigation={defaultNavigation} />
      {children}
    </div>
  )
}

export default DefaultTemplate
