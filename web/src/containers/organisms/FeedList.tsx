import React, { FC } from 'react'
import { IFeed, ISource } from 'src/type'
import Feed from 'src/containers/organisms/Feed'
import { useSelector } from 'react-redux'
import SourceHeading from 'src/components/atoms/SourceHeading'

const FeedList: FC = () => {
  const sources = useSelector(
    (state: { source: { sources: ISource[] } }) => state.source.sources
  )
  const feeds = useSelector(
    (state: { feed: { feeds: IFeed[] } }) => state.feed.feeds
  )
  const uniqueSourceId = Array.from(new Set(feeds.map((feed) => feed.sourceId)))
  const source = sources.find((s) => s.id === uniqueSourceId[0])
  return (
    <div className="feedList">
      <SourceHeading source={source} />
      {sources && (
        <div className="feedList__body">
          {feeds.map((feed, i) => (
            <Feed
              key={feed.id}
              source={source}
              feed={feed}
              hasVisited={i !== 0}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FeedList
