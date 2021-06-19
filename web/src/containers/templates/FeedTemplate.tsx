import React, { FC } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import IconAll from 'src/images/All.svg'
import SourceList from 'src/containers/organisms/SourceList'
import { useHistory } from 'react-router'
import AddSource from 'src/components/atoms/AddSource'

const FeedTemplate: FC = ({ children }) => {
  const history = useHistory()
  return (
    <Row className="fullHeight">
      <Col md={4} lg={3} style={{ height: '100%' }}>
        <div className="sidebar">
          <div className="sidebar__title">
            <span>FEEDS</span>
            <AddSource onClick={() => history.push('/explore')} />
          </div>
          <div className="sidebar__body">
            <div className="allFeeds">
              <div className="allFeeds__title">
                <img src={IconAll} alt="icon-all" />
                <span>ALL FEEDS</span>
              </div>
            </div>
            <SourceList />
          </div>
        </div>
      </Col>
      <Col md={8} lg={9}>
        <Container>{children}</Container>
      </Col>
    </Row>
  )
}

export default FeedTemplate
