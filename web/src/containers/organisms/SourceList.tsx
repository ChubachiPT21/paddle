import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SourceInList from 'src/components/molecules/SourceInList'
import { ISource } from 'src/type'
import { fetchFeeds } from 'src/actions/feedActions'

const SourceList: FC = () => {
  const dispatch = useDispatch()

  const sources = useSelector(
    (state: { source: { sources: ISource[] } }) => state.source.sources
  )
  const onClick = (sourceId: number) => {
    dispatch(fetchFeeds(sourceId))
  }
  useEffect(() => {
    const asyncFunc = () => {
      dispatch(fetchFeeds(1))
    }
    asyncFunc()
  }, [])

  return (
    <div className="sourceList">
      {sources.map((source) => (
        <SourceInList key={source.id} source={source} onClick={onClick} />
      ))}
    </div>
  )
}

export default SourceList
