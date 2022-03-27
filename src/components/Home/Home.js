import React, { useState, useEffect } from 'react'
import { Col, Row, Typography, Button, Card, Divider, Input } from 'antd';
import { getRecommendedProfilesRequest, searchRequest } from '../../lens/Api'
import { shortenAddress } from '@usedapp/core'
import ProfileAvatar from '../Utilities/ProfileAvatar';
import { useNavigate } from "react-router-dom";
import Progress from '../Utilities/Progress';

const { Meta } = Card;

export default function Home() {
  const [ profiles, setProfiles ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const navigate = useNavigate();
  const [ search, setSearch ] = useState('')

  useEffect(async() => {
    try{
      const { data } = await getRecommendedProfilesRequest()
      setProfiles(data.recommendedProfiles)
      setLoading(false)
    }catch(error){
      console.log(error)
    }
  }, []);

  useEffect(async() => {
    try{
      let request = { query: search,  type: 'PROFILE' }
      const { data } = await searchRequest(request)
      setProfiles(data.search.items)
    }catch(error){
      console.log(error)
    }
  }, [search]);

  const { Search } = Input;

  return (
    <div className="site-card-wrapper">
      { loading ? <Progress active={loading} /> :
        <Row gutter={16}>
        <Col span={24}>
          <Search
            placeholder="Search Profiles"
            allowClear
            size="large"
            onChange={(e)=> setSearch(e.target.value)}
            style={{ marginBottom: '20px'}}
          />
        </Col>
        {
          profiles.map((p, index) => 
            <Col span={8}>
              <Card  bordered={true} hoverable={true} style={{marginBottom: '20px'}}>
                <Meta
                  avatar={ <ProfileAvatar profile={p} size={50} />}
                  title={ `@${p.handle}`}
                  description={ <Typography.Paragraph copyable={true}>{shortenAddress(p.ownedBy)}</Typography.Paragraph>  }
                />
                <Typography.Paragraph style={{minHeight: '45px'}} ellipsis={{ rows: 2, tooltip: true}}>{ p.bio ? p.bio : "Bio unavailable" }</Typography.Paragraph>
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span>{p.stats.totalFollowers} Followers</span>
                  <span>{p.stats.totalFollowing} Followings</span>
                  <Button type="primary" shape="round" size="default" onClick={() => navigate(`/profile/${p.handle}`)}>View</Button>
                </div>
              </Card>
            </Col>
          )
        }
      </Row>
      }
    </div>
  )
}
