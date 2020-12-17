import React from 'react';

export default function MemberForm(props) {
    const {values, update, submit, disabled, errors } = props;

    const updateForm = evt => {
        const {name, value, type, checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        update(name, valueToUse);
    }

    const onSubmit = evt => {
        evt.preventDefault();
        submit();
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form inputs'>
                <label>
                    Username:
                    <input
                    name='username' 
                    type='username' 
                    value={values.username} 
                    onChange={updateForm}
                    placeholder='Username...'
                    maxLength='36'>
                    </input>
                </label>
                <br/>
                <label>
                    Email:
                    <input
                    name='email'
                    type='email'
                    value={values.email}
                    onChange={updateForm}
                    placeholder='Email...'
                    maxLength='36'>
                    </input>
                </label>
                <br/>
                <label>
                    Password:
                    <input 
                    name='password'
                    type='password'
                    value={values.password}
                    onChange={updateForm}
                    placeholder='Password...'
                    />
                </label>
                <br/>
                <label>
                    Terms of Service: 
                    <input 
                    type='checkbox'
                    name='tos'
                    checked={values.tos}
                    onChange={updateForm}
                    />
                </label>
                <div className='submit'>
                    <button disabled={disabled}>Submit</button>
                    <div className='errors'>
                    <div>{errors.username}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    </div>
                </div>
            </div>
        </form>

    )


}