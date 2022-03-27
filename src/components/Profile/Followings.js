import React, { useState } from 'react'
import { shortenAddress } from '@usedapp/core';
import ProfileAvatar from '../Utilities/ProfileAvatar';
import { useNavigate } from 'react-router-dom'
import { List } from 'antd';
import { getFollowingRequest } from '../../lens/Api'

export default function Followings({ownedBy}) {
  const [ followings, setFollowings] = useState([])
  const navigate = useNavigate();
  React.useEffect(async() => {
    try{
      const { data } = await getFollowingRequest(ownedBy)
      setFollowings(data.following.items)
    }catch(error){
      console.log(error)
    }
  }, []);

  return (
    <List
      column={8}
      itemLayout="horizontal"
      dataSource={followings}
      renderItem={item => (
        <List.Item  onClick={() => { 
          if(item.wallet.defaultProfile)
              navigate(`/profile/${item.profile.handle}`)
              window.location.reload()
          }}>
          <List.Item.Meta style={{flex: 'none'}}
            avatar={<ProfileAvatar profile={item.profile} size={50} />}
            description={ shortenAddress(item.profile.ownedBy) }
            title={item.profile ? item.profile.handle : "" }
          />
        </List.Item>
      )}
    />
  )
}
