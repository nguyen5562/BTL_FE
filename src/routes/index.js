import TypeProductPage from '../pages/TypeProduct/TypeProductPage'
import HomePage from '../pages/HomePage/HomePage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductsPage from '../pages/ProductsPage/ProductsPage'
import ProductDetailPage from '../pages/ProductDetails/ProductDetailPage'
import SignInPage from '../pages/SignIn/SignInPage'
import SignUpPage from '../pages/SignUp/SignUpPage'
import AdminPage from '../pages/AdminPage/AdminPage'
import MyOrderPage from '../pages/MyOrder/MyOrderPage'

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/product-detail/:id',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    },
    {
        path: '/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true
    }
]