import { Autocomplete, Skeleton, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";

interface CategoriesDropdownProps {
    selectedCategory: string;
    handleCategoryChange: any;
}
const CategoriesDropdown: React.FC<CategoriesDropdownProps> = (props) => {
    const { selectedCategory, handleCategoryChange } = props;
    const { products, categories } = useSelector((state: RootState) => state.data);

    if (!products) return <Skeleton height={50} width={500} />

    return (
        <Autocomplete
            id="categories"
            options={categories}
            sx={{ width: 300 }}
            value={selectedCategory}
            onChange={(e, value) => handleCategoryChange(value)}
            renderInput={(params) => <TextField {...params} label="Categories" />}
            fullWidth
        />
    )
}

export default CategoriesDropdown;