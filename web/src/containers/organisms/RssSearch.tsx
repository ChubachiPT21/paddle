import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import SearchForm from 'src/containers/organisms/SearchForm'
import { fetchRss } from 'src/actions/previewActions'

const RssSearch: FC = () => {
  const dispatch = useDispatch()

  const onClick = (url: string) => {
    dispatch(fetchRss(url))
  }
  return (
    <div className="search">
      <div className="search__heading">
        <span>Add RSS sources </span>
      </div>
      <SearchForm onClick={onClick} />
    </div>
  )
}

export default RssSearch
