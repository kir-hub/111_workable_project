import FormInput from '../FormInput/FormInput';
import styles from './ResetPassword.module.sass';
import { authActionResetPass, clearAuth } from '../../actions/actionCreator';


import React from 'react';

import { connect } from 'react-redux';



import { Field, reduxForm } from 'redux-form';

import CONSTANTS from '../../constants';
import customValidator from '../../validators/validator';
import Schems from '../../validators/validationSchems';







class ResetPasswordForm extends React.Component{

  componentWillUnmount () {
    this.props.authClear();
  }

   clicked = (values) => {
          this.props.resetPass({ //пропс не знает что он пропс
            email: values.email,
            password: values.password,
          });
        };



  render () {
  const {handleSubmit, submitting, auth, authClear} = this.props;
  
  const formInputClasses = {
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
          valid: styles.valid,
        };

       


      return (
          <div className={ styles.signUpFormContainer}>


      <form onSubmit={ handleSubmit(this.clicked) } >
      <div className={ styles.row }>
          <Field
            name='email'
            classes={ formInputClasses }
            component={ FormInput }
            type='text'
            label='Email Address'
          />
          </div>
      <div className={ styles.row }>
          <Field
            name='password'
            classes={ formInputClasses }
            component={ FormInput }
            type='password'
            label='Password'
          />
          
          </div>
          <button type='submit' disabled={ submitting }
                className={ styles.submitContainer }>
          <span className={ styles.inscription }>Reset password</span>
        </button>
      </form>
          </div>

          
      )
  
}
}


const mapStateToProps = (state) => {
return {
  auth: state.auth,
  initialValues: {
    role: CONSTANTS.CUSTOMER,
  },
};
};

const mapDispatchToProps = (dispatch) => (
  {
      resetPass: (data) => dispatch(authActionResetPass(data)),
      authClear: () => dispatch(clearAuth()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'login',
  validate: customValidator(Schems.ResetPassSchem),
})(ResetPasswordForm));



// export  function ResetPasswordForm(props) {



    
//     const {handleSubmit, submitting, auth, authClear} = props;
    
//     const formInputClasses = {
//             container: styles.inputContainer,
//             input: styles.input,
//             warning: styles.fieldWarning,
//             notValid: styles.notValid,
//             valid: styles.valid,
//           };

//     const clicked = (values) => {
//         props.resetPass({ //пропс не знает что он пропс
//               email: values.email,
//               password: values.password,
//             });
//           };


//         return (
//             <div className={ styles.signUpFormContainer}>


//         <form onSubmit={ handleSubmit(clicked) }>
//         <div className={ styles.row }>
//             <Field
//               name='email'
//               classes={ formInputClasses }
//               component={ FormInput }
//               type='text'
//               label='Email Address'
//             />
//             </div>
//         <div className={ styles.row }>
//             <Field
//               name='password'
//               classes={ formInputClasses }
//               component={ FormInput }
//               type='password'
//               label='Password'
//             />
//             <Field
//               name='confirmPassword'
//               classes={ formInputClasses }
//               component={ FormInput }
//               type='password'
//               label='Password confirmation'
//             />
//             </div>
//             <button type='submit' disabled={ submitting }
//                   className={ styles.submitContainer }>
//             <span className={ styles.inscription }>Reset password</span>
//           </button>
//         </form>
//             </div>
//         )
    
// }


// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth,
//     initialValues: {
//       role: CONSTANTS.CUSTOMER,
//     },
//   };
// };

// const mapDispatchToProps = (dispatch) => (
//     {
//         resetPass: (data) => dispatch(authActionResetPass(data)),
//         authClear: () => dispatch(clearAuth()),
//     }
//   );

//   export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
//     form: 'login',
//     validate: customValidator(Schems.ResetPassSchem),
//   })(ResetPasswordForm));

