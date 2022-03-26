import React from 'react'
import { Spin } from 'antd';

export default function Progress(props) {
  const { message, active } = props
  return (
    <div className={`loader-wrapper ${active ? 'is-active': '' }`}>
      <Spin size="large" />
      <span className="dark-inverted mt-5">{ message }</span>
    </div>
  )
}