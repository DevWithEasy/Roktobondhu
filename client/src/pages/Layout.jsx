import { Outlet } from 'react-router-dom';
import Header from '../component/Header';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
    return (
        <div

        >
            <Header/>
            <Outlet/>
            <Toaster />
        </div>
    );
};

export default Layout;