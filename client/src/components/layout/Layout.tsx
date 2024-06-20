import React, { ReactNode} from 'react';
import classes from './Layout.module.scss';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={classes.container}>
                {children}
        </div>
    );
};

export default Layout;
