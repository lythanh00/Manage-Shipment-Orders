import { Card, Typography, Button, CardFooter, IconButton, Spinner } from '@material-tailwind/react';
import { PencilSimple } from 'phosphor-react';
import { useEffect, useState } from 'react';
import * as adminApi from '../../api/adminApi/adminApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const TABLE_HEAD = ['Id', 'Người gửi', 'Người nhận', 'Mô tả', 'Ghi chú', 'Tổng tiền', 'Nhận đơn'];

const DriveShipment = () => {
    const [shipment, setShipment] = useState();
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const navigate = useNavigate();

    const getAllShipment = async () => {
        try {
            setLoading(true);
            const data = await adminApi.getAllShipment(currentPage, 10);
            if (data.status === 200) {
                setLoading(false);
                setShipment(data);
                console.log(
                    data?.data?.listResult.filter(
                        (data) => data?.driverUserId === currentUser?.id || data?.driverUserId === null,
                    ),
                );
                setTotalPage(data?.data?.totalPage);
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

    const handleEdit = (username) => {
        localStorage.setItem('shipment', JSON.stringify(username));
        navigate(`/drive-detail-shipment/${username?.id}`);
    };

    const handleGetShipment = async (shipmment) => {
        const datas = {
            driverUserId: currentUser?.data?.id,
        };
        const data = await axios.put(`http://localhost:8081/shipment/driveruser/${shipmment?.id}`, datas);
        if (data?.status === 200) {
            toast.success('Nhận đơn đơn ship thành công');
            await getAllShipment();
        } else {
            toast.error(data?.message);
        }
    };

    return (
        <div className="bg-white h-screen rounded-lg w-full flex flex-col items-center">
            <h1 className="text-center text-[24px] pt-3 mb-3">Danh Sách Vận Đơn</h1>
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
                                            data?.driverUserId === currentUser?.data?.id || data?.driverUserId === null,
                                    )
                                    ?.map((u, index) => {
                                        const isLast = index === shipment?.data?.length - 1;
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
                                                    {u?.driverUserId === currentUser?.data?.id ? (
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
                                                    ) : (
                                                        <div>
                                                            <Typography
                                                                onClick={() => handleGetShipment(u)}
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="cursor-pointer font-normal bg-red-500 italic py-2 rounded-lg text-center text-white flex justify-center items-center"
                                                            >
                                                                Nhận đơn <PencilSimple size={18} />
                                                            </Typography>
                                                        </div>
                                                    )}
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

export default DriveShipment;
