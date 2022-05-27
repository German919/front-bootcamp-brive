import React, { useState, useEffect } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import styles from './dashboard.module.css';
import Table from './table/Table';
import { axiosRequest } from '../../services/axios';
import { useNavigate } from 'react-router-dom'
import { Modal } from '../modal/Modal';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import stylesModal from '../modal/modal.module.css';

const validate = ( value ) => {

  const error = {}

  if( !value ){
    error.name = 'campo requerido'
  }

  return error;
}

function Dashboard() {

  const [ search, setSearch ] = useState()
  const [ vacants, setVacants ] = useState([])
  const [ error, setError ] = useState( { name:'' } )
  const [ showModal, setShowModal ] = useState( false )

  const navigate = useNavigate()

  useEffect(() => {
    if( localStorage.getItem('name') === null) {
      navigate("/")
    } 
  },[])
  
  const handleChange = ( e ) => {
    setSearch( e.target.value )
  }

  const handleClose = () => {
    setShowModal( false )
  }
  const data =
    {
      "id": 0,
      "name": "string",
      "totalVacants": 0,
      "ceateDate": "2022-05-26T15:55:53.360Z"
    }
  
  const handleSearch = async ( e ) => {

    e.preventDefault()
    setError( validate( search ) )

    if( Object.keys( validate( search )).length === 0 ){
      
      const res = await axiosRequest('/Enterprise/search', data, 'Post')

      if( res ){
        // actualizo la tabla con el servicio de axios
        const addVacants = await axiosRequest('/Enterprise/all')
        setVacants( addVacants)
        localStorage.setItem('vacants', JSON.stringify( addVacants ) ) 
      }else{
        setShowModal( true )
      }
    } 
  }
  
  return (

    <div className={ styles.container }> 

                {
                showModal && (
                        <Modal>
                            <>
                              <ErrorOutlineIcon sx={{fontSize:'3rem', color:'#f44336', marginTop:'.8rem'}} />
                              <h3 className={ stylesModal.modalTitle }>NO SE ENCONTRARON VACANTES</h3>
                              <button onClick={ handleClose } className={stylesModal.modalBtn}>
                              Aceptar
                              </button>
                            </>
                        </Modal>
                    )
                }

      <form onSubmit={ handleSearch }className={ styles.form }>
            <TextField
                id="input-with-icon-textfield"
                label="buscar vacantes"
                sx={{width:'300px', position:'relative'}}
                onChange={ handleChange }
                name = 'search'
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon />
                    </InputAdornment>
                ),
                }}
                variant="standard"
            />
            {
              error.name && <p style={{margin:'-7px 0', color:'#CB4335', position:'absolute', top:'9.5rem', left:'30rem'}}>{ error.name }</p>
            }
            <button className={ styles.button } >Buscar</button>
        </form>
        <Table />  
    </div>
  )
}

export default Dashboard