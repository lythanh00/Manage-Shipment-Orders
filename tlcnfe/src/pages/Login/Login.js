import { useState } from 'react';
// mui
import { LoadingButton } from '@mui/lab';
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
// component
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { router as configRouter } from '~/config/config';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signInPassWord } from '~/features/auth/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function Login() {
    const theme = useTheme();
    const nav = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async () => {
        if (email === '' || password === '') {
            toast.error("Hãy nhập đầy đủ thông tun")
        }
        else {
            const data = await dispatch(signInPassWord({ userName: email, password: password}))
            const currentUser = unwrapResult(data);
            if (currentUser?.status === 200) {
                toast.success(currentUser?.message)
                nav('/')
            }
            else {
                toast.error(currentUser?.message)
            }
        }
    }

    return (
        <>
            <Grid container width="100%" height={'100vh'}>
                <Grid item xs={6} height="100%" alignItems="center" justifyContent="center">
                    <Stack direction={'column'} p={2} height="100%" width="100%" spacing={2}>
                        <Stack direction={'column'} alignItems="center" justifyContent={'center'} spacing={2} flex="1">
                            {/* title */}
                            <Typography variant="h4">Welcome Back</Typography>
                            <Typography variant="h5" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                                Đăng nhập với tài khoản của bạn
                            </Typography>
                            {/* button login */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    paddingTop: '30px',
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    sx={{
                                        height: 44,
                                        width: 126,
                                        borderRadius: 2,
                                        color: theme.palette.text.secondary,
                                        borderColor: theme.palette.text.secondary,
                                        '&:hover': {
                                            color: theme.palette.text.secondary,
                                        },
                                    }}
                                    startIcon={<img src={images.googleIcon} alt="google"></img>}
                                >
                                    Google
                                </Button>
                            </Box>
                            {/* div */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '20px 10px',
                                    gap: '10px',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '130px',
                                        height: '0.5px',
                                        backgroundColor: theme.palette.text.disabled,
                                        opacity: 0.5,
                                    }}
                                ></Box>
                                <Typography variant="h6" fontSize={'1rem'}>
                                    Hoặc đăng nhập với
                                </Typography>
                                <Box
                                    sx={{
                                        width: '130px',
                                        height: '0.5px',
                                        backgroundColor: theme.palette.text.disabled,
                                        opacity: 0.5,
                                    }}
                                ></Box>
                            </Box>
                            {/* input login */}
                            <Stack direction={'column'} spacing={3} alignItems="center">
                                <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-email">Tài khoản</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email"
                                        label="Tài khoản"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <Eye size={20} weight="light" />
                                                    ) : (
                                                        <EyeSlash size={20} weight="light" />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Mật khẩu"
                                    />
                                </FormControl>
                                <LoadingButton
                                    // loading={loading}
                                    loadingPosition="center"
                                    variant="outlined"
                                    sx={{
                                        marginTop: "10px",
                                        height: 55,
                                        width: 400,
                                        borderRadius: 2,
                                        color: theme.palette.text.secondary,
                                        borderColor: theme.palette.text.secondary,
                                        '&:hover': {
                                            color: theme.palette.text.secondary,
                                        },
                                    }}
                                    onClick={handleLogin}
                                >
                                    Đăng nhập
                                </LoadingButton>
                            </Stack>
                            <Stack sx={{ display: 'flex', flexDirection: 'row', fontStyle: 'italic', justifyContent: 'flex-end', alignItems: 'flex-end', width: "400px" }}>
                                <p>
                                    Bạn chưa có tài khoản?
                                </p>
                                <Typography
                                    fontSize="1rem"
                                    variant="h6"
                                    component={Link}
                                    to={configRouter.register}
                                    sx={{ color: theme.palette.primary.main }}
                                >
                                    Đăng ký!
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack
                        direction={'column'}
                        p={2}
                        width="100%"
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Stack
                            direction={'row'}
                            alignItems="center"
                            justifyContent={'center'}
                            position="relative"
                            width="100%"
                            height="100%"
                        >
                            <img
                                src={images.loginBackground}
                                alt="background"
                                style={{
                                    position: 'absolute',
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'contain',
                                    transform: 'translateX(-10%)',
                                }}
                            />
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

export default Login;
