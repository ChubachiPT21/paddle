import React from 'react'
import { render, screen } from '@testing-library/react'

import Header, { HeaderNavigation } from 'src/components/molecules/Header'
import { IUser } from 'src/type'

const user: IUser = {
  token: 'token',
  email: 'sample@email.com',
}

describe('molecules/Header', () => {
  test('should have an active home button and no right-menu items', () => {
    render(<Header user={user} currentNavigation={HeaderNavigation.home} />)

    expect(screen.getByTestId('navigation-home')).toHaveClass(
      'navigation--active'
    )
    expect(screen.getByTestId('navigation-explore')).not.toHaveClass(
      'navigation--active'
    )
    expect(screen.queryByTestId('right-menu-sign-in')).toBeNull()
    expect(screen.queryByTestId('right-menu-sign-up')).toBeNull()
    expect(screen.getByText(`Welcome! ${user.email}`)).toBeInTheDocument()
  })

  test('should have an active explore button and no right-menu items', () => {
    render(<Header user={user} currentNavigation={HeaderNavigation.explore} />)

    expect(screen.getByTestId('navigation-home')).not.toHaveClass(
      'navigation--active'
    )
    expect(screen.getByTestId('navigation-explore')).toHaveClass(
      'navigation--active'
    )
    expect(screen.queryByTestId('right-menu-sign-in')).toBeNull()
    expect(screen.queryByTestId('right-menu-sign-up')).toBeNull()
    expect(screen.getByText(`Welcome! ${user.email}`)).toBeInTheDocument()
  })

  test('should have two right menu items', () => {
    render(
      <Header
        user={{ email: 'test', token: '' }}
        currentNavigation={HeaderNavigation.explore}
      />
    )
    expect(screen.queryByText(`/Welcome!/`)).toBeNull()
    expect(screen.getByTestId('right-menu-sign-in')).toBeInTheDocument()
    expect(screen.getByTestId('right-menu-sign-up')).toBeInTheDocument()
  })
})
