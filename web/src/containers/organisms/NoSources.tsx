import React, { FC, useEffect } from 'react'
import { useHistory } from 'react-router'
import IconNoSources from 'src/images/NoSources.svg'
import PrimaryButton from 'src/components/atoms/PrimaryButton'

const NoSources: FC = () => {
  const history = useHistory()

  return (
    <div className="noContents">
      <div className="noContents__eyecatch">
        <img src={IconNoSources} alt="icon-no-sources" />
      </div>
      <div className="noContents__action">
        <PrimaryButton
          buttonName="Add RSS sources"
          onClick={() => history.push('/explore')}
        />
      </div>
    </div>
  )
}

export default NoSources
