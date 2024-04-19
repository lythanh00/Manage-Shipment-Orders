import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}
function CreateShipment() {
    const [totalItems, settotalItems] = useState(0);
    const [paymentMethod, setpaymentMethod] = useState('');
    const [totalMoney, settotalMoney] = useState(0);
    const [shipmentFee, setshipmentFee] = useState(0);
    const [senderName, setsenderName] = useState('');
    const [senderAddress, setsenderAddress] = useState('');
    const [senderPhoneNumber, setsenderPhoneNumber] = useState('');
    const [receiverName, setreceiverName] = useState('');
    const [receiverAddress, setreceiverAddress] = useState('');
    const [receiverPhoneNumber, setreceiverPhoneNumber] = useState('');
    const [description, setdescription] = useState('');
    const [notes, setnotes] = useState('');
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.currentUser);

    const handleEditProfile = async () => {
        if (
            totalItems === 0 ||
            paymentMethod === '' ||
            totalMoney === 0 ||
            senderName === '' ||
            senderAddress === '' ||
            senderPhoneNumber === '' ||
            receiverName === '' ||
            receiverAddress === '' ||
            receiverPhoneNumber === ''
        ) {
            toast.error('Hãy nhập đủ các trường');
        } else {
            const datas = {
                totalItems,
                paymentMethod,
                totalMoney,
                shipmentFee,
                senderName,
                senderAddress,
                senderPhoneNumber,
                receiverName,
                receiverAddress,
                receiverPhoneNumber,
                driverUserId: null,
                description,
                trackingNumber: generateRandomString(10),
                notes,
                updateHistory: 'lich su',
                workStoreCode: null,
                shipmentStatusCode: null,
                estimateDeliveryDistance: 2,
                actualDeliveryDistance: 2.2,
                isPaidIn: 0,
                createdBy: currentUser.data.userName,
            };
            const data = await axios.post(`http://localhost:8081/shipment`, datas);
            if (data?.status === 200) {
                toast.success('Tạo đơn ship thành công');
                navigate('/admin/shipment');
            } else {
                toast.error(data?.message);
            }
        }
    };

    return (
        <div className="h-full overflow-hidden rounded-sm mx-3 py-5 relative">
            <div>
                <h1 className="font-semibold text-[20px]">Tạo đơn hàng</h1>
                <div className="w-full flex justify-between items-center flex-wrap">
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Phương thức thanh toán</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Phương thức thanh toán"
                            value={paymentMethod}
                            onChange={(e) => setpaymentMethod(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Tổng số sản phẩm</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="number"
                            placeholder="Tổng số sản phẩm"
                            value={totalItems}
                            onChange={(e) => settotalItems(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Tổng tiền</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="number"
                            placeholder="Tổng tiền"
                            value={totalMoney}
                            onChange={(e) => settotalMoney(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Phí vận chuyển</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="number"
                            placeholder="Phí vận chuyển"
                            value={shipmentFee}
                            onChange={(e) => setshipmentFee(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Người gửi</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Người gửi"
                            value={senderName}
                            onChange={(e) => setsenderName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Địa chỉ người gửi</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Địa chỉ người gửi"
                            value={senderAddress}
                            onChange={(e) => setsenderAddress(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Số điện thoại người gửi</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Số điện thoại người gửi"
                            value={senderPhoneNumber}
                            onChange={(e) => setsenderPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Người nhận</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Người nhận"
                            value={receiverName}
                            onChange={(e) => setreceiverName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Địa chỉ nhận</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Địa chỉ nhận"
                            value={receiverAddress}
                            onChange={(e) => setreceiverAddress(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Số điện thoại người nhận</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Số điện thoại người nhận"
                            value={receiverPhoneNumber}
                            onChange={(e) => setreceiverPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Mô tả</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Mô tả"
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Ghi chú</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Ghi chú"
                            value={notes}
                            onChange={(e) => setnotes(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full h-[70px] absolute bottom-0 border-t border-t-blue-gray-300 my-3 bg-white">
                <button
                    className="absolute right-2 bottom-2 bg-[#069255] text-white px-3 py-2 rounded-lg"
                    onClick={handleEditProfile}
                >
                    Tạo đơn hàng
                </button>
            </div>
        </div>
    );
}

export default CreateShipment;
