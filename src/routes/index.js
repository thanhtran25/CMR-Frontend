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
import billManager from '~/manager/BillManager';
import brandManager from '~/manager/BrandManager';
import categoriesManager from '~/manager/CategoriesManager';
import homeManager from '~/manager/Home';
import insurancesManager from '~/manager/InsurancesManager';
import inventoriesManager from '~/manager/InventoriesManager';
import loginManager from '~/manager/Login';
import productManager from '~/manager/ProductManager';
import purchaseorderManager from '~/manager/PurchaseOrderManager';
import salecodeManager from '~/manager/SaleCodeManager';
import supplierManager from '~/manager/SupplierManager';


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
    { path: '/Profile', component: UserProfile, layout: null },
    { path: '/BillManager', component: billManager, layout: ManagerLayout },
    { path: '/BrandManager', component: brandManager, layout: ManagerLayout },
    { path: '/CategoriesManager', component: categoriesManager, layout: ManagerLayout },
    { path: '/HomeManager', component: homeManager, layout: ManagerLayout },
    { path: '/InsurancesManager', component: insurancesManager, layout: ManagerLayout },
    { path: '/InventoriesManager', component: inventoriesManager, layout: ManagerLayout },
    { path: '/Login', component: loginManager, layout: ManagerLayout },
    { path: '/ProductManager', component: productManager, layout: ManagerLayout },
    { path: '/PurchaseOrderManager', component: purchaseorderManager, layout: ManagerLayout },
    { path: '/SaleCodeManager', component: salecodeManager, layout: ManagerLayout },
    { path: '/SupplierManager', component: supplierManager, layout: ManagerLayout },
]

const privateRoutes = [
    {}
]

export { privateRoutes, publicRoutes };
