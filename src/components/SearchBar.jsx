import { TextField, InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export default function SearchBar({ value, onChange, placeholder = 'Search...'}) {
    const handleClear = () => onChange('');

    return (
        <div className='search-bar'>
            <TextField
                fullWidth
                label={placeholder}
                variant='outlined'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                size='small'
                slotProps={{htmlInput: {maxLength: 100}}}
                InputProps={{
                    endAdornment: value && (
                        <InputAdornment position='end'>
                            <IconButton onClick={handleClear}>
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}
