import { useNavigate } from 'react-router-dom';

let navigate;

export const NavigationProvider = ({ children }) => {
    navigate = useNavigate();
    return children;
};

export const navigateTo = (path) => {
    if (navigate) {
        navigate(path);
    } else {
        console.error('Navigate function is not initialized');
    }
};