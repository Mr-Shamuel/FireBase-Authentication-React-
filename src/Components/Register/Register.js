import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Register.css'
import { Link } from 'react-router-dom';
import fb from '../../icon/fb.png'
import google from '../../icon/google.png'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../Firebase/firebase.config';

const auth = getAuth(app);

const Register = () => {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Creating signing  accunt
    const handleBlurName = (e) => {

        setName(e.target.value);
    }
    const handleBlurEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleBlurPassword = (e) => {
        setPassword(e.target.value);
    }

    //submit form
    const handleSubmit = (e) => {
        //creating password authentication
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {

                setUser(result.user);
                verifyEmail();
                updateUser();
                setError('');
            })
            .catch(err => {
                setError(err.message);
                setUser({})
            })



        e.preventDefault()
    }


    console.log(name)
    // console.log(email)
    // console.log(password)
    // console.log(error)
    console.log(user)

    // google signin 
    const HandleGoogleSignIn = () => {

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user;
                setUser(user);
                setError('');
                verifyEmail();


            })
            .catch(err => {
                setError(err.message);
                setUser({})
            })

    }
    //Update Profile

    const updateUser = () => {
        updateProfile(auth.currentUser, {
            displayName: name

        }).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }

    //sending verification email
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // alert("Verification mail sent");

            });

    }


    return (
        <div className='register'>
            <div>
                {
                    user.email && <>

                        {/* <h5>Email : {user.email}</h5> */}

                        <p style={{ color: 'green' }}>User Created & Verification mail sent</p>
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
                    <h4>Create an account</h4>

                    <TextField onBlur={handleBlurName} id="standard-basic" label="Name" variant="standard" />
                    <br />
                    <br />
                    <TextField onBlur={handleBlurEmail} id="standard-basic" label="Username or Email" variant="standard" />
                    <br />
                    <br />

                    <TextField onBlur={handleBlurPassword} id="standard-basic" label="Password" variant="standard" /> <br />

                    <button className='registerBtn btn mt-4 my-2' type='submit'>Create an account</button>
                    <p className='registerAlready text-center'>Already have an account? <span> <Link to='/login'>Login</Link></span></p>




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
    );
};

export default Register;