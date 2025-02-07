import React from 'react'
import { render, screen } from '@testing-library/react'
import { useDispatch } from 'react-redux'
import HeaderRightMenu from 'src/components/molecules/HeaderRightMenu'
import { IUser } from 'src/type'

jest.mock('react-redux')

const user: IUser = {
  token: 'token',
  email: 'sample@email.com',
}

describe('molecules/HeaderRightMenu', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn())
  })

  test('should have no right-menu items', () => {
    render(<HeaderRightMenu user={user} />)

    expect(screen.queryByTestId('right-menu-sign-in')).toBeNull()
    expect(screen.queryByTestId('right-menu-sign-up')).toBeNull()
    expect(screen.getByText(`Welcome! ${user.email}`)).toBeInTheDocument()
  })

  test('should have two right menu items', () => {
    render(<HeaderRightMenu user={{ email: 'test', token: '' }} />)
    expect(screen.queryByText(`/Welcome!/`)).toBeNull()
    expect(screen.getByTestId('right-menu-sign-in')).toBeInTheDocument()
    expect(screen.getByTestId('right-menu-sign-up')).toBeInTheDocument()
  })
})
