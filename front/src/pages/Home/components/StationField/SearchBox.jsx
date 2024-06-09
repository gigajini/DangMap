import { Box } from "@mui/material";
import SearchInput from "../../../../components/input/SearchInput";


const SearchBox = ({ onClick, handleSearchChange }) => {
    return (
        <Box sx={{ p: 2, maxWidth: "460px" }}>
            <SearchInput onClick={onClick} handleSearchChange={handleSearchChange} />
        </Box>
    );
};

export default SearchBox;