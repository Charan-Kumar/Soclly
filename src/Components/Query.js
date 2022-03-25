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