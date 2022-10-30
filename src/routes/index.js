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
import UserProfile from '~/pages/userprofile/userprofile';
import { LayoutLogin, AdminLayout, ManagerLayout } from '~/components/Layout';
import BillManager from '~/manager/BillManager';
import BrandManager from '~/manager/BrandManager';
import CategoriesManager from '~/manager/CategoriesManager';
import HomeManager from '~/manager/Home';
import InventoriesManager from '~/manager/InventoriesManager';
import LoginManager from '~/manager/Login';
import ProductManager from '~/manager/ProductManager';
import PurchaseorderManager from '~/manager/PurchaseOrderManager';
import SalecodeManager from '~/manager/SaleCodeManager';
import SupplierManager from '~/manager/SupplierManager';
import RolesAdmin from '~/admin/RolesAdmin'
import Payment from '~/pages/payment/payment';


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: LayoutLogin },
    { path: '/signup', component: Signup, layout: LayoutLogin },
    { path: '/forgotpassword', component: Forgotpassword, layout: LayoutLogin },
    { path: '/request-OTP', component: rqotb, layout: LayoutLogin },
    { path: '/password-reset/:uid/:token', component: changePassword, layout: LayoutLogin },
    { path: '/productdetail', component: productDetail, layout: null },
    { path: '/Payment', component: Payment, layout: null },
    { path: '/LoginAdmin', component: loginAdmin, layout: null },
    { path: '/HomeAdmin', component: homeAdmin, layout: AdminLayout },
    { path: '/UserAdmin', component: userAdmin, layout: AdminLayout },
    { path: '/RolesAdmin', component: RolesAdmin, layout: AdminLayout },
    { path: '/Cart', component: cart, layout: null },
    { path: '/Profile', component: UserProfile, layout: null },
    { path: '/BillManager', component: BillManager, layout: ManagerLayout },
    { path: '/BrandManager', component: BrandManager, layout: ManagerLayout },
    { path: '/CategoriesManager', component: CategoriesManager, layout: ManagerLayout },
    { path: '/HomeManager', component: HomeManager, layout: ManagerLayout },
    { path: '/InventoriesManager', component: InventoriesManager, layout: ManagerLayout },
    { path: '/LoginManager', component: LoginManager, layout: null },
    { path: '/ProductManager', component: ProductManager, layout: ManagerLayout },
    { path: '/PurchaseOrderManager', component: PurchaseorderManager, layout: ManagerLayout },
    { path: '/SaleCodeManager', component: SalecodeManager, layout: ManagerLayout },
    { path: '/SupplierManager', component: SupplierManager, layout: ManagerLayout },
]

const privateRoutes = [
    {}
]

export { privateRoutes, publicRoutes };
