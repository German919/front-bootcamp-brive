import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import styles from './dashboard.module.css';
import Table from './table/Table';

function Dashboard() {

  return (

    <div className={ styles.container }> 
        <form className={ styles.form }>
            <TextField
                id="input-with-icon-textfield"
                label="search vacancies"
                sx={{width:'300px'}}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon />
                    </InputAdornment>
                ),
                }}
                variant="standard"
            />
            <button className={ styles.button } >Search</button>
        </form>
        <Table />  
    </div>
  )
}

export default Dashboard