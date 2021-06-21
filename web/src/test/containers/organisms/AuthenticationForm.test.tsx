import React from 'react'
import { render } from '@testing-library/react'
import { useDispatch } from 'react-redux'
import { AuthType } from 'src/containers/pages/AuthenticationPage'
import AuthenticationForm from 'src/containers/organisms/AuthenticationForm'

jest.mock('react-redux')

describe('organisms/AuthenticationForm', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when AuthType.SIGNIN', () => {
    test('should render the sign in text', () => {
      render(<AuthenticationForm authType={AuthType.SIGNIN} />)
      expect.stringContaining('Sign In')
      expect.not.stringContaining('Sign Up')
    })
  })

  describe('when AuthType.SIGNUP', () => {
    test('should render the sign up text', () => {
      render(<AuthenticationForm authType={AuthType.SIGNUP} />)
      expect.stringContaining('Sign Up')
      expect.not.stringContaining('Sign In')
    })
  })
})
