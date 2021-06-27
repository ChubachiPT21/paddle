import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NoSources from 'src/containers/organisms/NoSources'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom';

const history = createMemoryHistory();
describe('organisms/NoSources', () => {
  
  test('should render component', () => {
    render(<NoSources />)
    expect(screen.getByAltText('icon-no-sources')).toBeInTheDocument()
    expect.stringContaining('Add RSS sources')
  })

  test('redirect to correct URL on click button', async () => {
    render(
      <Router history={history}>
        <NoSources />
      </Router>
    );
    fireEvent.click(screen.getByRole('button'))
    expect(history.location.pathname).toBe('/explore')
  })
  
})
