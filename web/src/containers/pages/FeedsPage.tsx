import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FeedList from 'src/containers/organisms/FeedList'
import { HeaderNavigation } from 'src/components/molecules/Header'
import { fetchSources } from 'src/actions/sourceActions'
import DefaultTemplate from 'src/containers/templates/DefaultTemplate'
import FeedTemplate from 'src/containers/templates/FeedTemplate'
import { IUser } from 'src/type'
import { getAuthentication } from 'src/actions/authenticationActions'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'

const FeedsPage: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(
    (state: { user: { user: IUser } }) => state.user.user
  )
  const authenticationError = useSelector(
    (state: { user: { error: boolean } }) => state.user.error
  )

  useEffect(() => {
    const asyncFunc = () => {
      dispatch(fetchSources())
      if (!user.token) dispatch(getAuthentication())
    }
    asyncFunc()
  }, [])

  const { id } = useParams<Record<string, string>>()

  if (authenticationError) history.push('/signin')

  if (user.token) {
    return (
      <DefaultTemplate defaultNavigation={HeaderNavigation.home}>
        <FeedTemplate>
          <FeedList sourceId={Number(id)} />
        </FeedTemplate>
      </DefaultTemplate>
    )
  }

  return <div />
}

export default FeedsPage
