import React, { useContext } from 'react';
import classes from './Member.module.scss';
import { IMember } from '@/types/imember';
import photo_1 from '@/assets/photo_1.png';
import photo_2 from '@/assets/photo_2.png';
import photo_3 from '@/assets/photo_3.png';
import photo_4 from '@/assets/photo_4.png';
import photo_5 from '@/assets/photo_5.png';
import photo_6 from '@/assets/photo_6.png';
import photo_7 from '@/assets/photo_7.png';
import photo_8 from '@/assets/photo_8.png';
import Like1 from '@/assets/like1.png';
import Like2 from '@/assets/like2.png';
import { AuthContext } from '@/components/context';
import { useNavigateHandler } from '@/utils/useCustomNavigate';
import axios from 'axios';

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

interface MemberProps {
    memberItem: IMember;
    updateLikeStatus: (updatedMember: IMember) => void;
}

const Member: React.FC<MemberProps> = ({ memberItem, updateLikeStatus }) => {
    const {isLoading, setLoading, member, setMember} = useContext(AuthContext);
    const navigateHandler = useNavigateHandler();

    const handleClick = (member: IMember) => {
        setMember(member)
        navigateHandler(`/member/${member.name}`);
    };

    const addLikeAction = async (email: string, likeStatus: boolean) => {

        try {
            const body = {
                email: email,
                like: likeStatus
            };
            const response = await axios.patch('http://localhost:5000/members', body);
            if (response.data.success) {
                updateLikeStatus(response.data.member);
            }
            return response
        } catch (error: any) {
            console.log(error);
        }
    };

    const imgHandleClick = async (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const likeStatus = event.currentTarget.getAttribute('data-like') === 'true';
        console.log('likeStatus', likeStatus);
        await addLikeAction(memberItem.email, likeStatus);
    };

    return (
        <div className={classes.member}>
            <div className={classes.member_wrapper}>
                <img
                    alt='member_img'
                    draggable='false'
                    src={photos[memberItem.photoNumber]}
                    onClick={() => handleClick(memberItem)}
                    className={classes.member_img}
                />
                <h2 className={classes.member_name}>{memberItem.name}</h2>
            </div>

            <div className={classes.member_like_block}>
                <img
                    src={memberItem.like ? Like2 : Like1}
                    alt='like_icon'
                    draggable='false'
                    data-like={!memberItem.like}
                    className={classes.member_like}
                    onClick={imgHandleClick}
                />
            </div>
        </div>
    );
};

export default Member;
