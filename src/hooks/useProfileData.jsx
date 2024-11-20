// cookies
import Cookie from 'cookie-universal'

// context
import { ProfileContext } from '../Context/profileContext'
import { useContext } from 'react'

// axios
import Caxios from '../Axios'


function useProfileData() {
    const cookies = Cookie()
    const contextProfile = useContext(ProfileContext)

    async function getData() {
        try {
            const response = await Caxios.get('profile/me', {
                headers: { Authorization: `Bearer ${cookies.get('AccessToken')}` }
            })
            if (response.status === 200) {
                contextProfile.setUserProfile(response.data)
            }
        } catch (err) {
            if (err.status === 404) {
                navigate('edit-info')
                contextProfile.setUserProfile(false)
            }
        }
    }

    return getData
   
}

export default useProfileData
