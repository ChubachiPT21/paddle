import React, { FC } from 'react'

type Props = {
  className: string
  buttonName: string
  onClick(): void
}

const FollowButton: FC<Props> = ({ className, buttonName, onClick }) => (
  <button onClick={onClick} className={className} type="button">
    {buttonName}
  </button>
)

export default FollowButton
