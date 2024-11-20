// css
import './EditUser.css'

// bootstrap
import { Col, Row } from 'react-bootstrap'

// icons
import { FaArrowLeftLong } from "react-icons/fa6";

// axios
import Caxios from '../../../Axios'


// router
import { Link, useNavigate } from 'react-router-dom';

// cookies
import Cookie from 'cookie-universal'

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

// context
import { useContext, useEffect } from 'react';
import { ProfileContext } from '../../../Context/profileContext'
import { AuthContext } from '../../../Context/authContext'

// formik
import { Formik, Form, Field, ErrorMessage } from 'formik'
import useProfileData from '../../../hooks/useProfileData';

const validate = (values) => {
    let errors = {}

    // first_name field
    if (!values.first_name) {
        errors.first_name = "please write your name"
    }

    // last_name field
    if (!values.last_name) {
        errors.last_name = "please write your lastname"
    }

    // username field
    if (!values.username) {
        errors.username = "please write your username"
    }

    // gender field
    if (!values.gender) {
        errors.gender = "please choose your gender"
    }

    // national_code field
    let isDigitCode = /^\d+$/.test(values.national_code);
    if (!values.national_code || !isDigitCode || values.national_code.length < 5) {
        errors.code = "please write your nationality code"
    }

    // phone_number field
    let isDigitNumber = /^\d+$/.test(values.phone_number);
    if (!values.phone_number || !isDigitNumber || values.phone_number.length < 7) {
        errors.phone_number = "please write your number"
    }

    return errors
}

function EditUser() {
    const navigate = useNavigate()
    const cookies = Cookie()
    const contextProfile = useContext(ProfileContext)
    let initialValeus = {
        first_name: '',
        last_name: '',
        national_code: '',
        phone_number: '',
        username: '',
        gender: 'male',
    }
    
    if (contextProfile.userProfile) {
        initialValeus = {
            first_name: contextProfile.userProfile.first_name,
            last_name: contextProfile.userProfile.last_name,
            national_code: contextProfile.userProfile.national_code            ,
            phone_number: contextProfile.userProfile.phone_number,
            username: contextProfile.userProfile.username,
            gender: contextProfile.userProfile.gender,
        }
    }

    // save user info
    const submit = async (values) => {
        if (!contextProfile.userProfile) {
            try {
                const response = await Caxios.post('profile/create', {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    gender: values.gender,
                    national_code: values.national_code,
                    phone_number: values.phone_number,
                    username: values.username
                }, {
                    headers: { Authorization: `Bearer ${cookies.get('AccessToken')}` }
                })
                console.log(response)
                if (response.status === 200) {

                    toast.success('Your profile has been successfully created', toastOption)
                    ProfileContext.setUserProfile(response.data)
                    navigate('/dashboard')
                }
            } catch (err) {
                toast.error(err.response.data.detail, toastOption)
            }
        } else {
            try {
                const response = await Caxios.put(`profile/${contextProfile.userProfile.id}/update`, {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    gender: values.gender,
                    national_code: values.national_code,
                    phone_number: values.phone_number,
                    username: values.username
                }, {
                    headers: { Authorization: `Bearer ${cookies.get('AccessToken')}` }
                })
                console.log(response)
                if (response.status === 200) {
                    contextProfile.setUserProfile(response.data)
                    toast.success('Your profile has been successfully edited', toastOption)
                }
            } catch (err) {
                toast.error(err.response.data.detail, toastOption)
            }
        }
    }


    return (
        <>
            <div className='d-flex align-items-baseline justify-content-between'>
                <h3 className="mb-5">change information</h3>
                <Link to='/dashboard'><FaArrowLeftLong className='back-svg border-gray-4' /></Link>
            </div>
            <div className='user-form p-4 border-gray-4 d-block d-lg-flex justify-content-between align-items-start'>
                <Formik
                    initialValues={initialValeus}
                    onSubmit={submit}
                    validate={validate}>
                    <Form>
                        <Row className='row-gap-sm-4 row-gap-2'>
                            <Col sm={6} xs={12}>
                                <ErrorMessage name='first_name' component='span' className='err' />
                                <Field placeholder="first name" name='first_name' type="text" />
                            </Col>
                            <Col sm={6} xs={12}>
                                <ErrorMessage name='last_name' component='span' className='err' />
                                <Field placeholder="lastname" name='last_name' type="text" />
                            </Col>
                            <Col sm={6} xs={12}>
                                <ErrorMessage name='username' component='span' className='err' />
                                <Field placeholder="username" name='username' type="text" />
                            </Col>
                            <Col sm={6} xs={12}>
                                <ErrorMessage name='gender' component='span' className='err' />
                                <Field as="select" name="gender">
                                    <option disabled value="">Select your gender</option>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </Field>
                            </Col>
                            <Col sm={6} xs={12}>
                                <ErrorMessage name='national_code' component='span' className='err' />
                                <Field placeholder="nationality code" name='national_code' type="text" />
                            </Col>
                            <Col sm={6} xs={12}>
                                <ErrorMessage name='phone_number' component='span' className='err' />
                                <Field placeholder="phone number" name='phone_number' type="text" />
                            </Col>
                        </Row>
                        <button type='submit' className='submit-btn mt-3 w-100 p-2'>submit</button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default EditUser
