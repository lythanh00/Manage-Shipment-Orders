import { Card, Typography, Button, CardFooter, IconButton, Spinner } from '@material-tailwind/react';
import { PencilSimple } from 'phosphor-react';
import { useEffect, useState } from 'react';
import * as adminApi from '../../api/adminApi/adminApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const TABLE_HEAD = ['Id', 'Người gửi', 'Người nhận', 'Mô tả', 'Ghi chú', 'Tổng tiền', ''];

const AllShipment = () => {
    const [shipment, setShipment] = useState();
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [txtSearch, setTxtSearch] = useState('');

    const getAllShipment = async () => {
        if (txtSearch !== '') {
            const data = await axios.get(`http://localhost:8081/shipment/ADMIN?trackingNumber=${txtSearch}`);
            if (data?.status === 200) {
                setTotalPage(1);
                setCurrentPage(1);
                const fake = {
                    data: {
                        listResult: [data.data.data],
                        page: 1,
                        totalPage: 1,
                    },
                };
                setShipment(fake);
                // console.log(fake);
            } else {
                toast.error(data?.message);
            }
        } else {
            try {
                setLoading(true);
                const data = await adminApi.getAllShipment(currentPage, 5);
                if (data.status === 200) {
                    setLoading(false);
                    setShipment(data);
                    setTotalPage(data?.data?.totalPage);
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
        }
    };

    useEffect(() => {
        getAllShipment();
    }, [currentPage, txtSearch]);

    const handleEdit = (username) => {
        localStorage.setItem('shipment', JSON.stringify(username));
        navigate(`/update-shipment/${username?.id}`);
    };

    const currentUser = useSelector((state) => state.auth.currentUser);

    const handleChangeSearch = (e) => {
        setCurrentPage(1);
        setTxtSearch(e.target.value);
    };

    return (
        <div className="bg-white h-screen rounded-lg w-full flex flex-col items-center">
            <h1 className="text-center text-[24px] pt-3 mb-3">Danh Sách Vận Đơn</h1>
            <button
                onClick={() => navigate('/create-shipment')}
                className="px-3 py-2 bg-blue-600 rounded-lg text-white"
            >
                Tạo vận đơn mới
            </button>
            <div className="w-full relative flex justify-end pr-10 py-3 bg-white ">
                <form>
                    <label
                        htmlFor="search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white w-[300px]"
                    >
                        Tìm kiếm
                    </label>
                    <div className="relative w-[300px] ">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            onChange={(e) => handleChangeSearch(e)}
                            type="search"
                            id="search"
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Nhập tracking number..."
                        />
                    </div>
                </form>
            </div>
            <Card className="mt-5 text-center h-auto w-[95%] overflow-auto">
                {loading ? (
                    <Spinner className="mx-auto" />
                ) : (
                    <>
                        <table className="w-full table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {shipment?.data?.listResult
                                    .filter(
                                        (data) =>
                                            data?.createdBy === currentUser?.data?.userName ||
                                            currentUser?.data?.role === 'ADMIN',
                                    )
                                    ?.map((u, index) => {
                                        const isLast = index === shipment?.length - 1;
                                        const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                                        return (
                                            <tr key={u?.id}>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {u?.id}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {u?.senderName}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {u?.receiverName}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {u?.description}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {u?.notes}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {u?.totalMoney}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div>
                                                        <Typography
                                                            onClick={() => handleEdit(u)}
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="cursor-pointer font-normal bg-green-500 italic py-2 rounded-lg text-center text-white flex justify-center items-center"
                                                        >
                                                            Chi tiết <PencilSimple size={18} />
                                                        </Typography>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
                            <Button
                                variant="outlined"
                                size="sm"
                                className={`mr-3 ${currentPage === 1 ? 'hidden' : 'block'} `}
                                onClick={() => {
                                    setCurrentPage((prev) => prev - 1);
                                }}
                            >
                                Trước
                            </Button>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPage }, (_, index) => (
                                    <IconButton
                                        key={index + 1}
                                        variant={currentPage === index + 1 ? 'outlined' : 'text'}
                                        size="sm"
                                        onClick={() => {
                                            setCurrentPage(index + 1);
                                        }}
                                        className="hover:outline"
                                    >
                                        {index + 1}
                                    </IconButton>
                                ))}
                            </div>
                            <Button
                                variant="outlined"
                                size="sm"
                                className={`ml-3 ${currentPage === totalPage ? 'hidden' : 'block'} `}
                                onClick={() => {
                                    setCurrentPage((prev) => prev + 1);
                                }}
                            >
                                Tiếp
                            </Button>
                        </CardFooter>
                    </>
                )}
            </Card>
        </div>
    );
};

export default AllShipment;
