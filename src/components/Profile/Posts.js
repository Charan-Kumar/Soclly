import React from 'react'

export default function Posts() {
  const [ posts, setPosts] = useState([])
  const navigate = useNavigate();
  React.useEffect(async() => {
    try{
      const { data } = await getFollowingRequest(ownedBy)
      setFollowings(data.following.items)
    }catch(error){
      console.log(error)
    }
  }, []);


  return (
    <div>
      
    </div>
  )
}
