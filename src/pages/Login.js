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
import {AiOutlineMail} from 'react-icons/ai'
 import {RiLockPasswordFill} from 'react-icons/ri'

const loginSchema = yup.object().shape({
    email: yup.string().required("Email shouldbe valid").required("Email is rquired*"),
    password: yup.string().required("Password is required*"),
});

const Login = () => {
    const authState = useSelector(state=>state.auth.logedUser?.status)
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

    useEffect(()=>{
        if( authState){
            setTimeout(()=>{
                navigate('/my-profile')
            },1000)
        }
    },[authState])

    

    

    return (
        <>
            <Meta title={"Login"} />
            <BreadCrumbs title='Login' />
             
            
            <Container class1='login-wrapper py-5 home-wrapper-2'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='auth-card' style={{ border: "1px solid grey" }}>
                            <h3 className='text-center mb-3'>Login</h3>
                            <form action='' onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>

                            
                                <CustomInput
                                    type="email"
                                    name='email'
                                    placeholder='email'
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                    value={formik.values.email}
                                ><AiOutlineMail /></CustomInput>
                                <div className='errors'>
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <CustomInput
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
                                <div className='d-flex justify-content-center gap-15 align-item-center'>
                                    <button className='button border-0' type='submit'>Login</button>
                                    <Link to="/signup" className='button signup'>Singnup</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Login