import React, { FC } from 'react'
import IconSearch from 'src/images/IconSearch.svg'

type Props = {
  onClick(): void
}

const Search: FC<Props> = ({ onClick }) => (
  <div
    className="search__icon"
    onClick={onClick}
    onKeyDown={onClick}
    role="link"
    tabIndex={0}
  >
    <img src={IconSearch} alt="icon-search" />
  </div>
)

export default Search
