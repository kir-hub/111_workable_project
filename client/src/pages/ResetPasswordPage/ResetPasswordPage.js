import React from 'react'
import Logo from '../../components/Logo';
import ResetPasswordForm from '../../components/ResetPAssword/ResetPasswordForm'
import styles from './ResetPaswordPAge.module.sass';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants';
import { connect } from 'react-redux';

import { clearErrorResetPass } from '../../actions/actionCreator';


const ResetPasswordPage = (props) => {

    props.clearError();

    const changeRoute = () => {
      props.history.replace('/');
    };






    return (
        <div className={ styles.signUpPage }>




      <div className={styles.signUpContainer}>
        <div className={ styles.headerSignUpPage }>
          
          <Logo src={ `${ CONSTANTS.STATIC_IMAGES_PATH }logo.png` }/>
          <div className={ styles.linkLoginContainer }>
            <Link to='/login' style={ {textDecoration: 'none'} }><span>Login</span></Link>
          </div>
        </div>
        <ResetPasswordForm changeRoute={ changeRoute }/>
      </div>
      
           
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearError: () => dispatch(clearErrorResetPass()),
  };
};

export default connect(null, mapDispatchToProps)(ResetPasswordPage);