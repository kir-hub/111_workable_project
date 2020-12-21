import React from 'react';
import { connect } from 'react-redux';
//import { authActionLogin, clearAuth } from '../../actions/actionCreator';
import { Redirect } from 'react-router-dom';
import styles from '../LoginForm/LoginForm.module.sass';

import { Field, reduxForm } from 'redux-form';
import FormInput from '../FormInput/FormInput';
//import customValidator from '../../validators/validator';

import Error from '../../components/Error/Error';


class EnterTokenForm extends React.Component{

  componentWillUnmount () {
    this.props.authClear();
  }

  clicked = (values) => {
    this.props.executePasswordRequest(values);
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
        <h2>ENTER TOKEN</h2>
        <form onSubmit={ handleSubmit(this.clicked) }>
          <Field
            name='email'
            classes={ formInputClasses }
            component={ FormInput }
            type='text'
            label='token'
          />
          <button type='submit' disabled={ submitting }
                  className={ styles.submitContainer }>
            <span className={ styles.inscription }>{ isFetching
              ? 'Submitting...'
              : 'SUBMIT' }</span>
          </button>
        </form>
        

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    executePasswordRequest: (data) => dispatch(executePasswordAction(data)),
    //authClear: () => dispatch(clearAuth()),
  }
);

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'login',
  //validate: customValidator(Schems.LoginSchem),
})(EnterTokenForm)); 
