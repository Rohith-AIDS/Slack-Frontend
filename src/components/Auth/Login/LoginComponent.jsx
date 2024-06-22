import React, { useState } from 'react';
import { Grid, Form, Segment, GridColumn, Icon, Header, Button, Message } from 'semantic-ui-react';
import "../../Auth/Auth.css";
import { app } from '../../../server/firebase';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    let user = {
        email: '',
        password: ''
    }

    const [userState, setUserState] = useState(user);
    const [errorState, setErrorState] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Use navigate hook for redirection

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
        }
        return true;
    };

    const isFormEmpty = () => {
        return !userState.password.length || !userState.email.length;
    };

    const formatErrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setErrorState([]);

        if (checkForm()) {
            setIsLoading(true);
            const auth = getAuth(app);
            signInWithEmailAndPassword(auth, userState.email, userState.password)
                .then((user) => {
                    setIsLoading(false);
                    console.log(user);
                    navigate('/'); // Redirect to the App landing page after successful login
                })
                .catch((serverError) => {
                    setIsLoading(false);
                    setErrorState([{ message: "The given email id is wrong" }]);
                });
        }
    };

    return (
        <div>
            <Grid verticalAlign='middle' textAlign='center' className='grid-form'>
                <GridColumn style={{ maxWidth: '500px' }}>
                    <Header icon as="h2">
                        <Icon name="slack" />Login
                    </Header>
                    <Form onSubmit={onSubmit}>
                        <Segment stacked>
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
                        </Segment>
                        <Button disabled={isLoading} loading={isLoading} className='button-color'>Login</Button>
                    </Form>
                    {errorState.length > 0 && <Message error>
                        <h3>Errors</h3>
                        {formatErrors()}
                    </Message>}
                    <Message>
                        Not a user? <Link to="/register">Register</Link>
                    </Message>
                </GridColumn>
            </Grid>
        </div>
    )
}

export default Login;
