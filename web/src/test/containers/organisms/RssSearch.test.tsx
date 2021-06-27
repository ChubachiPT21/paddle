import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import RssSearch from 'src/containers/organisms/RssSearch'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}))

describe('organisms/RssSearch', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should have textContent', () => {
    render(<RssSearch />)
    expect(screen.getByText('Add RSS sources')).toBeInTheDocument()
  })

  test('test click search button ', () => {
    const { getByRole } = render(<RssSearch />)
    fireEvent.click(getByRole('link'))
    expect(mockDispatch).toBeCalledTimes(1)
  })
})
