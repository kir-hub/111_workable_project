import React from 'react';
import { connect } from 'react-redux';
import { authActionLogin, executePasswordAction } from '../../actions/actionCreator';
import { Redirect } from 'react-router-dom';
import styles from './EnterTokenForm.module.sass';

import { Field, reduxForm } from 'redux-form';
import FormInput from '../FormInput/FormInput';
//import customValidator from '../../validators/validator';

import Error from '../../components/Error/Error';


class EnterTokenForm extends React.Component{

  

  clicked = (values) => {
    this.props.executePasswordRequest(values);
  };

  render () {
    
    const {handleSubmit, submitting} = this.props;

    const formInputClasses = {
      container: styles.inputContainer,
      input: styles.input,
      warning: styles.fieldWarning,
      notValid: styles.notValid,
      valid: styles.valid,
    };
 
    return (
      
      <div className={ styles.loginForm }>
        

        <h2>ENTER TOKEN</h2>
        <form onSubmit={ handleSubmit(this.clicked) }>
          <Field
            name='token'
            classes={ formInputClasses }
            component={ FormInput }
            type='text'
            label='token'
          />
          <button type='submit' disabled={ submitting }
                  className={ styles.submitContainer }>
            <span className={ styles.inscription }>{'SUBMIT' }</span>
          </button>
        </form>
        

      </div>


    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    executePasswordRequest: (data) => dispatch(executePasswordAction(data)),
    
  }
);

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'login',//'enterToken'
  
})(EnterTokenForm)); 
