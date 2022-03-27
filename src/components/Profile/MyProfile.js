import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Tabs, Divider, Button, message, List } from 'antd';
import { getProfilesRequest, follow , unfollow, getFollowerRequest, doesFollowRequest } from '../../lens/Api'
import Progress from '../Utilities/Progress';
import ProfileAvatar from '../Utilities/ProfileAvatar';
import WalletAddress from '../Utilities/WalletAddress';
import { shortenAddress } from '@usedapp/core';
import Followers from './Followers'
import Followings from './Followings'


export default function MyProfile() {

  const [ profile, setProfile] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const { TabPane } = Tabs;
  const style={ height: '40vh', overflow: 'scroll'}
  const navigate = useNavigate();

  React.useEffect(async() => {
    try{
      const { data } = await getProfilesRequest({ ownedBy: localStorage.getItem('wallet') })
      if( data.profiles.items.length === 1 ){
        let profile = data.profiles.items[0]
        setProfile(profile)
        setLoading(false)
      }
    }catch(error){
      console.log(error)
    }
  }, []);

  return (
    <Card hoverable={true}>
      { loading ? <Progress active={loading} /> : 
        <div className="profile-wrapper">
          <div className="profile-header has-text-centered">
            <div className="h-avatar is-xl">
              <ProfileAvatar profile={profile} size={100} />
            </div>
            <h3 className="title is-4 is-narrow is-thin">{ profile.name ? profile.name : "Unknown Name" }</h3>
            <p className="title is-narrow is-thin">@{ profile.handle }</p>
            <p className="light-text">{ profile.bio ? profile.bio : "Bio Unavailable" }</p>
            <WalletAddress address={profile.ownedBy} displayCenter={true} />
            <div className="profile-stats">
              <div className="profile-stat">
                <i className="lnil lnil-users-alt"></i>
                <span>{ profile.stats.totalFollowers } Followers</span>
              </div>
              <div className="separator"></div>
              <div className="profile-stat">
                <i className="lnil lnil-checkmark-circle"></i>
                <span>{ profile.stats.totalFollowing } Following</span>
              </div>
              <div className="separator"></div>
              <div className="profile-stat">
                <i className="lnil lnil-checkmark-circle"></i>
                <span>{ profile.stats.totalPosts } Posts</span>
              </div>
              <div className="separator"></div>
              <div className="profile-stat">
                <i className="lnil lnil-checkmark-circle"></i>
                <span>{ profile.stats.totalPublications } Publications</span>
              </div>
              <div className="separator"></div>
              <div className="profile-stat">
                <i className="lnil lnil-checkmark-circle"></i>
                <span>{ profile.stats.totalCollects } Collects</span>
              </div>
            </div>
              <Button type="primary" shape="round" size="large" onClick={() => navigate('/stream')}>Stream</Button>
            <Divider />
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Followers" key="1" style={style}>
              <Followers profileId={localStorage.getItem('profile_id')} />
            </TabPane>
            <TabPane tab="Following" key="2"  style={style}>
              <Followings ownedBy={localStorage.getItem('wallet')} />
            </TabPane>
            <TabPane tab="NFT's" key="5"  style={style}>
              Content of NFT's
            </TabPane>
            </Tabs>
        </div>
      }
  </Card>
  )
}

