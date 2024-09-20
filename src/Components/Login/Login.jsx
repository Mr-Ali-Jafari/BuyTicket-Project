import { createPortal } from "react-dom"
import Caxios from '../../Axios'
// images
import logo from '../../assets/images/LOGO.PNG'

// css
import './Login.css'

// context
import { useContext, useEffect } from "react"
import { headerData } from '../../Context/header'

// icons
import { IoCloseSharp } from "react-icons/io5";

// alerts
import { toast } from "react-toastify"
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

// cookies
import Cookie from 'cookie-universal'

// formik
import { Formik, Form, Field, ErrorMessage } from "formik"
import validator from "validator"

const fields = {
    'email': '',
    'checkbox': false
}



const validateForm = (values) => {
    let errors = {}

    // validate email
    if (!values.email) {
        errors.email = 'please write your email'
    } else if (!validator.isEmail(values.email)) {
        errors.email = 'please wrtie correct email'
    }

    // validate checkbox
    if (!values.checkbox) {
        errors.checkbox = 'please accept our rules'
    }

    return errors
}

function Login() {
    const cookies = Cookie()

    let context = useContext(headerData)

    const submit = async (values, props) => {
        const response = await Caxios.post('login/send-code', {
            email: values.email
        })

        if (response.status === 200) {
            toast.success('The verification code has been successfully sent to your account', toastOption)
            let now = (new Date().getTime() + 1000 * 60 * 10)

            try {
                cookies.set('user-email', values.email, {
                    expires: new Date(now)
                })
                props.setSubmitting(false)
                context.setIsLoginOpen(false)
                context.setIsCheckCodeOpen(true)
            } catch {
                toast.error('Unfortunately, the operation of sending the code to the email encountered an error. please try again', toastOption)
                props.setSubmitting(false)
            }


        } else {
            toast.error('Unfortunately, the operation of sending the code to the email encountered an error please try again', toastOption)
            props.setSubmitting(false)
        }
    }

    return createPortal(
        <div className={context.isLoginOpen ? 'login active' : 'login'}>
            <div className="ovarlay" onClick={() => context.setIsLoginOpen(false)}></div>
            <div className="login-div">
                <IoCloseSharp className="d-none" onClick={() => context.setIsLoginOpen(false)} />
                <div>
                    <center>
                        <img src={logo} alt="logo" />
                        <h4 className="title">register or login</h4>
                    </center>
                    <p className="hint mb-1">The confirmation code will be sent to the email you enter.</p>
                    <Formik
                        initialValues={fields}
                        validate={validateForm}
                        onSubmit={submit}>
                        {(formik) => (
                            <Form>
                                <div className="mb-4">
                                    <Field name="email" type="text" id="email" placeholder="email" />
                                    <ErrorMessage name="email" className="error" component="p" />
                                </div>
                                <div className="checkbox-div d-flex gap-2">
                                    <Field name="checkbox" type="checkbox" id="checkbox" placeholder="email" />
                                    <span>By entering and registering on the site, I agree with the ticket rules</span>
                                </div>
                                <ErrorMessage name="checkbox" className="error" component="p" />
                                <button className="btn--primary justify-content-center w-100 mt-4" disabled={formik.isSubmitting || !formik.dirty || !formik.isValid && true} type="submit">submit</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
        , document.getElementById('login_box'))
}

export default Login
