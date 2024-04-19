import { Box, Stack, Typography, useTheme } from '@mui/material';
import { ClipboardText, House, Plus, SignOut, User } from 'phosphor-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { router as configRouter } from '~/config/config';
import { useRef } from 'react';
import images from '~/assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/features/auth/authSlice';
function Sidebar() {
    const theme = useTheme();
    const location = useLocation();
    const ref = useRef();
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRedirectLogin = () => {
        dispatch(logout());
        Navigate('/login');
    };

    const currentUser = useSelector((state) => state.auth.currentUser);

    return (
        <Box sx={{ position: 'sticky', top: '0px', zIndex: 1000 }} ref={ref}>
            <Stack direction="row" sx={{ width: '100%' }}>
                <Stack
                    direction={'column'}
                    spacing={2}
                    overflow="hidden"
                    sx={{
                        transition: '0.1s linear',
                        borderRight: '1px solid',
                        borderColor: theme.palette.grey[300],
                        height: '100vh',
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    <Stack
                        direction={'row'}
                        width="100%"
                        height="50px"
                        p={1}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <img src={images.logo} alt="logo" style={{ width: '70px', height: '70px' }} />
                    </Stack>
                    {(currentUser?.data?.role === 'CUSTOMER' || currentUser?.data?.role === null) && (
                        <Stack direction={'column'} width="100%" p={1} spacing={2}>
                            {/* home */}
                            {/* <Stack
                            direction={'row'}
                            p={'10px 10px'}
                            alignItems="center"
                            justifyContent="flex-start"
                            width="100%"
                            sx={{
                                '&:hover': {
                                    background: theme.palette.grey[300],
                                    borderRadius: '15px',
                                },
                                background:
                                    location.pathname === configRouter.home
                                        ? theme.palette.grey[300]
                                        : 'transparent',
                                borderRadius: '15px',
                            }}
                            spacing={3}
                            component={Link}
                            to={configRouter.home}
                        >
                            {location.pathname === configRouter.home ? (
                                <>
                                    <House size={24} weight="fill" />
                                    <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                        Trang chủ
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <House size={24} weight="regular" />
                                    <Typography variant="body1" fontWeight="300">
                                        Trang chủ
                                    </Typography>
                                </>
                            )}
                        </Stack> */}

                            {/* Product */}
                            <Stack
                                direction={'row'}
                                p={'10px 10px'}
                                alignItems="center"
                                justifyContent="flex-start"
                                width="100%"
                                sx={{
                                    '&:hover': {
                                        background: theme.palette.grey[300],
                                        borderRadius: '15px',
                                    },
                                    background:
                                        location.pathname === configRouter.allProduct
                                            ? theme.palette.grey[300]
                                            : 'transparent',
                                    borderRadius: '15px',
                                }}
                                component={Link}
                                to={configRouter.allProduct}
                                spacing={3}
                            >
                                {location.pathname === configRouter.allProduct ? (
                                    <>
                                        <ClipboardText size={24} weight="fill" />
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Tất cả sản phẩm
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <ClipboardText size={24} weight="regular" />
                                        <Typography variant="body1" fontWeight="300">
                                            Tất cả sản phẩm
                                        </Typography>
                                    </>
                                )}
                            </Stack>

                            {/* Shipment */}
                            <Stack
                                direction={'row'}
                                p={'10px 10px'}
                                alignItems="center"
                                justifyContent="flex-start"
                                width="100%"
                                sx={{
                                    '&:hover': {
                                        background: theme.palette.grey[300],
                                        borderRadius: '15px',
                                    },
                                    background:
                                        location.pathname === configRouter.listShipment
                                            ? theme.palette.grey[300]
                                            : 'transparent',
                                    borderRadius: '15px',
                                }}
                                component={Link}
                                to={configRouter.listShipment}
                                spacing={3}
                            >
                                {location.pathname === configRouter.listShipment ? (
                                    <>
                                        <ClipboardText size={24} weight="fill" />
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Danh sách vận đơn
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <ClipboardText size={24} weight="regular" />
                                        <Typography variant="body1" fontWeight="300">
                                            Dach sách vận đơn
                                        </Typography>
                                    </>
                                )}
                            </Stack>

                            {/* Create */}
                            <Stack
                                direction={'row'}
                                p={'10px 10px'}
                                alignItems="center"
                                justifyContent="flex-start"
                                width="100%"
                                sx={{
                                    '&:hover': {
                                        background: theme.palette.grey[300],
                                        borderRadius: '15px',
                                    },
                                    background:
                                        location.pathname === configRouter.createProduct
                                            ? theme.palette.grey[300]
                                            : 'transparent',
                                    borderRadius: '15px',
                                }}
                                component={Link}
                                to={configRouter.createProduct}
                                spacing={3}
                            >
                                {location.pathname === configRouter.createProduct ? (
                                    <>
                                        <Plus size={24} weight="fill" />
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Tạo mới sản phẩm
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Plus size={24} weight="regular" />
                                        <Typography variant="body1" fontWeight="300">
                                            Tạo mới sản phẩm
                                        </Typography>
                                    </>
                                )}
                            </Stack>

                            {/* Profile */}
                            <Stack
                                direction={'row'}
                                p={'10px 10px'}
                                alignItems="center"
                                justifyContent="flex-start"
                                width="100%"
                                sx={{
                                    '&:hover': {
                                        background: theme.palette.grey[300],
                                        borderRadius: '15px',
                                    },
                                    background:
                                        location.pathname === configRouter.profile
                                            ? theme.palette.grey[300]
                                            : 'transparent',
                                    borderRadius: '15px',
                                }}
                                component={Link}
                                to={configRouter.profile}
                                spacing={3}
                            >
                                {location.pathname === configRouter.profile ? (
                                    <>
                                        <User size={24} weight="fill" />
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Thông tin cá nhân
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <User size={24} weight="regular" />
                                        <Typography variant="body1" fontWeight="300">
                                            Thông tin cá nhân
                                        </Typography>
                                    </>
                                )}
                            </Stack>
                        </Stack>
                    )}

                    {currentUser?.data?.role === 'EMPLOYEE' && (
                        <Stack direction={'column'} width="100%" p={1} spacing={2}>
                            {/* home */}
                            <Stack
                                direction={'row'}
                                p={'10px 10px'}
                                alignItems="center"
                                justifyContent="flex-start"
                                width="100%"
                                sx={{
                                    '&:hover': {
                                        background: theme.palette.grey[300],
                                        borderRadius: '15px',
                                    },
                                    background:
                                        location.pathname === configRouter.driverUserId
                                            ? theme.palette.grey[300]
                                            : 'transparent',
                                    borderRadius: '15px',
                                }}
                                spacing={3}
                                component={Link}
                                to={configRouter.driverUserId}
                            >
                                {location.pathname === configRouter.driverUserId ? (
                                    <>
                                        <House size={24} weight="fill" />
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Vận đơn
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <House size={24} weight="regular" />
                                        <Typography variant="body1" fontWeight="300">
                                            Vận đơn
                                        </Typography>
                                    </>
                                )}
                            </Stack>

                            {/* Profile */}
                            <Stack
                                direction={'row'}
                                p={'10px 10px'}
                                alignItems="center"
                                justifyContent="flex-start"
                                width="100%"
                                sx={{
                                    '&:hover': {
                                        background: theme.palette.grey[300],
                                        borderRadius: '15px',
                                    },
                                    background:
                                        location.pathname === configRouter.profile
                                            ? theme.palette.grey[300]
                                            : 'transparent',
                                    borderRadius: '15px',
                                }}
                                component={Link}
                                to={configRouter.profile}
                                spacing={3}
                            >
                                {location.pathname === configRouter.profile ? (
                                    <>
                                        <User size={24} weight="fill" />
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Thông tin cá nhân
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <User size={24} weight="regular" />
                                        <Typography variant="body1" fontWeight="300">
                                            Thông tin cá nhân
                                        </Typography>
                                    </>
                                )}
                            </Stack>
                        </Stack>
                    )}

                    {currentUser?.data?.role === 'ADMIN' && (
                        <Stack direction={'column'} width="100%" p={1} spacing={2}>
                            {/* home */}
                            <Stack
                                direction={'row'}
                                p={'10px 10px'}
                                alignItems="center"
                                justifyContent="flex-start"
                                width="100%"
                                sx={{
                                    '&:hover': {
                                        background: theme.palette.grey[300],
                                        borderRadius: '15px',
                                    },
                                    background:
                                        location.pathname === configRouter.listUser
                                            ? theme.palette.grey[300]
                                            : 'transparent',
                                    borderRadius: '15px',
                                }}
                                spacing={3}
                                component={Link}
                                to={configRouter.listUser}
                            >
                                {location.pathname === configRouter.listUser ? (
                                    <>
                                        <House size={24} weight="fill" />
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Người dùng
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <House size={24} weight="regular" />
                                        <Typography variant="body1" fontWeight="300">
                                            Người dùng
                                        </Typography>
                                    </>
                                )}
                            </Stack>

                            <Stack
                                direction={'row'}
                                p={'10px 10px'}
                                alignItems="center"
                                justifyContent="flex-start"
                                width="100%"
                                sx={{
                                    '&:hover': {
                                        background: theme.palette.grey[300],
                                        borderRadius: '15px',
                                    },
                                    background:
                                        location.pathname === configRouter.listShipment
                                            ? theme.palette.grey[300]
                                            : 'transparent',
                                    borderRadius: '15px',
                                }}
                                spacing={3}
                                component={Link}
                                to={configRouter.listShipment}
                            >
                                {location.pathname === configRouter.listShipment ? (
                                    <>
                                        <House size={24} weight="fill" />
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Vận đơn
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <House size={24} weight="regular" />
                                        <Typography variant="body1" fontWeight="300">
                                            Vận đơn
                                        </Typography>
                                    </>
                                )}
                            </Stack>

                            {/* Profile */}
                            <Stack
                                direction={'row'}
                                p={'10px 10px'}
                                alignItems="center"
                                justifyContent="flex-start"
                                width="100%"
                                sx={{
                                    '&:hover': {
                                        background: theme.palette.grey[300],
                                        borderRadius: '15px',
                                    },
                                    background:
                                        location.pathname === configRouter.profile
                                            ? theme.palette.grey[300]
                                            : 'transparent',
                                    borderRadius: '15px',
                                }}
                                component={Link}
                                to={configRouter.profile}
                                spacing={3}
                            >
                                {location.pathname === configRouter.profile ? (
                                    <>
                                        <User size={24} weight="fill" />
                                        <Typography variant="h6" fontSize={'1rem'} fontWeight="600">
                                            Thông tin cá nhân
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <User size={24} weight="regular" />
                                        <Typography variant="body1" fontWeight="300">
                                            Thông tin cá nhân
                                        </Typography>
                                    </>
                                )}
                            </Stack>
                        </Stack>
                    )}

                    <Stack
                        onClick={handleRedirectLogin}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: '30px',
                            left: '25%',
                            padding: '10px 15px',
                            borderRadius: '15px',
                            color: 'white',
                            backgroundColor: '#069255',
                            cursor: 'pointer',
                        }}
                    >
                        <SignOut size={22} />
                        Đăng xuất
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Sidebar;
