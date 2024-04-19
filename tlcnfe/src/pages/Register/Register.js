import { useState } from 'react';
// mui
import { LoadingButton } from '@mui/lab';
import {
    Box,
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
// component
import images from '~/assets/images';
import { registerPassword } from '~/api/authApi/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
    const theme = useTheme();
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const isNumber = (str) => {
        if (str.length === 10) return /^[0-9]+$/.test(str);
        else return false;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const newUser = {
            password: password,
            confirmPassword: confirmPassword,
            fullName: name,
            userName: username,
            phoneNumber: phone,
            role: 'CUSTOMER',
        };
        if (phone === '' || name === '' || username === '' || password === '' || confirmPassword === '') {
            toast.error('Hãy điền đầy đủ thông tin');
        } else {
            if (!isNumber(phone)) {
                toast.error('Hãy nhập đúng định dạng số điện thoại');
            } else if (password === confirmPassword) {
                if (password.length < 5) {
                    toast.error('Hãy nhập mật khẩu ít nhất 6 ký tự');
                } else {
                    try {
                        const res = await registerPassword(newUser);
                        if (res?.status === 200) {
                            toast.success('Đăng ký thành công');
                            navigate('login');
                        }
                    } catch (error) {
                        toast.error(error?.response?.data?.error);
                    }
                }
            } else {
                toast.error('Password not confirm');
            }
        }
    };

    return (
        <Grid container width="100%" height={'100vh'}>
            <Grid item xs={6} height="100%" alignItems="center" justifyContent="center">
                <Stack direction={'column'} p={2} height="100%" width="100%" spacing={2}>
                    <Stack direction={'column'} alignItems="center" justifyContent={'center'} spacing={2} flex="1">
                        {/* title */}
                        <Typography variant="h4">Welcome My Website</Typography>
                        {/* input login */}
                        <Stack direction={'column'} spacing={1.5} alignItems="center">
                            <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                <InputLabel>Họ và tên</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    label="Họ và tên"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                <InputLabel>Tên tài khoản</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    label="Tên tài khoản"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                <InputLabel>Số điện thoại</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    label="Số điện thoại"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                                <OutlinedInput
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility" edge="end"></IconButton>
                                        </InputAdornment>
                                    }
                                    label="Mật khẩu"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Xác nhận mật khẩu</InputLabel>
                                <OutlinedInput
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility" edge="end"></IconButton>
                                        </InputAdornment>
                                    }
                                    label="Xác nhận mật khẩu"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                        {/* button login */}
                        <LoadingButton
                            loadingPosition="center"
                            variant="outlined"
                            sx={{
                                height: 55,
                                width: 400,
                                borderRadius: 2,
                                color: theme.palette.text.secondary,
                                borderColor: theme.palette.text.secondary,
                                '&:hover': {
                                    color: theme.palette.text.secondary,
                                },
                            }}
                            onClick={handleSignUp}
                        >
                            Đăng ký
                        </LoadingButton>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
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
                                Hoặc đăng nhập
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
                        {/* button login */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 2,
                            }}
                        >
                            <Stack direction={'row'} alignItems="center" fontSize="0.8rem">
                                Bạn đã có tài khoản?{' '}
                                <Link to={'/login'} style={{ color: 'blue', fontSize: '15px' }}>
                                    Đăng nhập
                                </Link>
                            </Stack>
                        </Box>
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
                            }}
                        />
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Register;
