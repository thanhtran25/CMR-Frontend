import Home from '~/pages/Home';
import Login from '~/pages/auth/login/login';
import Signup from '~/pages/auth/signup/signup';
import Forgotpassword from '~/pages/auth/forgotaccount/forgotPassword';
import rqotb from '~/pages/auth/forgotaccount/rqOtb'
import changePassword from '~/pages/auth/forgotaccount/changePassowrd'
import productDetail from '~/pages/product/productDetail';


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
    { path: '/signup', component: Signup, layout: null },
    { path: '/forgotpassword', component: Forgotpassword, layout: null },
    { path: '/request-OTP', component: rqotb, layout: null },
    { path: '/changePassword', component: changePassword, layout: null },
    { path: 'productdetail', component: productDetail, layout: null },
]

const privateRoutes = [

]

export { privateRoutes, publicRoutes };