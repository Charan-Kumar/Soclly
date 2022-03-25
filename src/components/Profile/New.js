import React from 'react'
import { Form, Input, Button, Card } from 'antd';
import { createProfile } from '../../lens/Api'
import { useNavigate } from "react-router-dom";

export default function New() {
  const [profile, setProfile] = React.useState({
    handle: "",
    name: "",
    pictureUrl: "",
    nftUrl: "",
    bio: "",
    twitterUrl: ""
  })
  const navigate = useNavigate();


  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };


  const onFinish = () => {
    let createProfileRequest = { 
      handle: profile.handle,
      profilePictureUri: ! profile.pictureUrl ? null : profile.pictureUrl, 
      followNFTURI: ! profile.nftUrl ? null : profile.nftUrl,  
    }

    const {data} = createProfile(createProfileRequest)
    navigate('/home')

  };
  
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
      url: '${label} is not a valid url!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <Card title="Create Profile">
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['user', 'handle']} label="User Handle" rules={[{ required: true }]}>
          <Input value={profile.handle} onChange={(event) => setProfile({...profile, handle: event.target.value})}/>
        </Form.Item>
        <Form.Item name={['user', 'name']} label="Name" rules={[]}>
          <Input value={profile.name} onChange={(event) => setProfile({...profile, name: event.target.value})} />
        </Form.Item>
        <Form.Item name={['user', 'bio']} label="Bio">
          <Input.TextArea value={profile.bio} onChange={(event) => setProfile({...profile, bio: event.target.value})}  />
        </Form.Item>
        <Form.Item name={['user', 'pictureUrl']} label="Profile Picture URI"  rules={[{ type: 'url' }]}>
          <Input value={profile.pictureUrl} onChange={(event) => setProfile({...profile, pictureUrl: event.target.value})}  />
        </Form.Item>
        <Form.Item name={['user', 'nftUrl']} label="Follow NFT URI"  rules={[{ type: 'url' }]}>
          <Input value={profile.pictureUrl} onChange={(event) => setProfile({...profile, nftUrl: event.target.value})}  />
        </Form.Item>
        <Form.Item name={['user', 'twitterUrl']} label="Twitter URL"  rules={[{ type: 'url' }]}>
          <Input value={profile.twitterUrl} onChange={(event) => setProfile({...profile, twitterUrl: event.target.value})}  />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button type="primary" htmlType="submit" shape="round">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
