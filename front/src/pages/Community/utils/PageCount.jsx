import React from "react";
import { Grid, Pagination, Stack } from "@mui/material";

const PageCount = ({ page, count, handleChangePage, sx }) => {
    return (
        <Grid sx={{ marginBottom: "100px", display: "flex", flexDirection: "column", alignItems: "center", ...sx }}>
            <Stack spacing={3}>
                <Pagination onChange={handleChangePage} count={count} page={page} variant="outlined" shape="rounded" />
            </Stack>
        </Grid>
    );
};

export default PageCount;
