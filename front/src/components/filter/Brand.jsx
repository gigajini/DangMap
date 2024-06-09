import { Chip, Grid, Button } from "@mui/material";
import React, { useState } from "react";

const Brand = ({ brands }) => {
    const [selectedBrands, setSelectedBrands] = useState([]);

    const handleBrandClick = (brand) => {
        setSelectedBrands((prevSelectedBrands) => {
            if (prevSelectedBrands.includes(brand)) {
                return prevSelectedBrands.filter((selectedBrand) => selectedBrand !== brand);
            } else {
                return [...prevSelectedBrands, brand];
            }
        });
    };

    return (
        <Grid container spacing={2}>
            {brands.map((brand, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <Chip
                        variant={selectedBrands.includes(brand) ? 'contained' : 'outlined'}
                        color="primary"
                        label={brand}
                        onClick={() => handleBrandClick(brand)}
                    />
                     <Button>환경부</Button>
                </Grid>
            ))}
            <Button>환경부</Button>
        </Grid>
    );
}

export default Brand;
