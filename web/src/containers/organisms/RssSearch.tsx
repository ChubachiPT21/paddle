import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchForm from 'src/components/molecules/SearchForm'
import PreviewResult from 'src/components/molecules/PreviewResult'
import { fetchRss } from 'src/actions/previewActions'
import { IRss } from 'src/type'

const RssSearch: FC = () => {
  const dispatch = useDispatch()
  const preview = useSelector((state: { rss: IRss }) => state.rss)

  const onClick = (url: string) => {
    dispatch(fetchRss(url))
  }
  return (
    <div className="search">
      <div className="search__heading">
        <span>Add RSS sources </span>
      </div>
      <SearchForm onClick={onClick} />
      <PreviewResult preview={preview} />
    </div>
  )
}

export default RssSearch
