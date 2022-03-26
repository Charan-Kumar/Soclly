import React from 'react'
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function ProfileAvatar({profile}) {
  return (
    <div>
      { profile.picture ? 
        <Avatar size="large" src={<Image src={profile.picture.original.url} />} />
       :
        <Avatar size="large" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
       }
    </div>
  )
}
