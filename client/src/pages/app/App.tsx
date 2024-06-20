import React, {Suspense, useContext, useEffect, useState} from 'react';
import '@/index.scss'
import classes from './App.module.scss';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import {AuthContext} from '@/components/context';
import Loader from '@/components/loader/Loader';
import Main from "@/pages/main/Main";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import SignUp from "@/pages/signup/SignUp";
import MemberDescription from "@/pages/member_description/MemberDescription";




const privateRoutes = [
    {path: '/main', element: <Main/>},
    {path: '/member/:name', element: <MemberDescription/>},
];

const publicRoutes = [
    {path: '/', element: <Home/>},
    {path: '/home', element: <Home/>},
    {path: '/login', element: <Login/>},
    {path: '/signup', element: <SignUp/>},
];

const App = () => {
    const {isAuth,setIsAuth} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const loadTimer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        const loaderTimer = setTimeout(() => {
            setShowLoader(false);
        }, 500);

        return () => {
            clearTimeout(loadTimer);
            clearTimeout(loaderTimer);
        };
    }, []);

    useEffect(() => {
      if (token) {
          setIsAuth(true);
          navigate('/main')
      }
      else {
          setIsAuth(false);
      }
        console.log('token', token)
    }, [setIsAuth]);

    return (
        <Suspense fallback={<div className={classes.loader}>
            <div className={classes.loader_block}>
                <Loader height={'65'} width={'65'} color="white"/>
            </div>
        </div>}>
            {showLoader ? (
                <div className={classes.loader}>
                    <div className={classes.loader_block}>
                        <Loader height={'65'} width={'65'} color="white"/>
                    </div>
                </div>
            ) : (
                <Routes>
                    {privateRoutes.map(({path, element}) => (
                        <Route
                            key={path}
                            path={path}
                            element={isAuth ? element : <Navigate to="/home" replace/>}
                        />
                    ))}
                    {publicRoutes.map(({path, element}) => (
                        <Route key={path} path={path} element={element}/>
                    ))}
                </Routes>
            )}
        </Suspense>
    );
};
export default App;
