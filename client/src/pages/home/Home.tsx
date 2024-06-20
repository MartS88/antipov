import React from 'react';
import classes from './Home.module.scss';
import Layout from "@/components/layout/Layout";
import SignUp from "@/pages/signup/SignUp";


const Home = () => {



    return (
        <Layout>
            <div className={classes.home}>
               <SignUp/>
            </div>

        </Layout>
    )
        ;
};

export default Home;