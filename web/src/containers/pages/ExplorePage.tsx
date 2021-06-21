import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderNavigation } from 'src/components/molecules/Header'
import { fetchSources } from 'src/actions/sourceActions'
import DefaultTemplate from 'src/containers/templates/DefaultTemplate'
import FeedTemplate from 'src/containers/templates/FeedTemplate'
import RssSearch from 'src/containers/organisms/RssSearch'
import { useHistory } from 'react-router'
import { getAuthentication } from 'src/actions/authenticationActions'
import { IUser } from 'src/type'

const ExplorePage: FC = () => {
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
      if (!user.token) dispatch(getAuthentication())
      dispatch(fetchSources())
    }
    asyncFunc()
  }, [])

  if (authenticationError) history.push('/signin')

  if (user.token) {
    return (
      <DefaultTemplate defaultNavigation={HeaderNavigation.explore}>
        <FeedTemplate>
          <RssSearch />
        </FeedTemplate>
      </DefaultTemplate>
    )
  }

  return <div />
}

export default ExplorePage
