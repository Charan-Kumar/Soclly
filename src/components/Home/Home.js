import React, { useState, useEffect } from 'react'
import { Col, Row, Typography, Button, Card } from 'antd';
import { getRecommendedProfilesRequest } from '../../lens/Api'
import { shortenAddress } from '@usedapp/core'
import ProfileAvatar from '../Utilities/ProfileAvatar';
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export default function Home() {
  const [ profiles, setProfiles ] = useState([])
  const navigate = useNavigate();
  useEffect(async() => {
    try{
      const { data } = await getRecommendedProfilesRequest()
      setProfiles(data.recommendedProfiles)
    }catch(error){
      console.log(error)
    }
  }, []);


  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        {
          profiles.map((p, index) => 
            <Col span={8}>
              <Card  bordered={true} hoverable={true} style={{marginBottom: '20px'}}>
                <Meta
                  avatar={ <ProfileAvatar profile={p} size={60} />}
                  title={p.handle}
                  description={ <Typography.Paragraph copyable={true}>{shortenAddress(p.ownedBy)}</Typography.Paragraph>  }
                />
                <Typography.Paragraph style={{minHeight: '45px'}} ellipsis={{ rows: 2, tooltip: true}}>{ p.bio ? p.bio : "Bio unavailable" }</Typography.Paragraph>
                <Button type="primary" shape="round" size="default" onClick={() => navigate(`/profile/${p.handle}`)}>View</Button>
              </Card>
            </Col>
          )
        }
      </Row>
    </div>
  )
}
