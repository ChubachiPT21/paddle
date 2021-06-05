import React, { FC, useState, ChangeEvent, KeyboardEvent } from 'react'
import Input from 'src/components/atoms/Input'
import Search from 'src/components/atoms/Search'
import PreviewResult from 'src/components/molecules/PreviewResult'
import RedarBig from 'src/images/RedarBig.svg'

type Props = {
  onClick(url: string): void
}

const SearchForm: FC<Props> = ({ onClick }) => {
  const [url, setUrl] = useState('')
  const [isSearched, setIsSearched] = useState(false)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onClick(url)
      setIsSearched(true)
    }
  }
  return (
    <div>
      <form className="search__form">
        <Input
          className="search__input"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search RSS link"
        />
        <div>
          <Search
            onClick={() => {
              onClick(url)
              setIsSearched(true)
            }}
          />
        </div>
      </form>
      {isSearched ? (
        <PreviewResult url={url} isSearched={isSearched} />
      ) : (
        <div className="search__init">
          <img className="search__redarBig" src={RedarBig} alt="redar_big" />
        </div>
      )}
    </div>
  )
}

export default SearchForm
