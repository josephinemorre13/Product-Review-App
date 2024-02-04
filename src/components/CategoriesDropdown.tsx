import { Autocomplete, Skeleton, TextField } from "@mui/material";

interface CategoriesDropdownProps {
    products: any;
    selectedCategory: string;
    handleCategoryChange: any;
}
const CategoriesDropdown: React.FC<CategoriesDropdownProps> = (props) => {
    const { products, selectedCategory, handleCategoryChange } = props;

    if (!products) return <Skeleton height={50} width={500} />

    const categories = ['All']
    
    categories.push(...products.map((v: any) => v.category).sort())

    return (
        <Autocomplete
            id="categories"
            options={categories}
            sx={{ width: 300 }}
            value={selectedCategory}
            onChange={(e, value) => handleCategoryChange(value)}
            renderInput={(params) => <TextField {...params} label="Categories" />}
        />
    )
}

export default CategoriesDropdown;