import React, {useContext, useEffect, useState} from 'react';
import classes from './Main.module.scss';
import {AuthContext} from '@/components/context';
import axios from 'axios';
import {useNavigateHandler} from '@/utils/useCustomNavigate';
import {useMediaQuery} from 'react-responsive';
import Loader from '@/components/loader/Loader';
import Member from '@/components/member/Member';
import Frame from '@/assets/Frame.png';
import Vector from '@/assets/Vector.png';
import {IMember} from "@/types/imember";

const Main: React.FC = () => {
    const {isAuth, setIsAuth, isLoading, setLoading} = useContext(AuthContext);
    const navigateHandler = useNavigateHandler();
    const [data, setData] = useState<IMember[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(8);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const isMobile = useMediaQuery({maxWidth: 376});

    const logoutHandler = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.removeItem('token');
            setIsAuth(false);
            setLoading(false);
            navigateHandler('/home');
        }, 1500);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/members/get');
                if (response.data.success) {
                    setData(response.data.albums);
                    setErrorMsg('');
                }
                console.log('data', response.data.albums);
            } catch (error: any) {
                console.log(error);
                setErrorMsg(error.message);
            }
        };
        fetchData();
    }, []);

    const showMoreHandler = () => {
        if (visibleCount + 8 >= data.length) {
            setVisibleCount(8);
        } else {
            setVisibleCount(prevCount => prevCount + 8);
        }
    };

    const updateLikeStatus = (updatedMember: IMember) => {
        setData((prevData) =>
            prevData.map((member) =>
                member.email === updatedMember.email ? updatedMember : member
            )
        );
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
                <div className={classes.main}>
                    <div className={classes.main_header_block}>
                        <div className={classes.logout_button_wrapper} onClick={logoutHandler}>
                            {isMobile ? (
                                <img
                                    src={Vector}
                                    alt="button"
                                    width="18"
                                    loading="lazy"
                                    draggable="false"
                                    className={classes.logout_button2}
                                />
                            ) : (
                                <button className={classes.logout_button}>Выход</button>
                            )}
                        </div>
                        <div className={classes.main_header_block_wrapper}>
                            <h1 className={classes.main_header_heading}>Наша команда</h1>
                            <h2 className={classes.main_header_heading2}>
                                Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их
                                плечи,
                                и умеющие находить выход из любых, даже самых сложных ситуаций.
                            </h2>
                        </div>
                    </div>
                    <div className={classes.users_container}>
                        {data.length > 0 ? (
                            data.slice(0, visibleCount).map((memberItem: IMember) => (
                                <div key={memberItem.name} className={classes.users_wrapper}>
                                    <Member memberItem={memberItem} updateLikeStatus={updateLikeStatus}/>
                                </div>
                            ))
                        ) : (
                            <p>Data not found</p>
                        )}
                        {errorMsg && <p className={classes.error}>{errorMsg}</p>}
                    </div>

                    <div className={classes.show_more_wrapper}>
                        <button className={classes.show_more_button} onClick={showMoreHandler}>
                            {visibleCount + 8 >= data.length ? 'Скрыть' : 'Показать еще.'}
                        </button>
                        <img src={Frame} alt="button" onClick={showMoreHandler}/>
                    </div>

                </div>
            )}
        </>
    );
};

export default Main;
