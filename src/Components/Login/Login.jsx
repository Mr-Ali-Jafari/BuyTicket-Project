import { createPortal } from "react-dom"

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
    let context = useContext(headerData)

    const submit = (values, props) => {

        let userDate = { email: values.email }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDate)
        };


        fetch(import.meta.env.VITE_API_KEY + 'login/send-code', options)
            .then(res => {
                if (res.status === 200) {
                    toast.success('The verification code has been successfully sent to your account', toastOption)
                    props.setSubmitting(false)
                    context.setIsLoginOpen(false)
                    context.setIsCheckCodeOpen(true)
                } else {
                    toast.error('Unfortunately, the operation of sending the code to the email encountered an error', toastOption)
                    props.setSubmitting(false)
                }
            })
            .catch(err => console.log(err))
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
                                {/* <button className="btn--primary justify-content-center w-100 mt-4" disabled={formik.isSubmitting || !formik.dirty || !formik.isValid && true} type="submit">submit</button> */}
                                <button className="btn--primary justify-content-center w-100 mt-4" type="submit">submit</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
        , document.getElementById('login_box'))
}

export default Login
