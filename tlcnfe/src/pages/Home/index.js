import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
    ResponsiveContainer,
} from "recharts";
import { Card, Typography } from "@material-tailwind/react";
const data = [
    { name: "Apr", uv: 50 },
    { name: "Feb", uv: 100 },
    { name: "Mar", uv: 150 },
    { name: "Apr", uv: 200 },
    { name: "May", uv: 500 },
    { name: "Jun", uv: 300 },
    { name: "Jul", uv: 350 },
    { name: "Aug", uv: 400 },
    { name: "Sep", uv: 350 },
];

const TABLE_HEAD = ["Tên sản phẩm", "Người gửi", "Ngày tạo", ""];

const TABLE_ROWS = [
    {
        name: "John Michael",
        author: "Manager",
        date: "23/04/18",
    },
    {
        name: "Alexa Liras",
        author: "Developer",
        date: "23/04/18",
    },
    {
        name: "Laurent Perrier",
        author: "Executive",
        date: "19/09/17",
    },
    {
        name: "Michael Levi",
        author: "Developer",
        date: "24/12/08",
    },
    {
        name: "Richard Gran",
        author: "Manager",
        date: "04/10/21",
    },
];
function Home() {
    return (
        <div className="w-full h-full">
            {/* statistic */}
            <div className="sm:flex sm:items-center sm:justify-between md:mx-5 text-center mt-5">
                <div className="p-5 w-[48%] bg-white shadow-lg">
                    <h1 className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
                        Dòng tiền
                    </h1>
                    <p className="text-[#159F46] font-semibold text-[32px] mb-4">
                        $467.34
                    </p>
                    <p className="text-[14px] text-[#303030] tracking-wider">
                        Trong tháng này
                    </p>
                </div>
                <div className="p-5 w-[48%] bg-white shadow-lg">
                    <h1 className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
                        Đơn hàng
                    </h1>
                    <p className="text-[#1D9CFD] font-semibold text-[32px] mb-4">
                        12,000
                    </p>
                    <p className="text-[14px] text-[#303030] tracking-wider">
                        Mới trong tháng này
                    </p>
                </div>

            </div>
            {/* line chart */}
            <div className="my-3 md:mx-5 md:p-5 bg-white">
                <p className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
                    Dòng tiền
                </p>
                <div className="w-full h-[350px] mt-5">
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart
                            data={data}
                            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                        >
                            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" interval={0} />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {/* column chart */}
            <div className="my-3 md:mx-5 md:p-5 bg-white">
                <p className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
                    Đặt hàng
                </p>
                <div className="w-full h-[350px] mt-5">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" stroke="#8884d8" interval={0} />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Bar dataKey="uv" fill="#8884d8" barSize={10} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {/* top sales */}
            <div className="my-3 md:mx-5 md:p-5">
                <p className="font-semibold text-[14px] text-[#685F78] mb-4 uppercase">
                    Top đơn hàng
                </p>
                <div className="w-full h-auto mt-5">
                    <Card className="h-full w-full overflow-auto lg:overflow-hidden">
                        <table className="w-full min-w-max table-auto text-left">
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
                                {TABLE_ROWS.map(({ name, author, date }, index) => (
                                    <tr key={name} className="even:bg-blue-gray-50/50">
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {name}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {author}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {date}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                                                Chi tiết
                                            </Typography>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
        </div>
    );
}
export default Home;
