import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FeedList from 'src/containers/organisms/FeedList'
import NoSources from 'src/containers/organisms/NoSources'
import { HeaderNavigation } from 'src/components/molecules/Header'
import { fetchSources } from 'src/actions/sourceActions'
import { fetchFeeds } from 'src/actions/feedActions'
import DefaultTemplate from 'src/containers/templates/DefaultTemplate'
import FeedTemplate from 'src/containers/templates/FeedTemplate'
import { IFeed, ISource, IUser } from 'src/type'
import { getAuthentication } from 'src/actions/authenticationActions'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'

const FeedsPage: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(
    (state: { user: { user: IUser } }) => state.user.user
  )
  const sources = useSelector(
    (state: { source: { sources: ISource[] } }) => state.source.sources
  )
  const feeds = useSelector(
    (state: { feed: { feeds: IFeed[] } }) => state.feed.feeds
  )
  const authenticationError = useSelector(
    (state: { user: { error: boolean } }) => state.user.error
  )
  const { id } = useParams<Record<string, string>>()

  useEffect(() => {
    const asyncFunc = () => {
      if (!user.token) dispatch(getAuthentication())
      dispatch(fetchSources())
    }
    asyncFunc()
  }, [])

  useEffect(() => {
    if (sources && sources.length > 0) {
      if (!id) {
        dispatch(fetchFeeds(Number(sources[0].id)))
        history.replace(`/sources/${sources[0].id}/feeds`)
      } else {
        dispatch(fetchFeeds(Number(id)))
      }
    }
  }, [sources && sources.length > 0])

  if (authenticationError) history.push('/signin')

  if (user.token) {
    return (
      <DefaultTemplate defaultNavigation={HeaderNavigation.home}>
        <FeedTemplate>
          {feeds.length > 0 && <FeedList sourceId={Number(id)} />}
          {feeds.length === 0 && <NoSources />}
        </FeedTemplate>
      </DefaultTemplate>
    )
  }

  return <div />
}

export default FeedsPage
