import React, { useEffect, useState } from 'react';
import styles from '../styles/register.module.css';
import headerStyles from '../styles/header.module.css';
import AuthHeading from '../components/AuthHeading';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Header from '../components/Header';

const Register = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const { email, password } = values;
            const userAuth = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            if (userAuth.user) {
                toast.success('Registration Successful');
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
        <div className={styles.auth_page}>
            <Header />
            <div className={styles.auth_wrapper}>
                <AuthHeading />
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
                        <Form className={styles.auth_form}>
                            <div className={styles.form}>
                                <div className={styles.field_div}>
                                    <Field type="email" name='email' placeholder='Email' />
                                    {showPass ? <Field type="password" name='password' placeholder='Password' /> : <button onClick={() => setShowPass(true)}>Get Started</button>}
                                </div>
                                <div className={styles.err_msg}>
                                    <ErrorMessage name="email" component="div" className="error" />
                                    <ErrorMessage name="password" component="div" className="error" />
                                </div>
                            </div>
                            <button className={headerStyles.btn} type='submit' disabled={isSubmitting}>Sign Up</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;
