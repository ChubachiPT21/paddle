import React from 'react'
import { render, screen } from '@testing-library/react'
import SourceHeading from 'src/components/atoms/SourceHeading'
import { ISource } from 'src/type'

const source: ISource = {
  id: 1,
  title: 'test title',
  count: 1,
}
describe('atoms/SourceHeading', () => {
  test('should render the component', () => {
    render(<SourceHeading source={source} />)
    expect(screen.getByText(`${source.title}`)).toBeInTheDocument()
  })
})
