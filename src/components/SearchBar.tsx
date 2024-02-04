import { Autocomplete, Skeleton, TextField } from "@mui/material";

interface SearchBarProps {
    products: any;
    searchParams: string;
    handleSearchParamsChange: any;
}
const SearchBar: React.FC<SearchBarProps> = (props) => {
    const { products, searchParams, handleSearchParamsChange } = props;

    if (!products) return <Skeleton height={50} width={500} />

    return (
        <div>
            <TextField 
                id="outlined-search" 
                label="Search"
                onChange={(e) => handleSearchParamsChange(e.target.value)} 
                value={searchParams} 
                type="search" 
            />
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={products.map((option: any) => option.name)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
        </div>
    )
}

export default SearchBar;