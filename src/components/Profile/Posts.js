import React, { useState } from 'react'
import { getPublications } from '../../lens/Api'
import { useNavigate } from 'react-router-dom';
import { Comment, Tooltip, Divider } from 'antd';
import ProfileAvatar from '../Utilities/ProfileAvatar';
import moment from 'moment';

export default function Posts({profileId}) {
  const [ posts, setPosts] = useState([])
  const navigate = useNavigate();
  React.useEffect(async() => {
    try{
      let query = { profileId: profileId, publicationTypes: ["POST"] }
      const { data } = await getPublications(query)
      setPosts(data.publications.items)
    }catch(error){
      console.log(error)
    }
  }, []);


  return (
    <div>
      { posts.map((post, index) => 
        <Comment
          actions={[]}
          author={<a>{`@${post.profile.handle}`}</a>}
          avatar={<ProfileAvatar profile={post.profile} />}
          content={
            <>
              <p style={{textAlign: 'left'}}>
                { post.metadata.content }
              </p>
              <div style={{ marginTop: '10px', width: '30%', display: 'flex', justifyContent: 'space-between'}}>
                <span>{ post.stats.totalAmountOfMirrors } Mirrors</span>
                <span>{ post.stats.totalAmountOfCollects } Collects</span>
                <span>{ post.stats.totalAmountOfComments } Comments</span>
              </div>
            </>
          }
          datetime={
            <Tooltip title={moment(post.createdAt).format('YYYY-MM-DDTHH:mm:ss.Z')}>
              <span>{moment(post.createdAt).fromNow()}</span>
            </Tooltip>
          }
        />
      )}
    </div>
  )
}
