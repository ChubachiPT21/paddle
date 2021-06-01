import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SourceInList from 'src/components/molecules/SourceInList'
import { ISource } from 'src/type'
import { fetchFeeds } from 'src/actions/feedActions'
import { useHistory } from 'react-router'

const SourceList: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const sources = useSelector(
    (state: { source: { sources: ISource[] } }) => state.source.sources
  )

  const onClick = (sourceId: number) => {
    dispatch(fetchFeeds(sourceId))
    history.push(`/sources/${sourceId}/feeds`)
  }
  return (
    <div className="sourceList">
      {sources.map((source) => (
        <SourceInList key={source.id} source={source} onClick={onClick} />
      ))}
    </div>
  )
}

export default SourceList
