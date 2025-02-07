import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import SourceInList from 'src/components/molecules/SourceInList'
import { ISource } from 'src/type'

const source: ISource = {
  id: 1,
  title: 'test title',
  count: 5,
}

describe('molecules/SourceInList', () => {
  test('should fire click and events', () => {
    const onClick = jest.fn()
    render(<SourceInList source={source} onClick={onClick} />)

    expect(screen.getByRole('link')).toHaveClass('source pointer')
    expect(screen.getByText(`${source.title}`)).toBeInTheDocument()
    expect(screen.getByText(`${source.count}`)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link'))
    expect(onClick).toBeCalledTimes(1)
    fireEvent.keyDown(screen.getByRole('link'), { key: 'Enter', code: 'Enter' })
    expect(onClick).toBeCalledTimes(2)
  })
})
