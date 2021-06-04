import React, { FC } from 'react'
import RedarSmall from 'src/images/RedarSmall.svg'
import RedarBig from 'src/images/RedarBig.svg'
import { IRss } from 'src/type'
import FollowButton from '../atoms/FollowButton'

type Props = {
  preview: IRss
}

const PreviewResult: FC<Props> = ({ preview }) => {
  // todo rssが登録されたか判断
  const isFollow = false
  const onClick = () => {
    // todo sourceをCreat
    // todo sourceをUnfollowする
  }
  return (
    <div className="search__result">
      {preview ? (
        <div>
          <span className="search__resultTitle">Matched sources</span>
          <div className="search__resultBox">
            <img className="search__redar" src={RedarSmall} alt="redar_small" />
            <div className="search__source">
              <span className="search__sourceTitle">{preview.title}</span>
              <span className="search__sourceUrl">{preview.url}</span>
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
        <img className="search__init" src={RedarBig} alt="redar_big" />
      )}
    </div>
  )
}

export default PreviewResult
