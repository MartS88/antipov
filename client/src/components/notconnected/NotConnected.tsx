import React from 'react';
import classes from './NotConnected.module.scss';
import {RiSignalWifiErrorFill} from 'react-icons/ri';
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface NotConnectedProps {
    popUpHandler: () => void;
}

const NotConnected: React.FC<NotConnectedProps> = ({popUpHandler}) => {
    return (
        <div className={classes.not_connected}>
            <IoIosCloseCircleOutline size={20} className={classes.close} onClick={popUpHandler}/>
            <RiSignalWifiErrorFill size={30}/>
            <h1>There is no Internet connection</h1>
            <ul>
                <li>Checking the network cables, modem , and router</li>
                <li>Reconnecting to Wi-Fi</li>
                <li>Running Connectivity Diagnostics</li>
            </ul>
            <p>ERR_INTERNET_DISCONNECTED</p>
        </div>
    );
};

export default NotConnected;
