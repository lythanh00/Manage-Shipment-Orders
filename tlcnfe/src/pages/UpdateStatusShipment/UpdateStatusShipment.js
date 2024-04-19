import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const statusShipment = [
    {
        code: 'Cho-chuyen-hoan',
        statusname: 'Chờ chuyển hoàn',
    },
    {
        code: 'Cho-lay-hang',
        statusname: 'Chờ lấy hàng',
    },
    {
        code: 'Chuyen-hoan',
        statusname: 'Chuyển hoàn',
    },
    {
        code: 'Chuyen-kho',
        statusname: 'Chuyển kho',
    },
    {
        code: 'Da-giao-hang',
        statusname: 'Đã giao hàng',
    },
    {
        code: 'Dang-di-lay',
        statusname: 'Đang đi lấy',
    },
    {
        code: 'Huy',
        statusname: 'Hủy',
    },
    {
        code: 'Khong-gap-khach',
        statusname: 'Không gặp khách',
    },
];

function UpdateStatusShipmen() {
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
    const [statusSelect, setStatusSelect] = useState('Cho-lay-hang');
    const navigate = useNavigate();
    const { id } = useParams();
    const workStore = [
        {
            code: 'Kho-01',
            statusname: 'Kho 1',
        },
        {
            code: 'Kho-02',
            statusname: 'Kho 2',
        },
        {
            code: 'Kho-03',
            statusname: 'Kho 3',
        },
        {
            code: 'Kho-04',
            statusname: 'Kho 4',
        },
        {
            code: 'Kho-05',
            statusname: 'Kho 5',
        },
    ];
    const [status, setStatus] = useState('Cho-lay-hang');

    useEffect(() => {
        const storedData = localStorage.getItem('shipment');

        const retrievedObject = JSON.parse(storedData);
        settotalItems(retrievedObject.totalItems);
        setpaymentMethod(retrievedObject.paymentMethod);
        settotalMoney(retrievedObject.totalMoney);
        setshipmentFee(retrievedObject.shipmentFee);
        setsenderName(retrievedObject.senderName);
        setsenderAddress(retrievedObject.senderAddress);
        setsenderPhoneNumber(retrievedObject.senderPhoneNumber);
        setreceiverName(retrievedObject.receiverName);
        setreceiverAddress(retrievedObject.receiverAddress);
        setreceiverPhoneNumber(retrievedObject.receiverPhoneNumber);
        setStatusSelect(retrievedObject.shipmentStatusCode);
        setStatus(retrievedObject.workStoreCode);
    }, []);

    const handleEditProfile = async () => {
        const updateStatus = {
            workStoreCode: status,
        };
        await axios.put(`http://localhost:8081/shipment/workstore/${id}`, updateStatus);
        const datas = {
            shipmentStatusCode: statusSelect,
        };
        const data = await axios.put(`http://localhost:8081/shipment/shipmentstatus/${id}`, datas);
        if (data?.status === 200) {
            toast.success('Cập nhập trang thái đơn ship thành công');
            localStorage.removeItem('shipment');
            navigate('/drive-shipment');
        }
    };

    return (
        <div className="h-full overflow-hidden rounded-sm mx-3 py-5 relative">
            <div>
                <h1 className="font-semibold text-[20px]">Thông tin vận đơn</h1>
                <div className="w-full flex justify-between items-center flex-wrap">
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Phương thức thanh toán</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg opacity-70"
                            disabled
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
                            className="w-[85%] p-2 border rounded-lg opacity-70"
                            disabled
                            type="number"
                            placeholder="Tổng tiền"
                            value={totalMoney}
                            onChange={(e) => settotalMoney(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Phí vận chuyển</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg opacity-70"
                            disabled
                            type="number"
                            placeholder="Phí vận chuyển"
                            value={shipmentFee}
                            onChange={(e) => setshipmentFee(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Người gửi</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg opacity-70"
                            disabled
                            type="text"
                            placeholder="Người gửi"
                            value={senderName}
                            onChange={(e) => setsenderName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Địa chỉ người gửi</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg opacity-70"
                            disabled
                            type="text"
                            placeholder="Địa chỉ người gửi"
                            value={senderAddress}
                            onChange={(e) => setsenderAddress(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Số điện thoại người gửi</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg opacity-70"
                            disabled
                            type="text"
                            placeholder="Số điện thoại người gửi"
                            value={senderPhoneNumber}
                            onChange={(e) => setsenderPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Người nhận</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg opacity-70"
                            disabled
                            type="text"
                            placeholder="Người nhận"
                            value={receiverName}
                            onChange={(e) => setreceiverName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Địa chỉ nhận</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg opacity-70"
                            disabled
                            type="text"
                            placeholder="Địa chỉ nhận"
                            value={receiverAddress}
                            onChange={(e) => setreceiverAddress(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Số điện thoại người nhận</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg opacity-70"
                            disabled
                            type="text"
                            placeholder="Số điện thoại người nhận"
                            value={receiverPhoneNumber}
                            onChange={(e) => setreceiverPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[50%]">Cập nhập trạng thái đơn hàng</p>
                        <select
                            className="rounded-md"
                            value={statusSelect}
                            onChange={(e) => setStatusSelect(e.target.value)}
                        >
                            {statusShipment?.map((s) => (
                                <option className="p-4 border rounded-lg" key={s?.code} value={s?.code}>
                                    {s?.statusname}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-between items-center w-[48%] p-3">
                    <p className="w-[50%]">Cập nhập vị trí đơn hàng</p>

                    <select className="rounded-md" value={status} onChange={(e) => setStatus(e.target.value)}>
                        {workStore?.map((s) => (
                            <option className="p-4 border rounded-lg" key={s?.code} value={s?.code}>
                                {s?.statusname}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="w-full h-[70px] absolute bottom-0 border-t border-t-blue-gray-300 my-3 bg-white">
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

export default UpdateStatusShipmen;
