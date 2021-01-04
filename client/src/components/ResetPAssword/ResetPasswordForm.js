import FormInput from '../FormInput/FormInput';
import styles from './ResetPassword.module.sass';
import { authActionResetPass, clearAuth } from '../../actions/actionCreator';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import CONSTANTS from '../../constants';
import customValidator from '../../validators/validator';
import Schems from '../../validators/validationSchems';
import Error from '../Error/Error';








class ResetPasswordForm extends React.Component{

  

   clicked = (values) => {
          this.props.resetPasswordRequest({ 
            email: values.email,
            password: values.password,
          });
        };



  render () {
    const {handleSubmit, submitting } = this.props;
    
  
  const formInputClasses = {
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
          valid: styles.valid,
        };

      return (
          <div className={ styles.signUpFormContainer}>
        
        <h2> RESET PASSWORD</h2>
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


// const mapStateToProps = (state) => {
// return { 
//   auth: state.auth,
  
// };
// };

const mapDispatchToProps = (dispatch) => (
  {
      resetPasswordRequest: (data) => dispatch(authActionResetPass(data)),
      // authClear: () => dispatch(clearAuth()),
  }
);

export default connect(/*mapStateToProps,*/null,  mapDispatchToProps)(reduxForm({
  form: 'login',//'resetPassword'
  validate: customValidator(Schems.ResetPassSchem),
})(ResetPasswordForm));



