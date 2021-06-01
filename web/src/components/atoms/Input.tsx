import React, { FC } from 'react'

type Props = {
  className: string
  type: string
  placeholder: string
  onChange(value: any): void
  title?: string
}

const Input: FC<Props> = ({
  className,
  type,
  placeholder,
  onChange,
  title,
}) => {
  return (
    <div>
      <div>
        <span className="input-subTitle ">{title}</span>
      </div>
      <input
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        type={type}
      />
    </div>
  )
}
export default Input
