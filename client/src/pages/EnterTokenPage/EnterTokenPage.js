import React from 'react';
import EnterTokenForm from '../../components/EnterTokenForm/EnterTokenForm';
import Logo from '../../components/Logo';
import styles from '../LoginPage/LoginPage.module.sass';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';

const EnterTokenPage = (props) => {

  const changeRoute = () => {
    props.history.replace('/');
  };
  
  return (
    <div className={ styles.mainContainer }>
      <div className={ styles.loginContainer }>
        <div className={ styles.headerSignUpPage }>
          <Logo src={ `${ CONSTANTS.STATIC_IMAGES_PATH }logo.png` } alt="logo"/>
          <div className={ styles.linkLoginContainer }>
            
          </div>
        </div>
        <div className={ styles.loginFormContainer }>
           <EnterTokenForm /> {/*changeRoute={ changeRoute } */}
        </div>
      </div>
    </div>
  );

};

const mapDispatchToProps = (dispatch) => {
  return {
    clearError: () => dispatch(clearErrorSignUpAndLogin()),
  };
};

export default connect(null, mapDispatchToProps)(EnterTokenPage);