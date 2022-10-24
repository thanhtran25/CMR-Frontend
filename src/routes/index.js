import Home from '~/pages/Home';
import Login from '~/pages/auth/login';
import Signup from '~/pages/auth/signup';
import Forgotpassword from '~/pages/auth/forgotaccount/forgotPassword';



const publicRoutes = [
    { path: '/', component: Home },

]

const privateRoutes = [
    {}
]

export { privateRoutes, publicRoutes };
