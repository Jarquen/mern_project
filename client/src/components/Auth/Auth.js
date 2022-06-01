import React, {useEffect, useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from "@material-ui/core";
import {GoogleLogin} from 'react-google-login'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import Icon from "./icon";
import {gapi} from 'gapi-script';
import {useDispatch} from "react-redux";
import {authentication} from "../../feature/postsSlice";
import {useNavigate} from "react-router-dom";
import * as api from '../../api'

const initialState = {firstName: "", lastName: "", email: "", password: "", confirmPassword: ""};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignup) {
            await api.signUp(formData).then((res) => {
                dispatch(authentication(res.data))
            }).then(navigate('/'));
        } else {
            await api.signIn(formData).then((res) => {
                dispatch(authentication(res.data))
            }).then(navigate('/'));
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            await dispatch(authentication({result, token}))
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign In was unsuccessful. Try Again Later");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange}
                               type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange}
                                            type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick}
                                disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                            Google Sign In
                        </Button>
                    )}
                                 onSuccess={googleSuccess}
                                 onFailure={googleFailure}
                                 cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                        <Button onClick={switchMode}>
                            {isSignup ? "Already have an account ? Sign In" : "Don't have an account ? Sign Up"}
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;