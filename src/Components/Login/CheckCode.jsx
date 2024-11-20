import { createPortal } from 'react-dom'
import { useContext, useEffect, useRef, useState } from "react"

// axios
import Caxios from '../../Axios'

// css
import './Login.css'

// images
import logo from '../../assets/images/LOGO.PNG'

// context
import { headerData } from '../../Context/header'
import { AuthContext } from '../../Context/authContext'

// cookies
import Cookie from 'cookie-universal'

// router
import { useNavigate } from "react-router-dom";


// toast
import { toast } from 'react-toastify'
let toastOption = {
    position: "top-left",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}
// icons
import { IoCloseSharp, IoArrowBackSharp } from "react-icons/io5";

// hooks
import useUserInfo from '../../hooks/useUserInfo'
import useRefreshToken from '../../hooks/useRefreshToken'

function CheckCode() {
    const cookies = Cookie()

    const userInfo = useUserInfo()
    let context = useContext(headerData)
    const navigate = useNavigate();

    let num1 = useRef()
    let num2 = useRef()
    let num3 = useRef()
    let num4 = useRef()
    let num5 = useRef()
    let num6 = useRef()
    let firstTime6 = false

    let [num1Value, setNum1Value] = useState('')
    let [num2Value, setNum2Value] = useState('')
    let [num3Value, setNum3Value] = useState('')
    let [num4Value, setNum4Value] = useState('')
    let [num5Value, setNum5Value] = useState('')
    let [num6Value, setNum6Value] = useState('')


    useEffect(() => {
        if (context.isCheckCodeOpen) {
            num1.current.focus()
        }
    }, [context.isCheckCodeOpen])


    let onsubmit = async (e) => {
        e.preventDefault()

        if (cookies.get('user-email') === undefined) {
            toast.error('Unfortunately, the operation of verifing code encountered an error please try again', toastOption)
            context.setIsLoginOpen(true)
            context.setIsCheckCodeOpen(false)
            return true
        }

        const otpCode = num1.current.value[0] + num2.current.value[0]
            + num3.current.value[0] + num4.current.value[0] + num5.current.value[0] + num6.current.value[0]
        let isDigit = /^\d+$/.test(otpCode);
        if (otpCode.length === 6 && isDigit) {

            try {
                const response = await Caxios.post('login/verify-code/', {
                    email: cookies.get('user-email'),
                    code: otpCode
                })

                // login user
                if (response.status === 200) {
                    let now = new Date().getTime()
                    cookies.set('AccessToken', response.data.access_token, {
                        expires: new Date(now + 1000 * 60 * 30)
                    })
                    cookies.set('RefreshToken', response.data.refresh_token, {
                        expires: new Date(now + 1000 * 60 * 60 * 24 * 7)
                    })
                    toast.success('You have successfully logged into your account', toastOption)
                    // save user info 
                    userInfo()
                    context.setIsCheckCodeOpen(false)
                    navigate('/dashboard')

                }
            } catch (err) {
                console.log(err);
                if (err.status === 400) {
                    toast.error(err.response.data.detail, toastOption)
                }
            }

        } else {
            toast.error("Invalid or expired verification code", toastOption)
        }


    }

    return createPortal(
        <div className={context.isCheckCodeOpen ? 'login active' : 'login'}>
            <div className="ovarlay" onClick={() => context.setIsCheckCodeOpen(false)}></div>
            <div className="login-div">
                <IoCloseSharp className="d-none" onClick={() => context.setIsCheckCodeOpen(false)} />
                <div>
                    <IoArrowBackSharp onClick={() => {
                        context.setIsCheckCodeOpen(false)
                        context.setIsLoginOpen(true)
                    }} />
                    <center>
                        <img src={logo} alt="logo" />
                        <h4 className="title">register or login</h4>
                    </center>
                    <p className="hint mb-1">Enter the six-digit code sent to the email <span>alirezam@gmail.com</span></p>
                    <form method='POST'>
                        <div className="inputs-div mt-3 d-flex justify-content-around w-100">
                            <input onKeyUp={e => {
                                if (e.keyCode === 8) {
                                    num1.current.focus()
                                    setNum1Value('')
                                } else {
                                    num2.current.focus()
                                    setNum2Value('')
                                }
                            }}
                                onChange={(e) => setNum1Value(e.target.value)} value={num1Value} ref={num1} type="number" min="0" max="9" />
                            <input onKeyUp={e => {
                                if (e.keyCode === 8) {
                                    num1.current.focus()
                                    setNum1Value('')
                                } else {
                                    num3.current.focus()
                                    setNum3Value('')
                                }
                            }}
                                onChange={(e) => setNum2Value(e.target.value)} value={num2Value} ref={num2} type="number" min="0" max="9" />
                            <input onKeyUp={e => {
                                if (e.keyCode === 8) {
                                    num2.current.focus()
                                    setNum2Value('')
                                } else {
                                    num4.current.focus()
                                    setNum4Value('')
                                }
                            }}
                                onChange={(e) => setNum3Value(e.target.value)} value={num3Value} ref={num3} type="number" min="0" max="9" />
                            <input onKeyUp={e => {
                                if (e.keyCode === 8) {
                                    num3.current.focus()
                                    setNum3Value('')
                                } else {
                                    num5.current.focus()
                                    setNum5Value('')
                                }
                            }}
                                onChange={(e) => setNum4Value(e.target.value)} value={num4Value} ref={num4} type="number" min="0" max="9" />
                            <input onKeyUp={e => {
                                if (e.keyCode === 8) {
                                    num4.current.focus()
                                    setNum4Value('')
                                } else {
                                    num6.current.focus()
                                    setNum6Value('')
                                }
                            }}
                                onChange={(e) => setNum5Value(e.target.value)} value={num5Value} ref={num5} type="number" min="0" max="9" />
                            <input onKeyUp={e => {
                                if (firstTime6) {
                                    num5.current.focus()
                                    setNum5Value('')
                                    firstTime6 = false
                                } else if (e.keyCode === 8) {
                                    setNum6Value('')
                                    firstTime6 = true
                                }
                            }}
                                onChange={(e) => setNum6Value(e.target.value)} value={num6Value} ref={num6} type="number" min="0" max="9" />
                        </div>
                        <button onClick={onsubmit} className="btn--primary justify-content-center w-100 mt-4" type="submit">submit</button>
                        <div className='links mt-2 d-flex align-items-center justify-content-between'>
                            <span>change email</span>
                            <span>send again</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        , document.getElementById('check_code_box'))
}

export default CheckCode
