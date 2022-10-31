import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Link } from 'react-router-dom';
import fb from '../../icon/fb.png'
import google from '../../icon/google.png'
import './Login.css'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import app from '../../Firebase/firebase.config';

const auth = getAuth(app);

const Login = () => {
    const [user, setUser] = useState({});
    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Creating signing  accunt

    const handleBlurEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleBlurPassword = (e) => {
        setPassword(e.target.value);
    }

    //submit form
    const handleSubmit = (e) => {

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {

                setUser(result.user)
                setError('')
            })
            .catch(err => {
                setError(err.message);
                setUser({})
            })


        e.preventDefault()
    }



    // google signin 
    const HandleGoogleSignIn = () => {

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user;
                setUser(user);
                setError('')


            })
            .catch(err => {
                setError(err.message);
                setUser({})
            })

    }
    //reset password 
    const handleForgetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // console.log("password reset email sent")
                alert('password reset email sent')

            })
            .catch((error) => {

                const errorMessage = error.message;
                console.log(errorMessage)
            });

    }
    console.log(user)
    return (
        <div>
            <div className='register'>
                <div>

                    {
                        user.displayName && <>

                            <h5>Welcome {user.displayName},</h5>

                            <p style={{ color: 'green' }}>User Login Successfully</p>
                        </>
                    }
                    {
                        error && <p style={{ color: 'red' }}>{error}</p>
                    }

                    <Box className='registerCon'
                        onSubmit={handleSubmit}
                        component="form"
                        sx={{
                            '& > :not(style)': { mx: 3, my: 1, width: '50ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <h4>Login</h4>


                        <TextField onBlur={handleBlurEmail} id="standard-basic" label="Username or Email" variant="standard" />
                        <br />
                        <br />

                        <TextField onBlur={handleBlurPassword} id="standard-basic" label="Password" variant="standard" /> <br />
                        <Link onClick={handleForgetPassword}> Forget Password</Link>


                        <button className='registerBtn btn mt-4 my-2' type='submit'>Login</button>
                        <p className='registerAlready text-center'>Don't have an account? <span> <Link to='/register'>Create an account</Link></span></p>




                    </Box>
                    <div className='borders'>

                        <p></p> <span> Or </span> <p></p>

                    </div>

                    <div className="socialButton">

                        <div className="facebookBtn btn btn-outline-info text-dark  border"><img src={fb} alt="" /> <p className='pt-1'>Continue with Facebook</p></div>
                        <br />
                        <div onClick={HandleGoogleSignIn} className="googleBtn btn btn-outline-info text-dark border"><img src={google} alt="" /><p className='pt-1'>Continue with Google</p> </div>

                    </div>
                </div>



            </div>
        </div>
    );
};

export default Login;