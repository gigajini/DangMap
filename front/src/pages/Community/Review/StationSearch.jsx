//후기를 검색하는 컴포넌트
import React, { useState } from "react";
import SearchInput from "../../../components/input/SearchInput";

const StationSearch = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <SearchInput
            width="60%"
            value={searchQuery} // 입력한 검색어를 input 엘리먼트에 표시
            handleSearchChange={handleSearchChange}
            onClick={handleSearch}
        />
    );
};

export default StationSearch;