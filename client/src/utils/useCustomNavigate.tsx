import { useNavigate } from "react-router-dom";

export const useNavigateHandler = () => {
    const navigate = useNavigate();

    const navigateHandler = (url: string) => {
        navigate(url);
    };

    return navigateHandler;
};
