import React from 'react';
import classes from './PopUp.module.scss';
import { IoIosCloseCircleOutline } from "react-icons/io";
import NotConnected from "@/components/notconnected/NotConnected";


interface PopUpProps {
    errorMsg: string;
    setErrorMsg: (value: string) => void;
    setPopUpActive: (value: boolean) => void;
}

const PopUp: React.FC<PopUpProps> = ({ setPopUpActive, errorMsg, setErrorMsg }) => {
    const popUpHandler = () => {
        setPopUpActive(false);
        setErrorMsg('');
    }

    return (
        <div className={classes.popup}>
            {errorMsg === 'Not Connected' ? (
                <NotConnected popUpHandler={popUpHandler}/>
            ) : (
                <>
                    <IoIosCloseCircleOutline size={20} className={classes.close} onClick={popUpHandler} />
                    <span className={classes.title}>{errorMsg}</span>
                </>
            )}
        </div>
    );
};

export default PopUp;
