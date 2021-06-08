import React, { FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import RedarSmall from 'src/images/RedarSmall.svg'
import RedarError from 'src/images/RedarError.svg'
import { ISource, IPreview, IRss } from 'src/type'
import { createSource } from 'src/actions/createSourceActions'
import FollowButton from '../../components/atoms/FollowButton'

type Props = {
  url: string
  isSearched: boolean
}

const PreviewResult: FC<Props> = ({ url, isSearched }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const preview = useSelector(
    (state: { search: { preview: IPreview } }) => state.search.preview
  )
  const error = useSelector(
    (state: { search: { error: boolean } }) => state.search.error
  )
  const sources = useSelector(
    (state: { source: { sources: ISource[] } }) => state.source.sources
  )
  // sourceのフォロー状態
  const isFollowed = !!sources.find((s) => s.title === preview.title)
  const [follow, setFollow] = useState(isFollowed)
  // 検索判定
  const show = preview && isSearched && !error
  const onClick = () => {
    const rss: IRss = {
      url,
      title: preview.title,
    }
    if (isFollowed === false) {
      dispatch(createSource(rss))
      setFollow(!isFollowed)
      goFeed()
    } else {
      // 登録したsourceをunfollowする
      setFollow(!isFollowed)
    }
  }

  const goFeed = () => {
    const sourceId = sources.find((s) => s.title === preview.title)?.id
    history.push(`/sources/${sourceId}/feeds`)
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
              <span className="search__sourceTitle">{preview.title}</span>
              <span className="search__sourceUrl">{url}</span>
            </div>
            <div className="search__follow">
              <FollowButton
                className={
                  follow ? 'search__btnFollowing' : 'search__btnFollow'
                }
                buttonName={follow ? 'FOLLOWING' : 'FOLLOW'}
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
