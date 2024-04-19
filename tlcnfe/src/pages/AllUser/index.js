import {
    Card,
    Typography,
    Button,
    CardFooter,
    IconButton,
    Spinner,
} from "@material-tailwind/react";
import { PencilSimple } from "phosphor-react";
import { useEffect, useState } from "react";
import * as adminApi from "../../api/adminApi/adminApi";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
    "Họ và tên",
    "Username",
    "Email",
    "Địa chỉ",
    "Số điện thoại",
    "Trạng thái",
];

const AllUser = () => {
    const [user, setUser] = useState();
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const getAllUser = async () => {
        try {
            setLoading(true);
            const data = await adminApi.getAllUser(currentPage, 5);
            if (data.status === 200) {
                setLoading(false);
                setUser(data);
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
        getAllUser();
    }, [currentPage]);

    const handleEdit = (username) => {
        navigate(`/admin/edit-user/${username}`)
    };

    return (
        <div className="bg-white h-screen rounded-lg w-full flex flex-col items-center">
            <h1 className="text-center text-[24px] pt-3 mb-3">
                Danh Sách người dùng trong hệ thống
            </h1>
            <button onClick={()=>navigate("/admin/create-user")} className="px-3 py-2 bg-blue-600 rounded-lg text-white">Tạo user mới</button>
            <Card className="mt-5 text-center h-auto w-[95%] overflow-auto">
                {loading ? (
                    <Spinner className="mx-auto" />
                ) : (
                    <>
                        <table className="w-full table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                        >
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
                                {user?.data?.listResult.map((u, index) => {
                                    const isLast = index === user?.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={u?.username}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {u?.fullName}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {u?.userName}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {u?.email}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {u?.address}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {u?.phoneNumber}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div>
                                                    {u?.isActived === 0 ? (
                                                        <Typography
                                                            onClick={() => handleEdit(u.userName)}
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="cursor-pointer font-normal bg-red-500 italic py-2 rounded-lg text-center text-white flex justify-center items-center"
                                                        >
                                                            Đã bị chặn
                                                            <PencilSimple size={18} />
                                                        </Typography>
                                                    ) : (
                                                        <Typography
                                                            onClick={() => handleEdit(u.userName)}
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="cursor-pointer font-normal bg-green-500 italic py-2 rounded-lg text-center text-white flex justify-center items-center"
                                                        >
                                                            Hoạt động <PencilSimple size={18} />
                                                        </Typography>
                                                    )}

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
                                className={`mr-3 ${currentPage === 1 ? "hidden" : "block"} `}
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
                                        variant={currentPage === index + 1 ? "outlined" : "text"}
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
                                className={`ml-3 ${currentPage === totalPage ? "hidden" : "block"
                                    } `}
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

export default AllUser;
