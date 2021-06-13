import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { HeaderNavigation } from 'src/components/molecules/Header'
import { fetchSources } from 'src/actions/sourceActions'
import DefaultTemplate from 'src/containers/templates/DefaultTemplate'
import FeedTemplate from 'src/containers/templates/FeedTemplate'
import RssSearch from 'src/containers/organisms/RssSearch'

const ExplorePage: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const asyncFunc = () => {
      dispatch(fetchSources())
    }
    asyncFunc()
  }, [])

  return (
    <DefaultTemplate defaultNavigation={HeaderNavigation.explore}>
      <FeedTemplate>
        <RssSearch />
      </FeedTemplate>
    </DefaultTemplate>
  )
}

export default ExplorePage
