import React, { useState } from 'react'
import { List } from 'antd';
import { shortenAddress } from '@usedapp/core';
import ProfileAvatar from '../Utilities/ProfileAvatar';
import { useNavigate } from 'react-router-dom'
import { getFollowerRequest } from '../../lens/Api'


export default function Followers({profileId}) {
  const [ followers, setFollowers] = useState([]);
  const navigate = useNavigate();
  React.useEffect(async() => {
    try{
      const { data } = await getFollowerRequest(profileId)
      setFollowers(data.followers.items)
    }catch(error){
      console.log(error)
    }
  }, []);

  return (
    <List
      column={8}
      itemLayout="horizontal"
      dataSource={followers}
      renderItem={item => (
        <List.Item  onClick={() => { 
          if(item.wallet.defaultProfile)
              navigate(`/profile/${item.wallet.defaultProfile.handle}`)
              window.location.reload()
          }}>
          <List.Item.Meta style={{flex: 'none'}}
            avatar={<ProfileAvatar profile={item.wallet.defaultProfile} size={50} />}
            description={ shortenAddress(item.wallet.address) }
            title={item.wallet.defaultProfile ? item.wallet.defaultProfile.handle : "" }
          />
        </List.Item>
      )}
    />
  )
}
