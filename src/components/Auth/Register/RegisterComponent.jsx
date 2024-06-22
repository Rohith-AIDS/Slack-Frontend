import React, { useState } from 'react';
import { Grid, Form, Segment, GridColumn, Icon, Header, Button, Message } from 'semantic-ui-react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import "../../Auth/Auth.css";
import { app } from '../../../server/firebase';
import { Link } from 'react-router-dom';
const Register = () => {
    let user = {
        userName: '',
        email: '',
        password: '',
        confirmpassword: ''
    };

    const [userState, setUserState] = useState(user);
    const [errorState, setErrorState] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInput = (event) => {
        let target = event.target;
        setUserState((currentState) => {
            let currentUser = { ...currentState };
            currentUser[target.name] = target.value;
            return currentUser;
        });
    };

    const checkForm = () => {
        if (isFormEmpty()) {
            setErrorState([{ message: "Please fill in all fields" }]);
            return false;
        } else if (!checkPassword()) {
            return false;
        }
        return true;
    };

    const isFormEmpty = () => {
        return !userState.userName.length ||
            !userState.password.length ||
            !userState.confirmpassword.length ||
            !userState.email.length;
    };

    const checkPassword = () => {
        if (userState.password.length < 8) {
            setErrorState([{ message: "Password length should be greater than 8" }]);
            return false;
        } else if (userState.password !== userState.confirmpassword) {
            setErrorState([{ message: "Password and confirm password do not match" }]);
            return false;
        }
        return true;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setErrorState([]);
        setIsSuccess(false);
        if (checkForm()) {
            setIsLoading(true);
            const auth = getAuth(app);
            createUserWithEmailAndPassword(auth, userState.email, userState.password)
                .then((createdUser) => {
                    setIsLoading(false);
                    console.log(createdUser);
                    updateUserDetails(createdUser.user);
                })
                .catch((serverError) => {
                    setIsLoading(false);
                    setErrorState([{ message: getErrorMessage(serverError.code) }]);
                });
        }
    };

    const updateUserDetails = (createdUser) => {
        if (createdUser) {
            setIsLoading(true);
            updateProfile(createdUser, {
                displayName: userState.userName,
                photoURL: `http://gravatar.com/avatar/${createdUser.uid}?d=identicon`
            })
                .then(() => {
                    setIsLoading(false);
                    console.log("User profile updated");
                    console.log(`Display Name: ${createdUser.displayName}`);
                    console.log(`Photo URL: ${createdUser.photoURL}`);
                    saveUserInDB(createdUser); // Call saveUserInDB after updating the profile
                })
                .catch((serverError) => {
                    setIsLoading(false);
                    setErrorState([{ message: getErrorMessage(serverError.code) }]);
                });
        }
    };

    const saveUserInDB = (createdUser) => {
        setIsLoading(true);
        const database = getDatabase(app);
        const userRef = ref(database, 'users/' + createdUser.uid);
        set(userRef, {
            displayName: createdUser.displayName,
            photoURL: createdUser.photoURL
        })
            .then(() => {
                setIsLoading(false);
                setIsSuccess(true);
            })
            .catch((serverError) => {
                setIsLoading(false);
                setErrorState([{ message: getErrorMessage(serverError.code) }]);
            });
    };

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'The email address is already in use by another account.';
            case 'auth/invalid-email':
                return 'The email address is not valid.';
            case 'auth/operation-not-allowed':
                return 'Operation not allowed. Please contact support.';
            case 'auth/weak-password':
                return 'The password is too weak.';
            default:
                return 'An error occurred. Please try again.';
        }
    };

    const formatErrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>);
    };

    return (
        <Grid verticalAlign='middle' textAlign='center' className='grid-form'>
            <GridColumn style={{ maxWidth: '500px' }}>
                <Header icon as="h2">
                    <Icon name="slack" />Register
                </Header>
                <Form onSubmit={onSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="userName"
                            value={userState.userName}
                            icon="user"
                            iconPosition="left"
                            onChange={handleInput}
                            type="text"
                            placeholder="User Name" />

                        <Form.Input
                            name="email"
                            value={userState.email}
                            icon="mail"
                            iconPosition="left"
                            onChange={handleInput}
                            type="email"
                            placeholder="User Email" />

                        <Form.Input
                            name="password"
                            value={userState.password}
                            icon="lock"
                            iconPosition="left"
                            onChange={handleInput}
                            type="password"
                            placeholder="User Password" />

                        <Form.Input
                            name="confirmpassword"
                            value={userState.confirmpassword}
                            icon="lock"
                            iconPosition="left"
                            onChange={handleInput}
                            type="password"
                            placeholder="re-enter password" />
                    </Segment>
                    <Button disabled={isLoading} loading={isLoading} className='button-color'>Submit</Button>
                </Form>
                {errorState.length > 0 && <Message error>
                    <h3>Errors</h3>
                    {formatErrors()}
                </Message>}

                {isSuccess && errorState.length === 0 && <Message success>
                    <h3>Successfully Registered</h3>
                </Message>}

                <Message>
                    Already an user? <Link to="/login">Login</Link>
                </Message>
            </GridColumn>
        </Grid>
    );
}

export default Register;
