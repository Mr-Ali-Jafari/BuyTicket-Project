import { useContext } from "react"
import Caxios from "../Axios"
import { AuthContext } from "../Context/authContext"
import useRefreshToken from "./useRefreshToken"

// cookies
import Cookie from 'cookie-universal'

function useUserInfo() {
    let context = useContext(AuthContext)
    const refresh = useRefreshToken(true)
    async function addUserInfo() {
        const cookies = Cookie()
        try {
            const response = await Caxios.get('login/current-user', {
                headers: { Authorization: `Bearer ${cookies.get('AccessToken')}` }
            })

            if (response.status === 200) {
                context.setUserInfo({
                    id: response.data.id,
                    email: response.data.email,
                })
                context.setIsLogin(true)
            }
            console.log(response);
        } catch (err) {
            if (err.status === 401) {
                await refresh()
                try {
                    const response = await Caxios.get('login/current-user', {
                        headers: { Authorization: `Bearer ${cookies.get('AccessToken')}` }
                    })
                    if (response.status === 200) {
                        context.setUserInfo({
                            id: response.data.id,
                            email: response.data.email,
                        })
                        context.setIsLogin(true)
                    }
                }catch(err) {
                    return null
                }

                
            }
        }
    }
    return addUserInfo

}

export default useUserInfo
