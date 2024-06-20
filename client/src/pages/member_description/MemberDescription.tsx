import React, {useContext, useState} from 'react';
import {AuthContext} from '@/components/context';
import classes from './MemberDescription.module.scss';
import axios from 'axios';
import {useNavigateHandler} from '@/utils/useCustomNavigate';
import {useMediaQuery} from 'react-responsive';
import Loader from '@/components/loader/Loader';
import {useParams} from "react-router-dom";
import photo_1 from "@/assets/photo_1.png";
import photo_2 from "@/assets/photo_2.png";
import photo_3 from "@/assets/photo_3.png";
import photo_4 from "@/assets/photo_4.png";
import photo_5 from "@/assets/photo_5.png";
import photo_6 from "@/assets/photo_6.png";
import photo_7 from "@/assets/photo_7.png";
import photo_8 from "@/assets/photo_8.png";
import Vector from '@/assets/Vector.png';
import Vector2 from '@/assets/Vector2.png';
import Vector3 from '@/assets/Vector3.png';
import Vector4 from '@/assets/Vector4.png';
import {IMember} from "@/types/imember";

const photos: { [key: string]: string } = {
    'photo_1': photo_1,
    'photo_2': photo_2,
    'photo_3': photo_3,
    'photo_4': photo_4,
    'photo_5': photo_5,
    'photo_6': photo_6,
    'photo_7': photo_7,
    'photo_8': photo_8,
};

const MemberDescription: React.FC = () => {
    const {isAuth, setIsAuth, isLoading, setLoading, member, setMember} = useContext(AuthContext);
    const navigateHandler = useNavigateHandler();
    const {name} = useParams<{ name: string }>();
    const isMobile = useMediaQuery({maxWidth: 376});




    const backHandler = () => {
        setMember(null);
        setLoading(true);
        navigateHandler('/main');
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    };

    const logoutHandler = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.removeItem('token');
            setIsAuth(false);
            setLoading(false);
            navigateHandler('/home');
        }, 1500);
    };

    return (
        <>
            {isLoading ? (
                <div className={classes.loader_block}>
                    <div className={classes.loader}>
                        <Loader height={'65'} width={'65'} color="white"/>
                    </div>
                </div>
            ) : (
                <div className={classes.member_description}>
                    <div className={classes.member_description_header_block}>

                        <div className={classes.buttons_block}>
                            <div className={classes.button_wrapper} onClick={backHandler}>
                                {isMobile
                                    ? <img
                                        src={Vector2}
                                        alt="button"
                                        width="18"
                                        loading="lazy"
                                        draggable="false"
                                        className={classes.back_button}
                                        onClick={backHandler}
                                    />

                                    : <button className={classes.back_button} onClick={backHandler}>Назад</button>

                                }

                            </div>

                            <div className={classes.button_wrapper}
                                 onClick={logoutHandler}
                            >
                                {isMobile
                                    ? <img
                                        src={Vector}
                                        alt="button"
                                        width="18"
                                        loading="lazy"
                                        draggable="false"
                                        className={classes.back_button}
                                        onClick={logoutHandler}
                                    />


                                    : <button className={classes.logout_button} onClick={logoutHandler}>Выход</button>
                                }
                            </div>
                        </div>

                        <div className={classes.member_info}>
                            <img
                                alt='member_img'
                                draggable='false'
                                src={photos[member.photoNumber]}
                                className={classes.member_img}
                            />

                            <div className={classes.heading_wrapper}>
                                <h1 className={classes.heading}>{member.name}</h1>
                                <h2 className={classes.heading2}>Партнер</h2>
                            </div>
                        </div>
                    </div>


                    <div className={classes.member_title_and_phone_wrapper}>
                        <div className={classes.title_block}>
                            {member.description.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br/>
                                </React.Fragment>
                            ))}
                        </div>

                        <div className={classes.phone_block}>
                            <div className={classes.phone_wrapper}>
                                <img
                                    alt='phone_img'
                                    draggable='false'
                                    src={Vector3}
                                    className={classes.phone_img}
                                />
                                <span className={classes.phone}>{member.phoneNumber}</span>
                            </div>

                            <div className={classes.email_wrapper}>
                                <img
                                    alt='email_img'
                                    draggable='false'
                                    src={Vector4}
                                    className={classes.email_img}
                                />
                                <span className={classes.email}>{member.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MemberDescription;
