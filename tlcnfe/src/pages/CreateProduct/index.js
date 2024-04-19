import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as userApi from '~/api/userApi/userApi';
import * as adminApi from '../../api/adminApi/adminApi';
function CreateProduct() {
    const [productName, setProductName] = useState('');
    const [weight, setWeight] = useState('');
    const [totalItems, setTotalItemsl] = useState('');
    const [price, setPrice] = useState('');

    const currentUser = useSelector((state) => state.auth.currentUser);

    const [shipment, setShipment] = useState();
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [statusSelect, setStatusSelect] = useState('');

    const getAllShipment = async () => {
        try {
            setLoading(true);
            const data = await adminApi.getAllShipment(currentPage, 100);
            if (data.status === 200) {
                setLoading(false);
                setShipment(data);
                setTotalPage(data?.data?.totalPage);
                setStatusSelect(
                    data.data.listResult.filter((data) => data?.createdBy === currentUser?.data?.userName)[0].id,
                );
                console.log(
                    data.data?.listResult.filter(
                        (data) =>
                            data?.createdBy === currentUser?.data?.userName || currentUser?.data?.role === 'ADMIN',
                    ),
                );
            } else {
                setLoading(false);
                alert(data?.message);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getAllShipment();
    }, [currentPage]);
    const handleEditProfile = async () => {
        if (productName === '' || weight === '' || totalItems === '' || price === '') {
            toast.error('Hãy nhập đủ các trường');
        } else {
            const data = await userApi.createProduct({
                productName,
                weight,
                totalItems,
                price,
                shipmentId: statusSelect,
                createdBy: currentUser?.data?.id,
            });
            if (data?.status === 200) {
                toast.success(data?.message);
                navigate('/products');
            } else {
                toast.error(data?.message);
            }
        }
    };

    return (
        <div className="h-full overflow-hidden rounded-sm mx-3 py-5 relative">
            <div>
                <h1 className="font-semibold text-[20px]">Thêm sản phẩm mới</h1>
                <div className="w-full flex justify-between items-center flex-wrap">
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Tên sản phẩm</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="text"
                            placeholder="Tên sản phẩm"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Cân nặng</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="number"
                            placeholder="Cân nặng"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Số lượng sản phẩm</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="number"
                            placeholder="Số lượng sản phẩm"
                            value={totalItems}
                            onChange={(e) => setTotalItemsl(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Giá</p>
                        <input
                            className="w-[85%] p-2 border rounded-lg"
                            type="number"
                            placeholder="Giá"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[50%]">Chọn đơn hàng</p>
                        <select
                            className="rounded-md"
                            value={statusSelect}
                            onChange={(e) => setStatusSelect(e.target.value)}
                        >
                            {shipment?.data.listResult
                                .filter((data) => data?.createdBy === currentUser?.data?.userName)
                                ?.map((s) => (
                                    <option className="p-4 border rounded-lg" key={s?.id} value={s?.id}>
                                        {s?.trackingNumber}
                                    </option>
                                ))}
                        </select>
                    </div>
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

export default CreateProduct;
