import './App.css';
import Member from './Member';
import MemberForm from './MemberForm';
import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import axios from 'axios'
import schema from './validation'


const memberList = [
 { username: 'Pickle Rick', email:'pickles@pickle.com', password: 'lickamybanana'},
];

const initialFormValues = {
  username: '',
  email: '',
  password: '',
  tos: !true
};
const initialFormErrors = {
  username: '',
  email: '',
  password: '',
}
const initialDisabled = true

export default function App() {
  const [members, setMembers] = useState(memberList);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [formErrors, setFormErrors] = useState(initialFormErrors) ;


  const updateForm = (name, value) => {
    yup.reach(schema, name).validate(value).then(() => {
       setFormErrors({
         ...formErrors, [name]: '',
       })
      })
      .catch((err) => {
       setFormErrors({
          ...formErrors, [name]: err.errors[0],
        })
    })
    setFormValues({...formValues, [name]: value});
  };


  const submitForm = evt => {
    const newMember = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    };
    
    // setMembers(members.concat(newMember));
    // setFormValues(initialFormValues);
    postNewMember(newMember)
  };

  const getMembers = () => {
    axios.get('https://reqres.in/api/users').then(res => {
      console.log(res.data)
      setMembers(res.data.data);
      setFormValues(initialFormValues);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const postNewMember = newMember => {
    axios.post('https://reqres.in/api/users', newMember).then(res =>{
      setMembers([res.data, ...members])
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  useEffect(() => {
    getMembers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => {
      setDisabled(!valid);
    })
  }, [formValues])

  return (
    <div className='container'>
      <h1> Member List </h1>
      {members.map((member) => {
        return (
          <Member key={member.id} details={member}/>
        )
      })}
      <MemberForm 
      values={formValues}
      update={updateForm}
      submit={submitForm}
      disabled={disabled}
      errors={formErrors} />

    </div>
  )
}









