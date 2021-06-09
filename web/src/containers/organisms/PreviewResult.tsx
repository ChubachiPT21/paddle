import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import RedarSmall from 'src/images/RedarSmall.svg'
import RedarError from 'src/images/RedarError.svg'
import { ISource, IPreview, IRss } from 'src/type'
import { createSource } from 'src/actions/sourceActions'
import FollowButton from 'src/components/atoms/FollowButton'

type Props = {
  url: string
}

const PreviewResult: FC<Props> = ({ url }) => {
  const history = useHistory()
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
  const isFollowing = () =>
    sources && !!sources.find((s) => s.title === preview.title)

  // 検索判定
  const hasResult = preview && !error
  const onClick = async () => {
    const rss: IRss = {
      url,
      title: preview.title,
    }

    if (!isFollowing()) {
      const sourceId = await createSource(rss)
      history.push(`/sources/${sourceId}/feeds`)
    } else {
      // TODO: Unfollow action
    }
  }

  return (
    <div className="search__result">
      {hasResult ? (
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
              <FollowButton isFollowing={isFollowing()} onClick={onClick} />
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
