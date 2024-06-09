import { Paper, Button } from "@mui/material";
// import Local from "../filter/Local";
// import Conect from "../filter/Conect";
// import Empty from "../filter/Empty";
// import Speed from "../filter/Speed";
// import Using from "../filter/Using";
// import Pay from './../filter/Pay';
// import Open from './../filter/Open';
import Local from "../../components/filter/Local";
import Conect from "../../components/filter/Conect";
import Empty from "../../components/filter/Empty";
import Speed from "../../components/filter/Speed";
import Using from "../../components/filter/Using";
import Pay from "../../components/filter/Pay";
import Open from "../../components/filter/Open";

const FilterList = () => {
    return (
        <Paper square fullwidth="true" bgcolor="pink" sx={{ py: 1, px: 3, display: "flex", gap: "8px" }}>
            <Local />
            <Empty />
            <Conect />
            <Speed />
            <Using />
            <Pay />
            <Open />
        </Paper>
    );
};

export default FilterList;
