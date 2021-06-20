import React from 'react'
import { render, screen } from '@testing-library/react'
import FollowButton from 'src/components/atoms/FollowButton'

describe('atoms/FollowButton', () => {
  test('should have following button', () => {
    render(<FollowButton isFollowing onClick={jest.fn()} />)
    expect(screen.getByRole('button')).toHaveClass('search__btnFollowing')
    expect(screen.getByRole('button')).not.toHaveClass('search__btnFollow')
    expect(screen.getByRole('button').textContent).toEqual('FOLLOWING')
  })

  test('should have follow button', () => {
    render(<FollowButton isFollowing={false} onClick={jest.fn()} />)
    expect(screen.getByRole('button')).toHaveClass('search__btnFollow')
    expect(screen.getByRole('button')).not.toHaveClass('search__btnFollowing')
    expect(screen.getByRole('button').textContent).toEqual('FOLLOW')
  })
})
