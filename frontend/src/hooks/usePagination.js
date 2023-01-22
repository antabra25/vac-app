import {useState} from "react";

function usePagination() {

    const [page, setPage] = useState(1);
    const handleChangePage = (event, value) => {
        setPage(value);
    }
    const limit = 10;

    return {
        page,
        handleChangePage,
        limit,
    }
}

export default usePagination;