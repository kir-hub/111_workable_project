import React from 'react';
import { connect } from 'react-redux';
import { authActionLogin, clearAuth } from '../../actions/actionCreator';
import { Redirect } from 'react-router-dom';
import styles from './LoginForm.module.sass';

import { Field, reduxForm } from 'redux-form';
import FormInput from '../FormInput/FormInput';
import customValidator from '../../validators/validator';
import Schems from '../../validators/validationSchems';
import Error from '../../components/Error/Error';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component{

  componentWillUnmount () {
    this.props.authClear();
  }

  clicked = (values) => {
    this.props.loginRequest(values);
  };

  render () {
    const {error, isFetching} = this.props.auth;
    const {handleSubmit, submitting, authClear} = this.props;

    const formInputClasses = {
      container: styles.inputContainer,
      input: styles.input,
      warning: styles.fieldWarning,
      notValid: styles.notValid,
      valid: styles.valid,
    };
 
    return (
      <div className={ styles.loginForm }>
        { error && <Error data={ error.data } status={ error.status }
                          clearError={ authClear }/> }
        <h2>LOGIN TO YOUR ACCOUNT</h2>
        <form onSubmit={ handleSubmit(this.clicked) }>
          <Field
            name='email'
            classes={ formInputClasses }
            component={ FormInput }
            type='text'
            label='Email Address'
          />
          <Field
            name='password'
            classes={ formInputClasses }
            component={ FormInput }
            type='password'
            label='password'
          />
          <button type='submit' disabled={ submitting }
                  className={ styles.submitContainer }>
            <span className={ styles.inscription }>{ isFetching
              ? 'Submitting...'
              : 'LOGIN' }</span>
          </button>
        </form>
        
        <Link className={styles.button} to="/resetPass"> Forgot Password? </Link>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //const {auth} = state;
  return {auth: state.auth} ;
};

const mapDispatchToProps = (dispatch) => (
  {
    loginRequest: (data) => dispatch(authActionLogin(data)),
    authClear: () => dispatch(clearAuth()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'login',
  validate: customValidator(Schems.LoginSchem),
})(LoginForm)); 