import Home from '~/pages/Home';

import { router as routerConfig } from '~/config/config';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Profile from '~/pages/Profile';
import CreateProduct from '~/pages/CreateProduct';
import EditProfile from '~/pages/EditProfile';
import AllProduct from '~/pages/AllProduct';
import ProductDetail from '~/pages/ProductDetail';
import AllUser from '~/pages/AllUser';
import UpdateUserAdmin from '~/pages/UpdateUserAdmin/UpdateUserAdmin';
import CreateUserAdmin from '~/pages/CreateUserAdmin/CreateUserAdmin';
import CreateShipment from '~/pages/CreateShipment/CreateShipment';
import AllShipment from '~/pages/AllShipment/AllShipment';
import EditShipment from '~/pages/EditShipment/EditShipment';
import DriveShipment from '~/pages/DriverShipment/DriverShipment';
import UpdateStatusShipmen from '~/pages/UpdateStatusShipment/UpdateStatusShipment';

const publicRoutes = [
    { path: routerConfig.login, component: Login, layout: null },
    { path: routerConfig.register, component: Register, layout: null },
];
const privateRoutes = [
    { path: routerConfig.home, component: Home },
    { path: routerConfig.search, component: Home },
    { path: routerConfig.login, component: Login, layout: null },
    { path: routerConfig.register, component: Register, layout: null },
    { path: routerConfig.profile, component: Profile },
    { path: routerConfig.createProduct, component: CreateProduct },
    { path: routerConfig.editProfile, component: EditProfile },
    { path: routerConfig.productDetail, component: ProductDetail },
    { path: routerConfig.allProduct, component: AllProduct },
    { path: routerConfig.listUser, component: AllUser },
    { path: routerConfig.createUser, component: CreateUserAdmin },
    { path: routerConfig.updateUserAdmin, component: UpdateUserAdmin },
    { path: routerConfig.createShipment, component: CreateShipment },
    { path: routerConfig.listShipment, component: AllShipment },
    { path: routerConfig.updateShipment, component: EditShipment },
    { path: routerConfig.driverUserId, component:  DriveShipment},
    { path: routerConfig.driverUpdate, component:  UpdateStatusShipmen},
];
export { publicRoutes, privateRoutes };
