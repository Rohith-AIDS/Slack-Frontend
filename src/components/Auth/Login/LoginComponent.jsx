// LoginComponent.js

import React, { useState } from 'react';
import { Grid, Form, Segment, Icon, Header, Button, Message } from 'semantic-ui-react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../../../server/firebase';

const Login = () => {
    const [userState, setUserState] = useState({ email: '', password: '' });
    const [errorState, setErrorState] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setUserState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrorState(null);
        setIsLoading(true);

        const { email, password } = userState;
        const auth = getAuth(app);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setIsLoading(false);
            console.log('User logged in:', userCredential.user);
            navigate('/'); // Redirect to app component after successful login
        } catch (error) {
            setIsLoading(false);
            setErrorState(error.message);
        }
    };

    return (
        <Grid verticalAlign='middle' textAlign='center' className='grid-form'>
            <Grid.Column style={{ maxWidth: '500px' }}>
                <Header icon as="h2">
                    Login
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
                {errorState && <Message error>{errorState}</Message>}
                <Message>
                    Not a user? <Link to="/register">Register</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default Login;
