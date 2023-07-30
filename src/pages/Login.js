import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumbs from '../components/BreadCrumbs';
import Container from '../components/Container';
import Meta from '../components/Meta';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import "./login.css"
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa"

const loginSchema = yup.object().shape({
    email: yup.string().required("Email shouldbe valid").required("Email is rquired*"),
    password: yup.string().required("Password is required*"),
});

const Login = () => {
    const authState = useSelector(state => state.auth.logedUser?.status)
    console.log(authState)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            dispatch(loginUser(values))
            // if(authState !== undefined && authState == true ){
            //     navigate('/my-profile')
            // }



            // navigate("/my-profile")
        },

    });

    useEffect(() => {
        if (authState) {
            setTimeout(() => {
                navigate('/update-profile')
            }, 1000)
        }
    }, [authState])





    return (
        <>
            <Meta title={"Login"} />

            <div className='row d-flex justify-content-center align-items-center w-100 vh-100 bg-primary'>
                <div className='col-lg-12 d-flex justify-content-center align-items-center'>
                    <div className=' p-5  bg-white ' style={{ border: "1px solid grey", width: "35vw", height: "88vh", borderRadius: "30px" }}>
                        <h3 className='text-center mb-3'>Get Started Now</h3>
                        <p className='text-center mb-3'>Enter your credential to access your account</p>
                        <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>

                            <div className='d-flex align-items-center justify-content-center '>
                                <button className='me-2 rounded-3 p-1 border-1'><FcGoogle className='ms-2' /> Login With Google</button>
                                <button className=' rounded-3 p-1 border-1'> <FaFacebookF className='me-1' />Login With Facebook</button>
                            </div>
                            <p className='text-center m-2'>Or</p>
                            <div className=' '>
                                
                                <CustomInput
                                    type="email"
                                    name='email'
                                    placeholder='Email'
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                    value={formik.values.email}
                                ></CustomInput>
                                <div className='errors'>
                                    {formik.touched.email && formik.errors.email}
                                </div>
                            </div>
                            <CustomInput
                                className='rounded-3'
                                type="password"
                                name='password'
                                placeholder='password'
                                onChange={formik.handleChange("password")}
                                onBlur={formik.handleBlur("password")}
                                value={formik.values.password}
                            />
                            <div className='errors'>
                                {formik.touched.password && formik.errors.password}
                            </div>
                            <Link to="/forgot-password" >Forgot your Password ?</Link>
                            <div className='d-flex justify-content-center gap-15 align-item-center mb-3'>
                                <button className='w-100 bg-primary text-white border-light p-1' style={{ borderRadius: "20px" }} type='submit'>Login</button>

                            </div>
                            <div>
                                <p>You Don't Have An Account? <Link to="/signup">Signup</Link></p>
                            </div>
                            <p className='text-center '>2023 Acme, All Right Reserved</p>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login