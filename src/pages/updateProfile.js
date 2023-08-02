import React, { useState } from 'react'
import BreadCrumbs from '../components/BreadCrumbs'
import Container from '../components/Container'
import { useFormik } from "formik"
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from '../features/user/userSlice'
import { FiEdit } from "react-icons/fi"
import CustomInput from '../components/CustomInput'

const profileSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().required("Email shouldbe valid").required("Email erquired"),
    mobile: yup.number().required("Mobile is required"),
    DOB: yup.date().required("Date of Birth is required"),
    gender: yup.string().required("Addressis required"),
    address: yup.string().required("Address is required"),
});


const UpdateProfile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userState = useSelector(state => state?.auth?.user?.myUser)
    console.log(userState)
    const [edit, setEdit] = useState(true)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: userState?.firstName,
            lastName: userState?.lastName,
            profilePhoto: userState?.profileImage,
            email: userState?.email,
            mobile: userState?.mobile,
            DOB: userState?.DOB,
            gender: userState?.gender,
            address: userState?.address
        },
        validationSchema: profileSchema,
        onSubmit: values => {
            dispatch(updateProfile(values))
            setEdit(true)
        },
    });


    return (
        <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
            <div className='w-50 p-5 rounded-3 bg-white'>
                <form>
                    <div className='d-flex align-items-center justify-content-center mb-3'>
                        <h3 >Account Details</h3>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <FiEdit className='fs-3' onClick={() => setEdit(false)} />
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <div className='mb-2'>
                                <label htmlFor='firstname'>First Name</label>
                                <CustomInput
                                    type="text"
                                    name='firstname'
                                    disabled={edit}
                                    id="firstname"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange("firstname")}
                                    onBlur={formik.handleBlur("firstname")}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='lastName'>Last Name</label>
                                <CustomInput
                                    type="text"
                                    name='lastName'
                                    disabled={edit}
                                    id="lastName"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange("lastName")}
                                    onBlur={formik.handleBlur("lastName")}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                <input
                                    type="number"

                                    name='mobile'
                                    className="form-control"
                                    disabled={edit}
                                    id="example1"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='email'>Email</label>
                                <CustomInput
                                    type="text"
                                    name='email'
                                    disabled={edit}
                                    id="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='dateofbirth'>Date Of Birth</label>
                                <CustomInput
                                    type="text"
                                    name='DOB'
                                    disabled={edit}
                                    id="dateofbirth"
                                    value={formik.values.DOB}
                                    onChange={formik.handleChange("DOB")}
                                    onBlur={formik.handleBlur("DOB")}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='gender'>Gender</label>
                                <CustomInput
                                    type="text"
                                    name='gender'
                                    disabled={edit}
                                    id="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange("gender")}
                                    onBlur={formik.handleBlur("gender")}
                                />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='address'>Address</label>
                                <CustomInput
                                    type="text"
                                    name='address'
                                    disabled={edit}
                                    id="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange("address")}
                                    onBlur={formik.handleBlur("address")}
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className='d-flex align-items-center justify-content-center mt-3'>
                                <img src={userState?.profileImage ? userState?.profileImage : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"} style={{ height: "40vh", width: "30vw", borderRadius: "50%" }} />
                            </div>

                            {
                                edit === false && <div className='d-flex align-items-center justify-content-center'>
                                <button type="submit" className="btn btn-primary mt-3">Save</button>
                                </div>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile