import React from 'react'
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function ProfileAvatar({profile, size}) {
  return (
    <div>
      { profile && profile.picture ? 
        <Avatar size={size} src={<Image src={profile.picture.original.url}  />} />
       :
        <Avatar size={size} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
       }
    </div>
  )
}
