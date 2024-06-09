import { Paper, Box } from "@mui/material";
import { FilterButton } from "./FilterButton";
import { FilterPopupButton } from "./FilterPopupButton";
import { FilterValue } from "./FilterValue";

export const FilterGroup = () => {

    return ( 
        <Box square="true" fullwidth="true" sx={{ py: 1, px: 3, display: "flex", gap: "8px", position:"absolute", top: 0, zIndex: 999 }}>
            {
                FilterValue.map((filter,idx) => (
                    filter.needPopup ?
                    (<FilterPopupButton key={idx} label={filter.label} filterKey={filter.filterKey} filterValue={filter.filterValue} Separator={filter.Separator} />)
                    :
                    (<FilterButton key={idx} label={filter.label} filterKey={filter.filterKey} filterValue={filter.filterValue} />)
                ))
            }
        </Box>
     );
}
 