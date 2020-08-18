import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axiosWithAuth from '../Utils/axiosWithAuth';

export default function Login() {
const history = useHistory()
const [form, setForm] = useState({
    username: 'Lambda School',
    password: 'i<3Lambd4'
});
const [loading, setLoading] = useState(false);

const onSubmit = event => {
    event.preventDefault();
    setLoading(true)
    axiosWithAuth()
        .post('/api/login', form)
        .then(res => {
            localStorage.setItem('token', res.data.payload);
            setTimeout(() => {
                history.push('/dashboard');
            }, 2000)
        })
        .catch(err => {
            history.push('/login');
        })
}

return (
    <div className='login'>
        <h3>Login</h3>
        {loading ? (<p>Loading...</p>) :
        (<form>
            <label>Username: </label>
            <input
                type='text'
                value={form.username}
            ></input>
            <label>Password: </label>
            <input
                type='text'
                value={form.password}
            ></input>
            <button onClick={onSubmit}>Login</button>
        </form>)
        }   
    </div>
)
}
