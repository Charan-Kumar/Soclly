import React from 'react'
import { Spin } from 'antd';

export default function Loader() {
  return (
    <div className="loader-wrapper">
      <Spin />
    </div>
  )
}
