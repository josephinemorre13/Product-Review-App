import { Skeleton, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";

interface SearchBarProps {
    searchParams: string;
    handleSearchParamsChange: any;
    handleKeyPressInSearchBar: any;
}
const SearchBar: React.FC<SearchBarProps> = (props) => {
    const { searchParams, handleSearchParamsChange, handleKeyPressInSearchBar } = props;
    const { products } = useSelector((state: RootState) => state.data);

    if (!products) return <Skeleton height={50} width={500} />

    return (
        <div>
            <TextField
                id="outlined-search"
                label="Search"
                onChange={(e) => handleSearchParamsChange(e.target.value)}
                onKeyDown={(e) => handleKeyPressInSearchBar(e.key)}
                value={searchParams}
                type="search"
            />
        </div>
    )
}

export default SearchBar;