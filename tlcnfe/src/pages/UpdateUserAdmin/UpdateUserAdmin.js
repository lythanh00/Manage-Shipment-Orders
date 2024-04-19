import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as authApi from '~/api/adminApi/adminApi';
function UpdateUserAdmin() {
    const [currentUser, setCurrentUser] = useState();
    const [phone, setPhone] = useState('');
    const [uername, setUsername] = useState('');
    const [startWork, setStartWork] = useState('');
    const [endWork, setEndWork] = useState('');
    const [birthday, setBirthday] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('option1');
    const [selectedRoleOption, setSelectedRoleOption] = useState('CUSTOMER');
    const { id } = useParams();
    useEffect(() => {
        const getUser = async () => {
            const data = await authApi.getUserByUserName(id);
            setPhone(data?.data?.phoneNumber);
            setUsername(data?.data?.userName);
            setStartWork(data?.data?.beginWorkDate);
            setEndWork(data?.data?.endWorkDate);
            setBirthday(data?.data?.birthday);
            setName(data?.data?.fullName);
            setEmail(data?.data?.email);
            setAddress(data?.data?.address);
            setSelectedOption(data?.data?.gender === 1 ? 'option1' : 'option2');
            setSelectedRoleOption(data?.data?.role);
            setCurrentUser(data?.data);
        };
        getUser();
    }, []);

    const navigate = useNavigate();

    const handleEditProfile = async () => {
        if (name === '' || address === '' || email === '' || phone === '' || birthday === '' || startWork === '') {
            toast.error('Hãy nhập đủ các trường');
        } else {
            if (password !== confirmPassword) {
                toast.error('Mật khẩu không khớp!')
            }
            else {
            const data = await authApi.updateUser({
                id: currentUser?.id,
                userName: uername,
                fullName: name,
                gender: selectedOption === 'option1' ? 0 : 1,
                address: address,
                phoneNumber: phone,
                birthday: birthday,
                email: email,
                beginWorkDate: startWork,
                endWorkDate: endWork,
                password: password,
                role: selectedRoleOption,
                isActived: 1

            });
            if (data?.status === 200) {
                toast.success(data?.message);
                navigate('/admin/user');
            } else {
                toast.error(data?.message);
            }
            }
        }
    };

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleRadioChangeRoleUser = (event) => {
        setSelectedRoleOption(event.target.value);
    };

    const handleDeleteProfile = async (id) => {
        await axios.delete(`http://localhost:8081/user/${id}`);
        navigate('/admin/user');
        toast.success('Xóa người dùng thành công');
    };

    return (
        <div className="h-full overflow-hidden rounded-sm mx-3 py-5 relative">
            <div>
                <h1 className="font-semibold text-[20px]">Thêm người dùng</h1>
                <div className="w-full flex justify-between items-center flex-wrap">
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Username</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Họ và tên"
                            value={uername}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Họ và tên</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Họ và tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[100%] p-3">
                        <p className="w-[7%]">Địa chỉ</p>
                        <input
                            className="w-[95%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Email</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Testing@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Số điện thoại</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="0123456789"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Giới tính: </p>
                        <div className="w-[85%]">
                            <label>
                                <input
                                    type="radio"
                                    value="option1"
                                    checked={selectedOption === 'option1'}
                                    onChange={handleRadioChange}
                                />
                                Nam
                            </label>
                            <label className="ml-5">
                                <input
                                    type="radio"
                                    value="option2"
                                    checked={selectedOption === 'option2'}
                                    onChange={handleRadioChange}
                                />
                                Nữ
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Sinh nhật</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="date"
                            placeholder="Sinh nhật"
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Ngày bắt đầu</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="date"
                            placeholder="Sinh nhật"
                            onChange={(e) => setStartWork(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Ngày kết thúc</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="date"
                            placeholder="Sinh nhật"
                            onChange={(e) => setEndWork(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                    <p className="w-[15%]">Mật khẩu mới</p>
                    <input type='password' className="w-[85%] p-2 border rounded-lg" placeholder="Mật khẩu mới" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex justify-between items-center w-[48%] p-3">
                    <p className="w-[15%]">Xác nhận mật khẩu mới</p>
                    <input type='password' className="w-[85%] p-2 border rounded-lg" placeholder="Xác nhận mật khẩu" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Role: </p>
                        <div className="w-[85%]">
                            <label>
                                <input
                                    type="radio"
                                    value="CUSTOMER"
                                    checked={selectedRoleOption === 'CUSTOMER'}
                                    onChange={handleRadioChangeRoleUser}
                                />
                                Khách hàng
                            </label>
                            <label className="ml-5">
                                <input
                                    type="radio"
                                    value="EMPLOYEE"
                                    checked={selectedRoleOption === 'EMPLOYEE'}
                                    onChange={handleRadioChangeRoleUser}
                                />
                                Nhân viên
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-[70px] absolute bottom-0 border-t border-t-blue-gray-300 my-3 bg-white flex">
                <button
                    className="absolute right-[150px] bottom-2 bg-[red] text-white px-3 py-2 rounded-lg"
                    onClick={() => handleDeleteProfile(currentUser?.id)}
                >
                    Xóa người dùng
                </button>
                <button
                    className="absolute right-2 bottom-2 bg-[#069255] text-white px-3 py-2 rounded-lg"
                    onClick={handleEditProfile}
                >
                    Lưu thay đổi
                </button>
            </div>
        </div>
    );
}

export default UpdateUserAdmin;
