import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import classes from './SignUp.module.scss';
import axios from 'axios';
import {AuthContext} from '@/components/context';
import {useNavigateHandler} from "@/utils/useCustomNavigate";
import Layout from "@/components/layout/Layout";
import Loader from '@/components/loader/Loader';
import PopUp from "@/pages/login/popup/PopUp";
import {FaRegEyeSlash, FaRegEye} from "react-icons/fa";


const SignUp = () => {

    const {isAuth, setIsAuth, isLoading, setLoading} = useContext(AuthContext);
    const navigateHandler = useNavigateHandler();


    const [name, setName] = useState('');
    const [nameError, setNameError] = useState<string>('Имя обязательно*');
    const [nameDirty, setNameDirty] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('Почта обязательна*');
    const [emailDirty, setEmailDirty] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('Пароль обязателен*');
    const [passwordDirty, setPasswordDirty] = useState<boolean>(false);

    const [passwordVerify, setPasswordVerify] = useState<string>('');
    const [passwordVerifyError, setPasswordVerifyError] = useState<string>('Подтвердите пароль');
    const [passwordVerifyDirty, setPasswordVerifyDirty] = useState<boolean>(false);

    const [activeForm, setActiveForm] = useState<boolean>(false);
    const [inputPasswordType, setInputPasswordType] = useState<string>('password')
    const [inputPasswordVerifyType,setInputPasswordVerifyType] = useState<string>('password');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [popUpActive, setPopUpActive] = useState<boolean>(false);

    const inputPasswordTypeHandler = (type: string) => {
        setInputPasswordType(type);
    }
    const inputPasswordVerifyTypeHandler = (type: string) => {
        setInputPasswordVerifyType(type);
    }


    const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setName(newValue);
        if (newValue.length <= 3) {
            setNameError('Имя должно быть не менее 3 символов*');
        } else {
            setNameError('');
        }
    };

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Введите правильную почту')

        } else {
            setEmailError('')
        }
    }

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setPassword(newValue)

        if (newValue.length <= 5) {
            setPasswordError('Пароль должен быть больше чем 5 символов');

        } else {
            setPasswordError('');
        }
    };

    const passwordVerifyHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setPasswordVerify(newValue)

        if (newValue !== password) {
            setPasswordVerifyError('Пароли не совпадают')
        } else {
            setPasswordVerifyError('');
        }
    }

    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case  'name' :
                setNameDirty(true);
                break;
            case 'email' :
                setEmailDirty(true);
                break;
            case 'password' :
                setPasswordDirty(true);
                break;
            case 'passwordVerify':
                setPasswordVerifyDirty(true)
                break;

        }
    };
    useEffect(() => {
        if (nameError.length > 0 || emailError.length > 0 || passwordError.length > 0 || passwordVerifyError.length > 0) {
            setActiveForm(false);
        } else {
            setActiveForm(true);
        }

    }, [nameError, emailError, passwordError, passwordVerifyError]);


    const registrationHandler = async () => {
        try {
            const body = {
                name: name,
                email: email,
                password: password,
            }
            console.log('body', body)
            const response = await axios.post('http://localhost:5000/auth/user-registration', body)
            setLoading(true);

            if (response.data.error) {
                setTimeout(() => {
                    setErrorMsg(response.data.error)
                    setLoading(false)
                    setPopUpActive(true)
                }, 1000)
            }
            if (response.data.success && response.data.token) {
                setTimeout(() => {
                    setLoading(false)
                    const token = response.data.token;
                    console.log('token', token)
                    localStorage.setItem('token', token);
                    setIsAuth(true)
                    navigateHandler('/main')
                    console.log('response', response)
                    return response
                }, 1000)
            }

            console.log('response', response)
            return response


        } catch (error: any) {
            setLoading(true)
            setTimeout(() => {
                setErrorMsg(error.message)
                setLoading(false)
                setPopUpActive(true)
            }, 1000)
        }
    }


    return (
        <Layout>
            {isLoading ? (
                <div className={classes.loader_block}>
                    <div className={classes.loader}>
                        <Loader height={'65'} width={'65'} color="white"/>
                    </div>
                </div>
            ) : (
                <div className={classes.signup}>
                    <div className={classes.signup_wrapper}>
                        <h2 className={classes.signup_title}>Регистрация</h2>

                        <div className={classes.signup_block}>
                            <label className={classes.label}>Имя</label>
                            <div className={classes.input_wrapper}>
                                <input
                                    type="text"
                                    name="name"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    maxLength={20}
                                    placeholder='Артур'
                                    value={name}
                                    onBlur={e => blurHandler(e)}
                                    onChange={nameHandler}
                                    className={`${nameError && nameDirty ? classes.input_error : ''}`}
                                />
                            </div>
                            <div
                                className={`${classes.error} ${nameError && nameDirty && classes.visible}`}>{nameError}</div>
                        </div>

                        <div className={classes.signup_block}>
                            <label className={classes.label}>Электронная почта</label>
                            <div className={classes.input_wrapper}>
                                <input
                                    type="text"
                                    name="email"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    maxLength={30}
                                    placeholder='example@mail.ru'
                                    value={email}
                                    onBlur={e => blurHandler(e)}
                                    onChange={emailHandler}
                                    className={`${emailError && emailDirty ? classes.input_error : ''}`}
                                />
                            </div>
                            <div
                                className={`${classes.error} ${emailError && emailDirty && classes.visible}`}>{emailError}</div>
                        </div>

                        <div className={classes.signup_block}>
                            <label className={classes.label}>Пароль</label>
                            <div className={classes.input_wrapper}>
                                <input
                                    type={inputPasswordType}
                                    name="password"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    maxLength={30}
                                    placeholder='******'
                                    value={password}
                                    onBlur={e => blurHandler(e)}
                                    onChange={passwordHandler}
                                    className={`${passwordError && passwordDirty ? classes.input_error : ''}`}
                                />

                                {inputPasswordType === 'text'

                                    ? <FaRegEyeSlash className={classes.eye} onClick={() => inputPasswordTypeHandler('password')}/>
                                    : <FaRegEye className={classes.eye} onClick={() => inputPasswordTypeHandler('text')}/>
                                }

                            </div>
                            <div
                                className={`${classes.error} ${passwordError && passwordDirty && classes.visible}`}>{passwordError}</div>
                        </div>

                        <div className={classes.signup_block}>
                            <label className={classes.label}>Подтвердите пароль</label>
                            <div className={classes.input_wrapper}>
                                <input
                                    type={inputPasswordVerifyType}
                                    name="passwordVerify"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    maxLength={30}
                                    placeholder='******'
                                    value={passwordVerify}
                                    onBlur={e => blurHandler(e)}
                                    onChange={passwordVerifyHandler}
                                    className={`${passwordVerifyError && passwordVerifyDirty ? classes.input_error : ''}`}
                                />

                                {inputPasswordVerifyType === 'text'

                                    ? <FaRegEyeSlash className={classes.eye} onClick={() => inputPasswordVerifyTypeHandler('password')}/>
                                    : <FaRegEye className={classes.eye} onClick={() => inputPasswordVerifyTypeHandler('text')}/>
                                }

                            </div>
                            <div
                                className={`${classes.error} ${passwordVerifyError && passwordVerifyDirty && classes.visible}`}>{passwordVerifyError}</div>
                        </div>

                    </div>

                    <div className={classes.buttons_block}>
                        <button
                            className={!activeForm ? classes.disabled : ''} disabled={!activeForm}
                            onClick={registrationHandler}>Зарегистрироваться
                        </button>
                        <button onClick={() => navigateHandler('/login')}>Уже есть аккаунт</button>
                    </div>
                    {popUpActive &&
                        <div className={classes.popup_error}>
                            <PopUp errorMsg={errorMsg} setErrorMsg={setErrorMsg} setPopUpActive={setPopUpActive}/>
                        </div>
                    }
                </div>
            )}
        </Layout>
    );
};

export default SignUp;



