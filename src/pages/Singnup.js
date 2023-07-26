import React, { useEffect } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Container from '../components/Container';
import Meta from '../components/Meta';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const signupSchema = yup.object().shape({
    firstName: yup.string().required("First Nmae is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().required("Email shouldbe valid").required("Email required"),
    mobile: yup.string().required("Mobile No is required"),
    password: yup.string().required("Password is required"),
    gender: yup.string().required("Gender is required"),
    DOB: yup.string().required("DOB is required"),
    address: yup.string().required("Address is required"),
});


const Singnup = () => {

    const authState = useSelector((state=>state?.auth))

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
            address: ''

        },
        validationSchema: signupSchema,
        onSubmit: values => {
            dispatch(registerUser(values))
            
        },
    });

    

    return (
        <>
            <Meta title={"Sing Up"} />
            <BreadCrumbs title='Singup' />
            <Container class1='login-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='auth-card' style={{ border: "1px solid grey" }}>
                            <h3 className='text-center mb-3'>Singup</h3>
                            <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <CustomInput
                                    type="text"
                                    name='firstName'
                                    placeholder='First Name'
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange("firstName")}
                                    onBlur={formik.handleBlur("firstName")}
                                />
                                <div className='error'>
                                    {formik.touched.firstName && formik.errors.firstName}
                                </div>
                                <CustomInput
                                    type="text"
                                    name='lastName'
                                    placeholder='Last Name'
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange("lastName")}
                                    onBlur={formik.handleBlur("lastName")}
                                />
                                <div className='error'>
                                    {formik.touched.lastName && formik.errors.lastName}
                                </div>
                                <CustomInput
                                    type="email"
                                    name='email'
                                    placeholder='Email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />
                                <div className='error'>
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <CustomInput
                                    type="tel"
                                    name='mobile'
                                    placeholder='Mobile No'
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                />
                                <div className='error'>
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>

                                <CustomInput
                                    type="password"
                                    name='password'
                                    placeholder='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                />
                                <div className='error'>
                                    {formik.touched.password && formik.errors.password}
                                </div>

                                <CustomInput
                                    type="text"
                                    name='gender'
                                    placeholder='Male/Female/Other'
                                    value={formik.values.gender}
                                    onChange={formik.handleChange("gender")}
                                    onBlur={formik.handleBlur("gender")}
                                />
                                <div className='error'>
                                    {formik.touched.gender && formik.errors.gender}
                                </div>

                                <CustomInput
                                    type="text"
                                    name='DOB'
                                    placeholder='DOB'
                                    value={formik.values.DOB}
                                    onChange={formik.handleChange("DOB")}
                                    onBlur={formik.handleBlur("DOB")}
                                />
                                <div className='error'>
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
                                <div className='error'>
                                    {formik.touched.address && formik.errors.address}
                                </div>


                                <div className='d-flex justify-content-center gap-15 align-item-center'>
                                    <button className='button border-0'>Create Account</button>
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