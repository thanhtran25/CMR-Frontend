import Home from '~/pages/Home';
import Login from '~/pages/auth/login/login';
import Signup from '~/pages/auth/signup/signup';
import Forgotpassword from '~/pages/auth/forgotaccount/forgotPassword';
import rqotb from '~/pages/auth/forgotaccount/rqOtb'
import changePassword from '~/pages/auth/forgotaccount/changePassowrd'
import productDetail from '~/pages/product/productDetail';
import loginAdmin from '~/admin/Login';
import homeAdmin from '~/admin/Home';
import userAdmin from '~/admin/UserAdmin';
import cart from '~/pages/cart/cart';
import { LayoutLogin, AdminLayout } from '~/components/Layout';


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: LayoutLogin },
    { path: '/signup', component: Signup, layout: LayoutLogin },
    { path: '/forgotpassword', component: Forgotpassword, layout: LayoutLogin },
    { path: '/request-OTP', component: rqotb, layout: LayoutLogin },
    { path: '/password-reset/:uid/:token', component: changePassword, layout: LayoutLogin },
    { path: '/productdetail', component: productDetail, layout: null },
    { path: '/LoginAdmin', component: loginAdmin, layout: null },
    { path: '/HomeAdmin', component: homeAdmin, layout: AdminLayout },
    { path: '/UserAdmin', component: userAdmin, layout: AdminLayout },
    { path: '/Cart', component: cart, layout: null },
]

const privateRoutes = [
    {}
]

export { privateRoutes, publicRoutes };
