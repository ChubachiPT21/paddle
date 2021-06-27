import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ISource, IFeed } from 'src/type'
import Feed from 'src/containers/organisms/Feed'

const source: ISource = {
  id: 1,
  title: 'test title',
  count: 5,
}

const feed: IFeed = {
  id: 1,
  title: 'feed titel',
  sourceId: 1,
  url: 'www.google.com',
  contents: 'here is contents',
  imageUrl: 'https:www.test.jpg',
}

describe('organisms/Feed', () => {
  test('shoule fire click and events', () => {
    window.open = jest.fn()
    render(<Feed source={source} feed={feed} hasVisited />)
    expect(screen.getByRole('link')).toHaveClass('feed')
    expect(screen.getByAltText('eyecatch')).toBeInTheDocument()
    expect(screen.getByText(`${feed.title}`)).toBeInTheDocument()
    expect(screen.getByText(`${source.title}`)).toBeInTheDocument()
    expect(screen.getByText(`${feed.contents}`)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('link'))
    expect(window.open).toBeCalledTimes(1)
  })
})
