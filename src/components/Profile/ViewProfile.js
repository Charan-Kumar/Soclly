import React, { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Card, Tabs, Divider, Button, message, List } from 'antd';
import { getProfilesRequest, follow , unfollow, getFollowerRequest, doesFollowRequest } from '../../lens/Api'
import Progress from '../Utilities/Progress';
import ProfileAvatar from '../Utilities/ProfileAvatar';
import WalletAddress from '../Utilities/WalletAddress';
import { shortenAddress } from '@usedapp/core';
export default function ViewProfile() {

  const [ profile, setProfile] = useState(null)
  const [ followers, setFollowers] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ doesFollow, setDoesFollow] = useState(false)
  const params = useParams()
  const { TabPane } = Tabs;
  const style={ height: '40vh', overflow: 'scroll'}
  const navigate = useNavigate();

  React.useEffect(async() => {
    try{
      const { data } = await getProfilesRequest({ handles: [ params.handle ] })
      if( data.profiles.items.length === 1 ){
        let profile = data.profiles.items[0]
        setProfile(profile)
        setLoading(false)

        const followers = await getFollowerRequest(profile.id)
        setFollowers(followers.data.followers.items)

        let request = {
          followerAddress: localStorage.getItem('wallet'),
          profileId: localStorage.getItem('profile_id'),
        }

        const follow = await doesFollowRequest(request)
        setDoesFollow(follow.data.doesFollow[0].follows)
      }
    }catch(error){
      console.log(error)
    }
  }, [params.address, doesFollow ]);


  const handleFollow = async () => {
  
    try{
      let followRequest = [{
        profile: profile.id,
        followModule: null
      }]
      setLoading(true)
      await follow(followRequest)
      setLoading(false)
      setDoesFollow(true)
      message.success(`Your are following ${profile.handle} sucessfully.`);
      
    }catch(error){
      console.log(error)
    }
  }

  const handleUnFollow= async() => {
    try{
      let followRequest = [{
        profile: profile.id,
        followModule: null
      }]
      setLoading(true)
      await unfollow( profile.id)
      setDoesFollow(false)
      setLoading(false)
      message.success(`Your are unfollowing ${profile.handle} sucessfully.`);
    }catch(error){
      console.log(error)
    }
  }

  return (
    <Card hoverable={true}>
      { loading ? <Progress active={loading} /> : 
        <div className="profile-wrapper">
          <div className="profile-header has-text-centered">
            <div className="h-avatar is-xl">
              <ProfileAvatar profile={profile} size={100} />
            </div>
            <h3 className="title is-4 is-narrow is-thin">{ profile.name ? profile.name : "Unknown Name" }</h3>
            <p className="title is-4 is-narrow is-thin">{ profile.handle }</p>
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
            { doesFollow ? 
              <Button type="primary" shape="round" size="large" onClick={() => handleUnFollow()}>UnFollow</Button>
              :
              <Button type="primary" shape="round" size="large" onClick={() => handleFollow()}>Follow</Button>
            }
            <Divider />
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Followers" key="1" style={style}>
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
                      avatar={<ProfileAvatar profile={item.wallet.defaultProfile} size={60} />}
                      description={ shortenAddress(item.wallet.address) }
                      title={item.wallet.defaultProfile ? item.wallet.defaultProfile.handle : "" }
                    />
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab="Following" key="2"  style={style}>
              Content of Following
            </TabPane>
            <TabPane tab="Posts" key="3"  style={style}>
              Content of Posts
            </TabPane>
            <TabPane tab="Publications" key="4"  style={style}>
              Content of Publications
            </TabPane>
            <TabPane tab="Collects" key="5"  style={style}>
              Content of Collects
            </TabPane>
            </Tabs>
        </div>
      }
  </Card>
  )
}

