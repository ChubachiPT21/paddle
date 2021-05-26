import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import FeedList from 'src/containers/organisms/FeedList'
import { HeaderNavigation } from 'src/components/molecules/Header'
import { fetchSources } from 'src/actions/sourceActions'
import DefaultTemplate from 'src/containers/templates/DefaultTemplate'
import FeedTemplate from 'src/containers/templates/FeedTemplate'
import { useParams } from 'react-router-dom'

const FeedsPage: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const asyncFunc = () => {
      dispatch(fetchSources())
    }
    asyncFunc()
  }, [])

  const { id } = useParams<Record<string, string>>()

  return (
    <DefaultTemplate defaultNavigation={HeaderNavigation.home}>
      <FeedTemplate>
        <FeedList sourceId={Number(id)} />
      </FeedTemplate>
    </DefaultTemplate>
  )
}

export default FeedsPage
