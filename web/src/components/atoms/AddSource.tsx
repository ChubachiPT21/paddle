import React, { FC } from 'react'
import IconAddSource from 'src/images/AddSource.svg'

type Props = {
  onClick(): void
}

const AddSource: FC<Props> = ({ onClick }) => (
  <div onClick={onClick} onKeyDown={onClick} role="link" tabIndex={0}>
    <img src={IconAddSource} alt="icon-add-source" />
  </div>
)

export default AddSource
