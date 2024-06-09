import PersonIcon from '@mui/icons-material/Person';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';

export const FilterValue = [
    {
        label:"외부인 개방", 
        icon:<PersonIcon />,
        needPopup:false,
        filterKey:"user_restrict", 
        filterValue:{active:"이용자 제한 없음",none:""}
    },
    {
        label:"전용 주차장", 
        icon:<LocalParkingIcon />,
        needPopup:false,
        filterKey:"privateCarPark", 
        filterValue:{active:"O",none:""}
    },
    {
        label:"24시간 이용 가능", 
        icon:<AccessTimeIcon />,
        needPopup:false,
        filterKey:"useOpenTime", 
        filterValue:{active:"24시간 이용가능",none:""}
    },
    {
        label:"관리 업체명", 
        icon:<ApartmentIcon />,
        needPopup:true,
        filterKey:"manage_entrps_nm", 
        filterValue:["환경부(한국자동차환경협회)","한국전력","제주전기자동차서비스"],
        Separator:";"
    },
    {
        label:"커넥트", 
        icon:<ElectricalServicesIcon />,
        needPopup:true,
        filterKey:"chrstnType", 
        filterValue:["AC3상","DC차데모","DC콤보","DC차데모+AC3상+DC콤보", "AC완속"],
        Separator:";"
    }
]
 