/// @dev Create Profile Query For Lens Protocol request Variable Requires : 
/// handle / profilePictureURI / followNFTURI / followModule 
/// in the same order followModule has its own specifications refer 
/// API Design Section in https://docs.lens.dev/docs/create-profile
/// ** Important This also requires the Authentication header to be attached with the query
export const CREATE_PROFILE = `
mutation($request : CreateProfileRequest!){
    createProfile(request : $request)
    {
        ...on RelayerResult {
            txHash
        }
        ...on RelayerError 
        {
            reason
        }
         __typename 
    }
}
`


// Get Profile Query check whether requires authenticated token or not 
// Extensive Query can be reduced to get things that we only want 
// To Remove anything that we dont need just remove that field from the query 
// examples for the data that should be passed can be seen here : 
// https://docs.lens.dev/docs/create-follow-typed-data under the hookingTypedData heading
export const GET_PROFILE = 
`
query($request : ProfileQueryRequest!)
{
    profiles(request : $request)
    {
        items
        {
            id
        name
        bio
        location
        website
        twitterUrl
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        depatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          __typename
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
        }
    }
}
`


export const CREATE_FOLLOW_TYPED_DATA = `
mutation($request : FollowRequest!)
{
    createFollowRequest (request : $request)
    {
        id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
    }
}
`