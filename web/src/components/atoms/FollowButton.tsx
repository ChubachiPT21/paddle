import React, { FC } from 'react'

type Props = {
  isFollowing: boolean
  onClick(): void
}

const FollowButton: FC<Props> = ({ isFollowing, onClick }) => (
  <button
    onClick={onClick}
    className={isFollowing ? 'search__btnFollowing' : 'search__btnFollow'}
    type="button"
  >
    {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
  </button>
)

export default FollowButton
