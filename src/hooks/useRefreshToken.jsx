// cookies
import Cookie from 'cookie-universal'

// axios
import Caxios from '../Axios'


function useRefreshToken(expiredDate=flase) {
    const cookies = Cookie()


    // check accessToken
    async function RefreshToken() {
        console.log('run use refresh token')
        let accessToken = cookies.get('AccessToken')
        if (accessToken === undefined || expiredDate) {
            try {
                const response = await Caxios.post('login/token/refresh', {}, {
                    headers: { Authorization: `Bearer ${cookies.get('RefreshToken')}` }
                })
                console.log(response.data)
                cookies.set('AccessToken', response.data.access_token)
            } catch (err) {
                if (err.status === 401) {
                    console.log('refresh token expired')
                }
            }
        }
    }
    return RefreshToken
}

export default useRefreshToken
