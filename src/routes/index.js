import Home from '~/pages/Home';
import Login from '~/pages/auth/login/login';
import Signup from '~/pages/auth/signup/signup';
import Forgotpassword from '~/pages/auth/forgotaccount/forgotPassword';
import changePassword from '~/pages/auth/forgotaccount/changePassowrd'
import productDetail from '~/pages/product/productDetail';
import loginAdmin from '~/admin/Login';
import userAdmin from '~/admin/UserAdmin';
import cart from '~/pages/cart/cart';
import UserProfile from '~/pages/userprofile/userprofile';
import { LayoutLogin, AdminLayout, ManagerLayout } from '~/components/Layout';
import BillManager from '~/manager/BillManager';
import BrandManager from '~/manager/BrandManager';
import CategoriesManager from '~/manager/CategoriesManager';
import InventoriesManager from '~/manager/InventoriesManager';
import LoginManager from '~/manager/Login';
import ProductManager from '~/manager/ProductManager';
import PurchaseorderManager from '~/manager/PurchaseOrderManager';
import SalecodeManager from '~/manager/SaleCodeManager';
import SupplierManager from '~/manager/SupplierManager';
import StatisticManager from '~/manager/StatisticManager';
import Shipper from '~/manager/Shipper';
import ShipperNew from '~/manager/ShipperNew';
import RolesAdmin from '~/admin/RolesAdmin'
import Payment from '~/pages/payment/payment';
import ProductBody from '~/pages/product/productbody';
import Contact from '~/pages/contact/contact';
import Guarantee from '~/pages/guarantee/guarantee';
import cookies from 'react-cookies';
import RequestOTP from '~/pages/auth/signup/requestOTP';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: LayoutLogin },
    { path: '/signup', component: Signup, layout: LayoutLogin },
    { path: '/forgotpassword', component: Forgotpassword, layout: LayoutLogin },
    { path: '/password-reset/:uid/:token', component: changePassword, layout: LayoutLogin },
    { path: '/Payment', component: Payment, layout: LayoutLogin },
    { path: '/Cart', component: cart, layout: LayoutLogin },
    { path: '/admin/login', component: loginAdmin, layout: null },
    { path: '/store/login', component: LoginManager, layout: null },
    { path: '/product/:id', component: productDetail, layout: LayoutLogin },
    { path: '/products', component: ProductBody, layout: LayoutLogin },
    { path: '/contact', component: Contact, layout: LayoutLogin },
    { path: '/guarantee', component: Guarantee, layout: LayoutLogin },
    { path: '/signup/otp/:emailurl', component: RequestOTP, layout: LayoutLogin },
    { path: '*' },
]

const privateRoutesA = [
    { path: '/admin/user', component: userAdmin, layout: AdminLayout },
    { path: '/admin/role', component: RolesAdmin, layout: AdminLayout },
    { path: '*', component: Home },
]

const privateRoutesM = [
    { path: '/store/bill', component: BillManager, layout: ManagerLayout },
    { path: '/store/brand', component: BrandManager, layout: ManagerLayout },
    { path: '/store/categories', component: CategoriesManager, layout: ManagerLayout },
    { path: '/store/inventories', component: InventoriesManager, layout: ManagerLayout },
    { path: '/store/product', component: ProductManager, layout: ManagerLayout },
    { path: '/store/purchase', component: PurchaseorderManager, layout: ManagerLayout },
    { path: '/store/salecode', component: SalecodeManager, layout: ManagerLayout },
    { path: '/store/supplier', component: SupplierManager, layout: ManagerLayout },
    { path: '/store/shipper', component: Shipper, layout: ManagerLayout },
    { path: '/store/shippernew', component: ShipperNew, layout: ManagerLayout },
    { path: '/store/statistic', component: StatisticManager, layout: ManagerLayout },
    { path: '*', component: Home },
]

const privateRoutesU = [
    { path: '/', component: Home },
    { path: '/Profile', component: UserProfile, layout: LayoutLogin },
    { path: '/productdetail', component: productDetail, layout: LayoutLogin },
    { path: '/Payment', component: Payment, layout: LayoutLogin },
    { path: '/Cart', component: cart, layout: LayoutLogin },
    { path: '/product/:id', component: productDetail, layout: LayoutLogin },
    { path: '/products', component: ProductBody, layout: LayoutLogin },
    { path: '/contact', component: Contact, layout: LayoutLogin },
    { path: '/guarantee', component: Guarantee, layout: LayoutLogin },
    { path: '*', component: Home },
]

const xulyRoutes = () => {
    if (cookies.load('user')) {
        if (cookies.load('user').role === 'admin') {
            return privateRoutesA;
        } else if (cookies.load('user').role === 'manager') {
            return privateRoutesM;
        } else if (cookies.load('user').role === 'customer') {
            return privateRoutesU;
        }
    } else {
        return publicRoutes;
    }
}

const privateRoutes = () => {
    return xulyRoutes();
}

export { xulyRoutes, publicRoutes, privateRoutes };
