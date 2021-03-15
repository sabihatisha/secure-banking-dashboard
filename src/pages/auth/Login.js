import React, { useState } from 'react'
import './style.scss'
import axios from 'axios'
import {api} from '../../utils/api'
import jwt_decode from 'jwt-decode'
import { Images } from '../../utils/Images'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Login = () => {
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm()
    const [isLogging, setLogging] = useState(false)
    const token = localStorage.getItem('token')

    const checkRole = (token) => {
        const decode = jwt_decode(token)
        const role = decode.role
        if (role === 'admin') {
            return history.push('/admin')
        }
    }

    if (token) return checkRole(token)

    // Submit Form
    const onSubmit = async (data) => {
        try {
            
            setLogging(true)

            const response = await axios.post(`${api}admin/login`,data)
            // console.log(response)
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                checkRole(response.data.token)
                setLogging(false)
              
            }

            console.log(data)
            localStorage.setItem('token', response.data.token)

            setTimeout(() => {
                history.push('/admin')
                setLogging(false)
            }, 1000);

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="auth">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-6 d-none d-lg-block p-0">
                        <div className="image-container">
                            <img src={Images.AuthBg} className="img-fluid" alt="..." />
                            <div className="overlay">
                                <div className="flex-center flex-column">
                                    {/* <img src={Images.Logo} className="img-fluid" alt="..." /> */}
                                    <h1 style={{fontSize:70,fontWeight:900,color:"#ff5733"}}><span style={{fontSize:40,fontWeight:'bold'}}>Secure</span> <br /> Banking</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 py-3 credential-container">
                        <div className="flex-center flex-column">
                            <div className="card border-0">
                                <div className="d-lg-none">
                                    {/* <img src={Images.Logo} className="img-fluid" alt="..." /> */}
                                    <h1 style={{fontSize:46,fontWeight:900,color:"#ff5733"}}><span style={{fontSize:31,fontWeight:'bold'}}>Secure</span> <br /> Banking</h1>

                                </div>
                                <h3 className="mb-4">Get Started!</h3>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    {/* E-mail */}
                                    <div className="form-group mb-4">
                                        {errors.email && errors.email.message ? (
                                            <p className="text-danger">{errors.email && errors.email.message}</p>
                                        ) : <p>E-mail</p>
                                        }

                                        <input
                                            type="text"
                                            name="email"
                                            className="form-control shadow-none"
                                            placeholder="Enter e-mail"
                                            ref={register({
                                                required: "E-mail is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="form-group mb-4">
                                        {errors.password && errors.password.message ? (
                                            <p className="text-danger">{errors.password && errors.password.message}</p>
                                        ) : <p>Password</p>
                                        }

                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control shadow-none"
                                            placeholder="Enter password"
                                            ref={register({
                                                required: "Please enter password",
                                                minLength: {
                                                    value: 8,
                                                    message: "Minimun length 8 character"
                                                }
                                            })}
                                        />
                                    </div>


                                    <div className="d-flex">
                                        <div>
                                            <Link to="/reset">Forgot password ?</Link>
                                        </div>
                                        <div className="ml-auto">
                                            <button type="submit" className="btn shadow-none" disabled={isLogging}>
                                                {isLogging ? <span>Logging in...</span> : <span>Login</span>}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;