import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as userApi from '~/api/userApi/userApi'

function ProductDetail() {
    const [productName, setProductName] = useState('')
    const [weight, setWeight] = useState('')
    const [totalItems, setTotalItemsl] = useState('')
    const [price, setPrice] = useState('')
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.auth.currentUser);
    const { id } = useParams()

    useEffect(()=>{
        const storedData = localStorage.getItem('productedit');

        const retrievedObject = JSON.parse(storedData);
        setProductName(retrievedObject.productName)
        setWeight(retrievedObject.weight)
        setTotalItemsl(retrievedObject.totalItems)
        setPrice(retrievedObject.price)
    },[])

    const handleEditProfile = async () => {
        if (productName === '' || weight === '' || totalItems === '' || price === '') {
            toast.error("Hãy nhập đủ các trường")
        }
        else {
            const datas = {
                productName,
                weight,
                totalItems,
                price,
                shipmentId: null,
                createdBy: currentUser?.data?.id
            }
            const data = await userApi.updateProduct(
                id,
                datas
            )
            if (data?.status === 200) {
                toast.success(data?.message)
                localStorage.removeItem('productedit');
                navigate('/products')
            }
            else {
                toast.error(data?.message)
            }
        }
    }

    const handleDeleteProfile = async (id) => {
        await axios.delete(`http://localhost:8081/product`,
            [parseInt(id)]  
        )
        localStorage.removeItem('productedit');
        navigate('/products')
        toast.success("Xóa sản phẩm thành công")
    }

    return (
        <div className="h-full overflow-hidden rounded-sm mx-3 py-5 relative">
            <div>
                <h1 className="font-semibold text-[20px]">Chỉnh sản phẩm</h1>
                <div className="w-full flex justify-between items-center flex-wrap">
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Tên sản phẩm</p>
                        <input className="w-[85%] p-2 border rounded-lg" type="text" placeholder='Tên sản phẩm' value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Cân nặng</p>
                        <input className="w-[85%] p-2 border rounded-lg" type="number" placeholder='Cân nặng' value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3">
                        <p className="w-[15%]">Số lượng sản phẩm</p>
                        <input className="w-[85%] p-2 border rounded-lg" type="number" placeholder="Số lượng sản phẩm" value={totalItems} onChange={(e) => setTotalItemsl(e.target.value)} />
                    </div>
                    <div className="flex justify-between items-center w-[48%] p-3 my-3">
                        <p className="w-[15%]">Giá</p>
                        <input className="w-[85%] p-2 border rounded-lg" type="number" placeholder="Giá" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="w-full h-[70px] absolute bottom-0 border-t border-t-blue-gray-300 my-3 bg-white">
                <button className="absolute right-[150px] bottom-2 bg-[red] text-white px-3 py-2 rounded-lg" onClick={() => handleDeleteProfile(currentUser?.id)}>
                    Xóa người dùng
                </button>
                <button className="absolute right-2 bottom-2 bg-[#069255] text-white px-3 py-2 rounded-lg" onClick={handleEditProfile}>
                    Lưu thay đổi
                </button>
            </div>
        </div>
    );
}
export default ProductDetail;
