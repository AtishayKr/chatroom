import {object, string} from 'yup';

let loginSchema = object({
  name: string().required('Please enter your name'),
  email: string()
    .required('please enter your email')
    .email('Please enter valid email'),
});

export default loginSchema;
