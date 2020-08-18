import React, {useEffect, useState} from 'react';
import axiosWithAuth from '../Utils/axiosWithAuth';
import {v4 as uuidv4} from 'uuid';

const initialForm = {
    id: uuidv4(),
    name: '',
    age: '',
    email: ''
}

export default function Dashboard() {
const [friends, setFriends] = useState([]);
const [form, setForm] = useState(initialForm);
const [editing, setEditing] = useState({
    is: false,
    id: 0
});

const onChange = event => {
const {name, value} = event.target;
setForm({
    ...form,
    [name]: value
})
}

const edit = id => {
setEditing({
    is: true,
    id: id
});
setForm(friends.find(friend => friend.id === id));
}

const onSubmit = event => {
event.preventDefault();
setForm({
    ...form,
    id: uuidv4()
});

if (editing) {
axiosWithAuth()
    .put(`/api/friends/${editing.id}`, form)
    .then(res => setFriends(res.data))
    .catch(err => console.log(err));
setEditing({
    ...editing,
    is: false
});
setForm(initialForm)
}
else {
axiosWithAuth()
    .post('/api/friends', form)
    .then(res => setFriends(res.data))
    .catch(err => console.log(err));
setForm(initialForm)
}
}

useEffect(() => {
    axiosWithAuth()
        .get('/api/friends')
        .then(res => {
            setFriends(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}, [])

    return (
        <div className='dashboard'>
            <h3>Your Dashboard</h3>
            <div className='friendsContainer'>
                <div className='friends'>
                    <h3>Friends list</h3>
                    {friends.map(friend => {
                        return (
                            <div className='friendCard'>
                            <p>{friend.name}</p>
                            <span>{`ID: ${friend.id}`}</span>
                            <button onClick={event => {
                                event.preventDefault();
                                edit(friend.id)
                            }}>Edit</button>
                            </div>
                        )
                    })}
                </div>

                <div className='addfriend'>
                    <h3>{editing.is ? ('Edit Friend') : ('Add Friend')}</h3>
                        <form>
                        <label>Name: </label>
                        <input
                            name='name'
                            type='text'
                            value={form.name}
                            onChange={onChange}
                        ></input>
                        <label>Age: </label>
                        <input
                            name='age'
                            type='number'
                            value={form.age}
                            onChange={onChange}
                        ></input>
                        <label>Email: </label>
                        <input
                            name='email'
                            type='text'
                            value={form.email}
                            onChange={onChange}
                        ></input>
                        <button onClick={onSubmit}>{editing.is ? ('Submit Edit') : ('Submit')}</button>
                        </form>
                </div>
            </div>
        </div>
    )
}
