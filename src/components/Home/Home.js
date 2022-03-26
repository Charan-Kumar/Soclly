import React, { useState, useEffect } from 'react'
import { Col, Row, Typography, Button, Card } from 'antd';
import { getRecommendedProfilesRequest } from '../../lens/Api'
import { shortenAddress } from '@usedapp/core'
import ProfileAvatar from '../Utilities/ProfileAvatar';

const { Meta } = Card;

export default function Home() {
  const [ profiles, setProfiles ] = useState([])
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
                  avatar={ <ProfileAvatar profile={p} />}
                  title={p.handle}
                  description={ <Typography.Paragraph copyable={true}>{shortenAddress(p.ownedBy)}</Typography.Paragraph>  }
                />
                <Typography.Paragraph style={{minHeight: '50px'}} ellipsis={{ rows: 2, tooltip: true}}>{ p.bio ? p.bio : "Bio unavailable" }</Typography.Paragraph>
                <Button type="primary" shape="round" size="default">Follow</Button>
              </Card>
            </Col>
          )
        }
      </Row>
    </div>
  )
}
