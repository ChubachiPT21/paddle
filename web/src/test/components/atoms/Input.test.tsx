import React from 'react'
import { render, screen } from '@testing-library/react'
import Input from 'src/components/atoms/Input'

const props = {
  className: 'testClassName',
  type: 'text',
  placeholder: 'testPlaceholder',
  onChange: jest.fn(),
  onKeyDown: jest.fn(),
  title: 'testTitle',
}
describe('atoms/Input', () => {
  test('should render the component and only have input element', () => {
    render(
      <Input
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        onChange={jest.fn()}
      />
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.queryByText(`${props.title}`)).toBeNull()
  })

  test('should render the component and have input,span element', () => {
    render(
      <Input
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        onChange={jest.fn()}
        onKeyDown={jest.fn()}
        title={props.title}
      />
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText(`${props.title}`)).toBeInTheDocument()
  })
})
