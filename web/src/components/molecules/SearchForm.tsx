import React, { FC, useState, ChangeEvent } from 'react'
import Input from 'src/components/atoms/Input'
import Search from 'src/components/atoms/Search'
import PreviewResult from 'src/components/molecules/PreviewResult'

type Props = {
  onClick(url: string): void
}

const SearchForm: FC<Props> = ({ onClick }) => {
  const [url, setUrl] = useState('')
  return (
    <div>
      <form className="search__form">
        <Input
          className="search__input"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
          type="text"
          placeholder="Search RSS link"
        />
        <div>
          <Search onClick={() => onClick(url)} />
        </div>
      </form>
      <PreviewResult url={url} />
    </div>
  )
}

export default SearchForm
