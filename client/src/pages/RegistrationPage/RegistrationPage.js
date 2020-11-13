import React from 'react';
import Logo from '../../components/Logo';
import RegistrationForm
  from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.sass';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';

//import faq from '../../components/RegistrationForm/registrationJSON/RegistrationPage.json';
import Question from '../../components/Question/Question';


const RegistrationPage = (props) => {
  props.clearError();

  const changeRoute = () => {
    props.history.replace('/');
  };

  return (
    <div className={ styles.signUpPage }>
      <div className={ styles.signUpContainer }>
        <div className={ styles.headerSignUpPage }>
          <Logo src={ `${ CONSTANTS.STATIC_IMAGES_PATH }logo.png` }/>
          <div className={ styles.linkLoginContainer }>
            <Link to='/login'
                  style={ {textDecoration: 'none'} }><span>Login</span></Link>
          </div>
        </div>
        <RegistrationForm changeRoute={ changeRoute }/>
      </div>
      <div className={ styles.footer }>
      <div className={styles.articlesMainContainer}>

<div className={styles.ColumnContainer}>


  {/* {faqElements} 
     <Question key={index} body={question.body} header={question.header}/>*/}


    <Question/> 
  
</div>

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

export default connect(null, mapDispatchToProps)(RegistrationPage);