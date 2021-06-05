import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import RedarSmall from 'src/images/RedarSmall.svg'
import RedarBig from 'src/images/RedarBig.svg'
import RedarError from 'src/images/RedarError.svg'
import { ISource } from 'src/type'
import FollowButton from '../atoms/FollowButton'

type Props = {
  url: string
}

const PreviewResult: FC<Props> = ({ url }) => {
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

  const onClick = () => {
    // todo sourceをCreat
    // todo sourceをUnfollowする
  }
  return (
    <div className="search__result">
      {error && (
        <div className="search__error">
          <img className="search__init" src={RedarError} alt="redar_error" />
          <span>Sorry,there is no results match your search</span>
        </div>
      )}

      {!url && <img className="search__init" src={RedarBig} alt="redar_big" />}
      {preview && (
        <div>
          <span className="search__resultTitle">Matched sources</span>
          <div className="search__resultBox">
            <img className="search__redar" src={RedarSmall} alt="redar_small" />
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
      )}
    </div>
  )
}

export default PreviewResult
