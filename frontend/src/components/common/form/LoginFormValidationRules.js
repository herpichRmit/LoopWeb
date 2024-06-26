export default function validate(values) {
  let errors = {};

  // add validation for name
  

  // Need to figure out a way so that this is only called on register, not login or there will be an error
  // if (!values.name) {
  //   errors.name = 'Name is required';
  // }
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 4) {
    errors.password = 'Password must be 8 or more characters';
  }
  return errors;
};
