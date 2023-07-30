import React, { useEffect, useRef, useState } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Container from '../components/Container';
import Meta from '../components/Meta';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { AiOutlineMail } from 'react-icons/ai'

const signupSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required*"),
    lastName: yup.string().required("Last Name is required*"),
    email: yup.string().required("Email shouldbe valid").required("Email required*"),
    mobile: yup.string().required("Mobile No is required*"),
    password: yup.string().required("Password is required*").min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    gender: yup.string().required("Gender is required*"),
    DOB: yup.string().required("Date Of Birth is required*"),
    address: yup.string().required("Address is required*"),
});


const Singnup = () => {

    const [profileImage, setImage] = useState()
    const inputRef = useRef(null)

    console.log(profileImage)

    const authState = useSelector((state => state?.auth))

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: '',
            gender: '',
            address: '',
            // profileImage: ''

        },
        validationSchema: signupSchema,
        onSubmit: values => {
            console.log(profileImage)
            dispatch(registerUser({ ...values, profileImage }))
            setTimeout(() => {
                navigate("/")
            }, 3000)
        },
    });



    return (
        <>
            <Meta title={"Sing Up"} />
            <BreadCrumbs title='Singup' />
            <Container class1='login-wrapper py-5 home-wrapper-2 bg-primary'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card' style={{ border: "1px solid grey" }}>
                            <h3 className='text-center mb-3'>Singup</h3>
                            <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <div className='profile-img  d-flex flex-column align-items-center '>

                                    <div className='m-3' style={{ height: "100px", width: "100px", }}>
                                        {/* {profileImage && <img src={URL.createObjectURL(profileImage)} style={{height:"120px", width: "120px",borderRadius: "50%"}} className='object-fit-cover'/>} */}
                                        {profileImage ? <img src={URL.createObjectURL(profileImage)} style={{ height: "120px", width: "120px", borderRadius: "50%" }} className='object-fit-cover' /> : <img src="https://w7.pngwing.com/pngs/529/832/png-transparent-computer-icons-avatar-user-profile-avatar.png" style={{ height: "120px", width: "120px", borderRadius: "50%" }} className='object-fit-cover' />}
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center w-50 mb-3'>

                                        <input
                                            type='file'
                                            className={profileImage && 'd-none'}
                                            ref={inputRef}
                                            // style={{ height: "100px", width: "100px" }}
                                            onChange={e => {
                                                setImage(e.target.files[0])
                                            }}
                                        />
                                    </div>
                                </div>


                                <CustomInput
                                    type="text"
                                    name='firstName'
                                    placeholder='First Name*'
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange("firstName")}
                                    onBlur={formik.handleBlur("firstName")}
                                />
                                <div className='errors'>
                                    {formik.touched.firstName && formik.errors.firstName}
                                </div>
                                <CustomInput
                                    type="text"
                                    name='lastName'
                                    placeholder='Last Name*'
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange("lastName")}
                                    onBlur={formik.handleBlur("lastName")}
                                ></CustomInput>
                                <div className='errors'>
                                    {formik.touched.lastName && formik.errors.lastName}
                                </div>
                                <CustomInput
                                    type="email"
                                    name='email'
                                    placeholder="Email*"
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                ></CustomInput>
                                <div className='errors'>
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <PhoneInput
                                    type="tel"
                                    className="react-tel"
                                    name='mobile'
                                    country={'in'}
                                    placeholder='Mobile No'
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                />
                                <div className='errors'>
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>

                                <CustomInput
                                    type="password"
                                    name='password'
                                    placeholder='password*'
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                />
                                <div className='errors'>
                                    {formik.touched.password && formik.errors.password}
                                </div>


                                <div>
                                    <p className=''>Select Gender:</p>
                                    <input className='m-2' type="radio" id='1' value="Male" name="gender" onChange={formik.handleChange("gender")} onBlur={formik.handleBlur("gender")} />Male
                                    <input className='m-2' type="radio" id='2' value="Female" name="gender" onChange={formik.handleChange("gender")} onBlur={formik.handleBlur("Female")} /> Female
                                    <input className='m-2' type="radio" id='3' value="Other" name="gender" onChange={formik.handleChange("gender")} onBlur={formik.handleBlur("Other")} /> Other
                                </div>

                                <CustomInput
                                    type="Date"
                                    name='DOB'
                                    placeholder='DOB'
                                    value={formik.values.DOB}
                                    onChange={formik.handleChange("DOB")}
                                    onBlur={formik.handleBlur("DOB")}
                                />
                                <div className='errors'>
                                    {formik.touched.DOB && formik.errors.DOB}
                                </div>

                                <CustomInput
                                    type="text"
                                    name='address'
                                    placeholder='address'
                                    value={formik.values.address}
                                    onChange={formik.handleChange("address")}
                                    onBlur={formik.handleBlur("address")}
                                />
                                <div className='errors'>
                                    {formik.touched.address && formik.errors.address}
                                </div>


                                <div className='d-flex justify-content-center gap-15 align-item-center'>
                                    <button className='button border-0' type='submit'>Create Account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Singnup