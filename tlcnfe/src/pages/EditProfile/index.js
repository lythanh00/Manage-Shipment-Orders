import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "~/features/auth/authSlice";

function EditProfile() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [phone, setPhone] = useState(currentUser?.data?.phone)
    const [birthday, setBirthday] = useState(currentUser?.data?.birthday)
    const [name, setName] = useState(currentUser?.data?.fullName)
    const [email, setEmail] = useState(currentUser?.data?.email)
    const [address, setAddress] = useState(currentUser?.data?.address)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [selectedOption, setSelectedOption] = useState('option1');
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleEditProfile = async () => {
        if (name === '' || address === '' || email === '' || phone === '' || birthday === '' || password === '') {
            toast.error("Hãy nhập đủ các trường")
        }
        else {
            if (password !== confirmPassword) {
                toast.error('Mật khẩu không khớp!')
            }
            else {
                const params = {
                    id: currentUser?.data?.id,
                    userName: currentUser?.data?.userName,
                    fullName: name,
                    gender: selectedOption === 'option1' ? 1 : 0,
                    address: address,
                    phoneNumber: phone,
                    birthday: birthday,
                    email: email,
                    workStoreCode: null,
                    password: password,
                }
                const data = await dispatch(updateUser(params))
                const user = unwrapResult(data);
                if (user?.status === 200) {
                    toast.success(user?.message)
                    navigate('/profile')
                }
                else {
                    toast.error(user?.message)
                }
            }
        }
    }

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="h-full overflow-hidden rounded-sm mx-3 py-5 relative">
            <div>
                <h1 className="font-semibold text-[20px]">Thông tin chủ tài khoản</h1>
                <div className="w-full flex justify-between items-center flex-wrap">
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Họ và tên</p>
                        <input className="w-[85%] p-2 border rounded-lg" type="text" placeholder='Họ và tên' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex justify-between items-center w-[100%] p-3">
                        <p className="w-[7%]">Địa chỉ</p>
                        <input className="w-[95%] p-2 border rounded-lg" type="text" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Email</p>
                        <input className="w-[85%] p-2 border rounded-lg" type="text" placeholder="Testing@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Số điện thoại</p>
                        <input className="w-[85%] p-2 border rounded-lg" type="text" placeholder="0123456789" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
                        <input className="w-[85%] p-2 border rounded-lg" type="date" placeholder="Sinh nhật" onChange={(e) => setBirthday(e.target.value)} />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Mật khẩu mới</p>
                        <input type='password' className="w-[85%] p-2 border rounded-lg" placeholder="Mật khẩu mới" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Xác nhận mật khẩu mới</p>
                        <input type='password' className="w-[85%] p-2 border rounded-lg" placeholder="Xác nhận mật khẩu" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="w-full h-[70px] absolute bottom-0 border-t border-t-blue-gray-300 my-3 bg-white">
                <button className="absolute right-2 bottom-2 bg-[#069255] text-white px-3 py-2 rounded-lg" onClick={handleEditProfile}>
                    Lưu thay đổi
                </button>
            </div>
        </div>
    );
}
export default EditProfile;
