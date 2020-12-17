import * as yup from 'yup';
export default yup.object().shape({
    username: yup
    .string()
    .required('username is required')
    .min(3, 'username must be at least 3 characters long'),
    email: yup
    .string()
    .email('must be an email')
    .required('must be a valid email address'),
    password: yup
    .string()
    .required('AYE! That password is invalid! >:C'),
    tos: yup.boolean()
    .oneOf([true], "You must accept Terms and Conditions"),
});