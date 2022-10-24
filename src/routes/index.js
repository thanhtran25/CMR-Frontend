import Home from '~/pages/Home';
import Login from '~/pages/auth/login';
import Signup from '~/pages/auth/signup';
import Forgotpassword from '~/pages/auth/forgotaccount/forgotPassword';
import rqotb from '~/pages/auth/forgotaccount/rqOtb';
import changePassword from '~/pages/auth/forgotaccount/changePassowrd';
import loginAdmin from '~/admin/Login';
import homeAdmin from '~/admin/Home';
import userAdmin from '~/admin/UserAdmin';
import { LayoutLogin } from '~/components/Layout';


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: LayoutLogin },
    { path: '/signup', component: Signup, layout: LayoutLogin },
    { path: '/forgotpassword', component: Forgotpassword, layout: LayoutLogin },
    { path: '/request-OTP', component: rqotb, layout: LayoutLogin },
    { path: '/changePassword', component: changePassword, layout: LayoutLogin },
    { path: '/LoginAdmin', component: loginAdmin, layout: null },
    { path: '/HomeAdmin', component: homeAdmin, layout: null },
    { path: '/UserAdmin', component: userAdmin, layout: null },
]

const privateRoutes = [
    {}
]

export { privateRoutes, publicRoutes };