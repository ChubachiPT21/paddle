import React, { FC } from 'react'
import { ISource } from 'src/type'

type Props = {
  source?: ISource
}
const SourceHeading: FC<Props> = ({ source }) => {
  return (
    <div className="feedList__title">
      <span>{source && source.title}</span>
    </div>
  )
}
export default SourceHeading
