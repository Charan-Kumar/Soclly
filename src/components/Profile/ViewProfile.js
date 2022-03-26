import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Tabs, Divider, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { getProfilesRequest} from '../../lens/Api'
import Progress from '../Utilities/Progress';
import ProfileAvatar from '../Utilities/ProfileAvatar';
import WalletAddress from '../Utilities/WalletAddress';
export default function ViewProfile() {

  const [ profile, setProfile] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const params = useParams()
  const { TabPane } = Tabs;

  React.useEffect(async() => {
    try{
      const { data } = await getProfilesRequest({ handles: [ params.handle ] })
      if( data.profiles.items.length === 1 ){
        setProfile(data.profiles.items[0])
        setLoading(false)
      }
    }catch(error){
      console.log(error)
    }
  }, [params.address]);

  return (
    <Card hoverable={true}>
      { loading ? <Progress active={loading} /> : 
        <div class="profile-wrapper">
          <div class="profile-header has-text-centered">
            <div class="h-avatar is-xl">
              <ProfileAvatar profile={profile} size={100} />
            </div>
            <h3 class="title is-4 is-narrow is-thin">{ profile.name ? profile.name : "Unknown Name" }</h3>
            <p class="title is-4 is-narrow is-thin">{ profile.handle }</p>
            <p class="light-text">{ profile.bio ? profile.bio : "Bio Unavailable" }</p>
            <WalletAddress address={profile.ownedBy} displayCenter={true} />
            <div class="profile-stats">
              <div class="profile-stat">
                <i class="lnil lnil-users-alt"></i>
                <span>{ profile.stats.totalFollowers } Followers</span>
              </div>
              <div class="separator"></div>
              <div class="profile-stat">
                <i class="lnil lnil-checkmark-circle"></i>
                <span>{ profile.stats.totalFollowing } Following</span>
              </div>
              <div class="separator"></div>
              <div class="profile-stat">
                <i class="lnil lnil-checkmark-circle"></i>
                <span>{ profile.stats.totalPosts } Posts</span>
              </div>
              <div class="separator"></div>
              <div class="profile-stat">
                <i class="lnil lnil-checkmark-circle"></i>
                <span>{ profile.stats.totalPublications } Publications</span>
              </div>
              <div class="separator"></div>
              <div class="profile-stat">
                <i class="lnil lnil-checkmark-circle"></i>
                <span>{ profile.stats.totalCollects } Collects</span>
              </div>
            </div>
            <Button type="primary" shape="round" size="large">Follow</Button>

            <Divider />
          </div>
          <Tabs defaultActiveKey="1" style={{ height: '40vh'}}>
            <TabPane tab="Followers" key="1">
              Content of Followers
            </TabPane>
            <TabPane tab="Following" key="2">
              Content of Following
            </TabPane>
            <TabPane tab="Posts" key="3">
              Content of Posts
            </TabPane>
            <TabPane tab="Publications" key="4">
              Content of Publications
            </TabPane>
            <TabPane tab="Collects" key="5">
              Content of Collects
            </TabPane>
            </Tabs>
        </div>
      }
  </Card>
  )
}

