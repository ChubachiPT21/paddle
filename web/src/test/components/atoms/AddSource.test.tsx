import React from 'react'
import { render, screen } from '@testing-library/react'
import AddSource from 'src/components/atoms/AddSource'

describe('atoms/AddSource', () => {
  test('should render the component', () => {
    render(<AddSource onClick={jest.fn()} />)
    expect(screen.getByAltText('icon-add-source')).toBeInTheDocument()
  })
})
