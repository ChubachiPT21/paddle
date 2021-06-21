import React from 'react'
import { render, screen } from '@testing-library/react'
import Search from 'src/components/atoms/Search'

describe('atoms/Search', () => {
  test('should render the component', () => {
    render(<Search onClick={jest.fn()} />)
    expect(screen.getByAltText('icon-search')).toBeInTheDocument()
  })
})
