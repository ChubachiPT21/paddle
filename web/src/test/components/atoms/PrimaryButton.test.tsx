import React from 'react'
import { render, screen } from '@testing-library/react'
import PrimaryButton from 'src/components/atoms/PrimaryButton'

describe('atoms/PrimartButton', () => {
  test('should render the component and show button name', () => {
    render(<PrimaryButton buttonName="testButtonName" onClick={jest.fn()} />)
    expect(screen.getByRole('button')).toHaveTextContent('testButtonName')
  })
})
