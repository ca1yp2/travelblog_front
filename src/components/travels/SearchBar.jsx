import React from 'react'
import { TextField, Box } from '@mui/material'

const SearchBar = ({keyword, setKeyword, onSearch}) => {
  return (
    <Box sx={{mb:2}}>
        <TextField fullWidth placeholder='관광지 이름으로 검색' value={keyword} onChange={(e)=>setKeyword(e.target.value)} onKeyDown={(e)=>e.key==='Enter' && onSearch} />
    </Box>
  )
}

export default SearchBar