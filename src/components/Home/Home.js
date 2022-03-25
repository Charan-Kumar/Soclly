import React, { useState } from 'react'
import { Col, Row, Avatar, Drawer, Typography, Badge, Button, Space } from 'antd';
import SpaceGroup from './SpaceGroup';
import { AntDesignOutlined } from '@ant-design/icons';

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [space, setSpace] = useState(null);

  const MembersGroup = () => {
    return (
      <Avatar.Group>
        {
          [1,2,3,4,5,6,7].map((num, index) => (<Avatar key={index} size="large" src={`https://randomuser.me/api/portraits/men/${num}.jpg`} /> ))
        }
      </Avatar.Group> 
    )
  }

  const desc ="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"

  const spaces = [ {spaceTitle: "Amazing Devs", description: desc, members: <MembersGroup />, memberCount: 10 },
                   {spaceTitle: "Crypto Warriors", description: desc, members: <MembersGroup />, memberCount: 52 }, 
                   {spaceTitle: "Web3 Devs", description: desc, members: <MembersGroup />, memberCount: 34 },
                   {spaceTitle: "World War III", description: desc, members: <MembersGroup />, memberCount: 45 } ,
                   {spaceTitle: "Save Ukraine", description: desc, members: <MembersGroup />, memberCount: 23 },
                   {spaceTitle: "Lens Hackaton", description: desc, members: <MembersGroup />, memberCount: 57 } ,
                   {spaceTitle: "Dapp Development", description: desc, members: <MembersGroup />, memberCount: 82 },
                   {spaceTitle: "Bitcon", description: desc, members: <MembersGroup />, memberCount: 22 } ,
                   {spaceTitle: "Polygon Matic", description: desc, members: <MembersGroup />, memberCount: 10 },
                   {spaceTitle: "Crypto Taxes in India", description: desc, members: <MembersGroup />, memberCount: 30 } ]

  const handleSetSpace = (index) => {
    debugger;
    const space =  spaces[index]
    setSpace(space)
    setVisible(true)
  }

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        {
          spaces.map((s, index) => 
            <Col span={8}>
              <SpaceGroup key={index} index={index} spaceTitle={s.spaceTitle} description={s.description} memberCount={s.memberCount} members={s.members} setVisible={setVisible} handleSetSpace={handleSetSpace} />
            </Col>
          )
        }
      </Row>
      <Drawer title={ space && space.spaceTitle } placement="right" onClose={() => setVisible(false)} visible={visible} extra={
            <Space>
              <Button type="primary" shape="round" size="large">
                Join
              </Button>
          </Space>
          } >
        <Typography.Paragraph>{ space && space.description }</Typography.Paragraph>
        <Row gutter={16}>
        {
           [1,2,3,4,5,6,7].map((num, index) => (
            <Col span={8} style={{marginBottom: '20px'}}>
              <Badge dot>
                <Avatar size={64} src={`https://randomuser.me/api/portraits/men/${num}.jpg`}/>
              </Badge>
            </Col>
           ))
        }
        
      </Row>
      </Drawer>
    </div>
  )
}
