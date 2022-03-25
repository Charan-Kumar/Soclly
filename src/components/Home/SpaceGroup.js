import React from 'react'
import { Card, Typography, Button, Divider } from 'antd';
import { UserOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';


export default function SpaceGroup({ index, spaceTitle, members, description, memberCount, setVisible, handleSetSpace }) {
  return (
    <Card title={spaceTitle} bordered={false} hoverable={true} style={{marginBottom: '20px'}}>
      { members }
      <Typography.Paragraph ellipsis={{
        rows: 2,
        tooltip: true
      }}>{ description }</Typography.Paragraph>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography.Text>{memberCount}</Typography.Text>
          <UserOutlined />
        </div>
        <Button type="primary" size="small" onClick={()=> handleSetSpace(index) }>View</Button>
      </div>
    </Card>
  )
}
