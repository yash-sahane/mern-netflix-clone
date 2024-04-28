import React, { useEffect } from 'react';
import registerStyles from '../styles/register.module.css';
import headerStyles from '../styles/header.module.css';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Header from '../components/Header';
import styles from '../styles/login.module.css'

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const { email, password } = values;
            const userAuth = await signInWithEmailAndPassword(firebaseAuth, email, password);
            if (userAuth.user) {
                toast.success('Login Successful');
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                navigate('/');
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className={registerStyles.auth_page}>
            <Header />
            <div className={registerStyles.auth_wrapper}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Email is Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Password is Required';
                        } else if (values.password.length < 6) {
                            errors.password = 'Password must be at least 6 characters long';
                        }
                        return errors;
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className={styles.login_auth_form}>
                            <div className={styles.auth_heading}>
                                <h3>Login</h3>
                            </div>
                            <div className={styles.form}>
                                <div className={styles.field}>
                                    <Field type="email" name='email' placeholder='Email' />
                                    <ErrorMessage name="email" component="div" className={styles.error} />
                                </div>
                                <div className={styles.field}>
                                    <Field type="password" name='password' placeholder='Password' />
                                    <ErrorMessage name="password" component="div" className={styles.error} />
                                </div>
                            </div>
                            <button className={headerStyles.btn} type='submit' disabled={isSubmitting}>Sign In</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;