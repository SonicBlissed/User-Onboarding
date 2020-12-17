import React from 'react';

export default function Member(props) {
    const {details} = props
    return (
        <div className='member container'>
            <h2>{details.first_name}{details.username} {details.last_name}</h2>
            <p>Email: {details.email}</p>
            
        </div>
    )
}