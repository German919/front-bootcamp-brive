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

const validate = ( value ) => {

    const error = {}
    const regEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/

    if( !value.user ){
        error.user = 'required user'
    }else if(!regEmail.test(value.user)){
        error.user ='invalid field'
    }

    if( !value.password ){
        error.password = 'required password'
    }else if( Object.values(value.password).length <= 6 ){
        error.password = 'password must have more than 6 characters'
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
    const [ showPassword, setShowPassword ] = useState( false )

    const handleClickShowPassword = () => {
        setShowPassword( !showPassword )
    }

    const handleChange = ( e ) => {
        setValues({
            ...values,
            [ e.target.name ] : e.target.value
        })
    }

    const handleSubmit = ( e ) => {
        e.preventDefault()
        setError( validate( values ))
        if( Object.keys( validate( values )).length === 0 )
            console.log( values )
    }

    return (
        <div className={styles.container}>
            
            <form onSubmit={ handleSubmit } className= { styles.form }>
                <h1 className= { styles.title }>Welcome</h1>
                <img className= { styles.image } width='100px' alt='logo'
                    src='https://www.brivesoluciones.com/wp-content/uploads/2020/06/cropped-ico-brive.png' />
                <FormControl sx={{ m: 1, width: '300px' }} variant="filled">
                <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
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
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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