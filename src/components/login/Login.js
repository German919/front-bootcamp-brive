import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from './login.module.css'
import stylesModal from '../modal/modal.module.css';
import { axiosRequest } from '../../services/axios';
import { useNavigate } from 'react-router-dom'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Modal } from '../modal/Modal';

const validate = ( value ) => {

    const error = {}
    const regEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/

    if( !value.user ){
        error.user = 'campo requerido'
    }else if(!regEmail.test(value.user)){
        error.user ='email inválido'
    }

    if( !value.password ){
        error.password = 'campo requerido'
    }else if( Object.values(value.password).length <= 6 ){
        error.password = 'la contraseña deber ser mayor a 6 caracteres'
    }

    return error;
}

function Login() {

    const [ values, setValues ] = useState({
        user:'',
        password:'',
    })

    const [ error, setError ] = useState({
        user:'',
        password:'',
    })

    const [ showModal, setShowModal ] = useState( false )

    const [ showPassword, setShowPassword ] = useState( false )

    const navigate = useNavigate()

    const handleClickShowPassword = () => {
        setShowPassword( !showPassword )
    }

    const handleChange = ( e ) => {
        setValues({
            ...values,
            [ e.target.name ] : e.target.value
        })
    }
    const handleClose = () => {
        setShowModal(false)
    }

    const handleSubmit = async( e ) => {
        e.preventDefault()
        setError( validate( values ))
        if( Object.keys( validate( values )).length === 0 ){
            const res = await axiosRequest('/Auth/login', 
                {
                    userEmail: values.user, 
                    password: values.password
                }, 
                'Post'
            )
    
            if( res.data ){
                localStorage.setItem('name', JSON.stringify(values.user))
                navigate('/dashboard')
            }else{
                setShowModal(true)
            }
        }
    }

    return (
        <div className={styles.container}>
            
            {
                showModal && (
                            <Modal>
                                    <>
                                        <ErrorOutlineIcon sx={{fontSize:'3rem', color:'#f44336', marginTop:'.8rem'}} />
                                        <h3 className={ stylesModal.modalTitle }>USUARIO NO ENCONTRADO</h3>
                                        <button onClick={ handleClose } className={stylesModal.modalBtn}>
                                        Aceptar
                                        </button>
                                    </>
                            </Modal>
                )
            }
            <form onSubmit={ handleSubmit } className= { styles.form }>
                <h1 className= { styles.title }>Bienvenido</h1>
                <img className= { styles.image } width='100px' alt='logo'
                    src='https://www.brivesoluciones.com/wp-content/uploads/2020/06/cropped-ico-brive.png' />
                <FormControl sx={{ m: 1, width: '300px' }} variant="filled">
                <InputLabel style={{ marginTop:'-7px'}} htmlFor="outlined-adornment-password">Email</InputLabel>
                <OutlinedInput
                    sx={{backgroundColor:'white', marginBottom:'10px'}}
                    id="outlined-adornment-password"
                    type= 'text'
                    value={ values.user }
                    onChange={ handleChange }
                    name= 'user'
                    endAdornment={
                    <InputAdornment position="end">
                        <EmailIcon
                            edge="end"
                        >
                        </EmailIcon>
                    </InputAdornment>
                    }
                />
                { 
                    error.user && <p style={{margin:'-7px 0', color:'#CB4335'}}>{ error.user }</p>
                }
                </FormControl>

                <FormControl sx={{ m: 1, width: '300px' }} variant="filled">
                <InputLabel style={{ marginTop:'-7px'}}>Contraseña</InputLabel>
                <OutlinedInput
                    sx={{backgroundColor:'white', marginBottom:'10px'}}
                    id="outlined-adornment-password"
                    type={ showPassword ? 'text' : 'password'}
                    value={ values.password }
                    onChange={ handleChange }
                    name= 'password'
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={ handleClickShowPassword } 
                            edge="end"
                        >
                        { showPassword ? <VisibilityOff /> : <Visibility />} 
                        </IconButton>
                    </InputAdornment>
                    }
                />
                { 
                    error.password && <p style={{margin:'-7px 0', color:'#CB4335'}} >{ error.password }</p>
                }
                </FormControl>
                <button className={styles.button} >Login</button>
            </form>
        
        </div>
  )
}

export default Login