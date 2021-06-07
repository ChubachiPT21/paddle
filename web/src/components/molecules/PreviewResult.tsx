import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import RedarSmall from 'src/images/RedarSmall.svg'
import RedarError from 'src/images/RedarError.svg'
import { ISource } from 'src/type'
import { createSource } from 'src/actions/createSourceActions'
import FollowButton from '../atoms/FollowButton'

type Props = {
  url: string
  isSearched: boolean
}

const PreviewResult: FC<Props> = ({ url, isSearched }) => {
  const dispatch = useDispatch()
  const preview = useSelector(
    (state: { preview: { rss: string } }) => state.preview.rss
  )
  const error = useSelector(
    (state: { preview: { error: boolean } }) => state.preview.error
  )
  const sources = useSelector(
    (state: { source: { sources: ISource[] } }) => state.source.sources
  )
  const isFollow = !!sources.find((s) => s.title === preview)
  const show = preview && isSearched && !error
  const onClick = () => {
    if (!isFollow) dispatch(createSource(preview, url))
    // todo sourceをUnfollowする
  }
  return (
    <div className="search__result">
      {show ? (
        <div>
          <span className="search__resultTitle">Matched sources</span>
          <div className="search__resultBox">
            <img
              className="search__redarSmall"
              src={RedarSmall}
              alt="redar_small"
            />
            <div className="search__source">
              <span className="search__sourceTitle">{preview}</span>
              <span className="search__sourceUrl">{url}</span>
            </div>
            <div className="search__follow">
              <FollowButton
                className={
                  isFollow ? 'search__btnFollowing' : 'search__btnFollow'
                }
                buttonName={isFollow ? 'FOLLOWING' : 'FOLLOW'}
                onClick={onClick}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="search__init">
          <img
            className="search__redarBig"
            src={RedarError}
            alt="redar_error"
          />
          <span>Sorry,there is no results match your search</span>
        </div>
      )}
    </div>
  )
}

export default PreviewResult
