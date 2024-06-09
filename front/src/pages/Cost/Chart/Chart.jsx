import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {
    Box,
    Grid,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import data from "./db.json";
import { useState } from "react";
import { Stack } from "@mui/system";
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

// 브랜드별 요금 현황 차트
const Chart = () => {
    const brandData = [
        "KEVIT",
        "LG헬로비전",
        "대영채비",
        "삼성EVC",
        "에버온",
        "에스트래픽",
        "이카플러그",
        "제주전기자동차서비스",
        "차지비",
        "타디스크테크놀로지",
        "한국전기차충전서비스",
        "한국전력",
        "환경부",
    ];
    const costData = [380, 430, 440, 400, 345, 292.9, 391, 453.3, 380, 424, 430, 385.5, 355.7];
    const theme = useTheme();
    const chartWidth = useMediaQuery(theme.breakpoints.up("md"));

    const LineChart = () => {
        const data = {
            labels: brandData,
            datasets: [
                {
                    label: "브랜드별 요금 현황",
                    data: costData,
                    fill: false,
                    backgroundColor: theme.palette.primary.main,
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                },
            },
        };

        return (
            <Box
                sx={{
                    width: chartWidth ? "50vw" : "90vw",
                    height: chartWidth ? "60vh" : "40vh",
                    minHeight: "300px",
                    marginRight: chartWidth ? 5 : 0,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Bar data={data} options={options} sx={{ width: "100%", height: "100%" }} />
            </Box>
        );
    };

    // 기관별 요금표
    const BasicTable = () => {
        const [page, setPage] = useState(1);
        const [chargingData, setCharginData] = useState(data.features);

        function createData(No, 기관명, 구분, 요금) {
            return { No, 기관명, 구분, 요금 };
        }

        const rows = chargingData.map((data) =>
            createData(data.properties.순번, data.properties.기관명, data.properties.구분, data.properties.비회원가)
        );

        const theme = useTheme();
        const tableWidth = useMediaQuery(theme.breakpoints.up("md"));
        const rowsPerPage = 5;

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const currentData = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

        return (
            <Grid
                sx={{
                    width: tableWidth ? "40vw" : "90vw",
                    height: tableWidth ? "50vh" : "40vh",

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <TableContainer component={Paper} sx={{ marginBottom: "20px", height: "100%", minHeight: "350px" }}>
                    <Table sx={{ height: "100%" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>기관명</TableCell>
                                <TableCell>구분</TableCell>
                                <TableCell>요금</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {chartWidth
                                ? currentData.map((row, index) => (
                                      <TableRow key={index}>
                                          <TableCell component="th" scope="row">
                                              {row.No}
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                              {row.기관명}
                                          </TableCell>
                                          <TableCell>{row.구분}</TableCell>
                                          <TableCell>{row.요금}</TableCell>
                                      </TableRow>
                                  ))
                                : rows.map((row, index) => (
                                      <TableRow key={index}>
                                          <TableCell component="th" scope="row">
                                              {row.No}
                                          </TableCell>
                                          <TableCell component="th" scope="row">
                                              {row.기관명}
                                          </TableCell>
                                          <TableCell>{row.구분}</TableCell>
                                          <TableCell>{row.요금}</TableCell>
                                      </TableRow>
                                  ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {chartWidth && (
                    <Stack spacing={3}>
                        <Pagination
                            onChange={handleChangePage}
                            count={Math.ceil(rows.length / rowsPerPage)}
                            page={page}
                            variant="outlined"
                            shape="rounded"
                        />
                    </Stack>
                )}
            </Grid>
        );
    };

    return (
        <Grid
            sx={{
                display: "flex",
                flexDirection: chartWidth ? "row" : "column",
                maxWidth: "1700px",
                minHeight: chartWidth ? "500px" : "800px",
                marginTop: "50px",
            }}
        >
            <LineChart />
            <BasicTable />
        </Grid>
    );
};

export default Chart;
