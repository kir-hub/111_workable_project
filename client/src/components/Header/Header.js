import React from 'react';
import styles from './Header.module.sass';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CONSTANTS, { PHONE_NUMBER } from '../../constants';
import {
  getUserAction,
  clearUserStore,
  headerRequest,
} from '../../actions/actionCreator';
import LinkLogo from '../LinkLogo/index';
import NameIdeas from './ulsForHeader/NameIdeas';
import Constests from './ulsForHeader/Constests';
import OurWork from './ulsForHeader/OurWork';
import NamesForSale from './ulsForHeader/NamesForSale';
import Blog from './ulsForHeader/blog';
import Chat from '../Chat/ChatComponents/Chat/Chat'

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      menuActive: true,
    }
  }
 
  componentDidMount() {
    if (!this.props.data) { //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.props.getUser();
    }
  }

  logOut = () => {
    localStorage.clear();
    this.props.clearUserStore();
    
  };

  setMenuActive = () =>{  
    this.setState({
      menuActive: !this.state.menuActive
    })
  }

 
  renderLoginButtons = () => {
    if (this.props.data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                this.props.data.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${this.props.data.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${this.props.data.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt="menu"
            />
            <ul>
              <li>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/account" style={{ textDecoration: 'none' }}>
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
              <Link to="/login" onClick={this.logOut} style={{ textDecoration: 'none' }}>
                <span className={styles.btn}>Logout</span>
              </Link>
                
              </li>
            </ul>
          </div>
          <img
            
            src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
            className={styles.emailIcon}
            alt="email"
          />
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <span className={styles.btn}>LOGIN</span>
          </Link>
          <Link to="/registration" style={{ textDecoration: 'none' }}>
            <span className={styles.btn}>SIGN UP</span>
          </Link>
        </>
      );
    }
  };

  render() {
    if (this.props.isFetching) {
      return null;
    }
    return (
      <div className={styles.headerContainer}>
        <div className={styles.fixedHeader}>
          <span className={styles.info}>
            Squadhelp recognized as one of the Most Innovative Companies by Inc
            Magazine.
          </span>
          <a href="http://www.google.com">Read Announcement</a>
        </div>
        <div className={styles.loginSignnUpHeaders}>
          <a href={`tel:${PHONE_NUMBER}`} className={styles.numberContainer}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
            <span>&nbsp;&nbsp;{PHONE_NUMBER}</span>
          </a>
          <div className={styles.userButtonsContainer}>
            {this.renderLoginButtons()}
          </div>
        </div>
        <div className={styles.navContainer}>
          <LinkLogo className={styles.logo} alt="blue_logo" />
          <div className={styles.leftNav}>


            <div className={styles.hamburger} onClick={() => this.setMenuActive()}>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </div>

            <div className={this.state.menuActive ? styles.nav : styles.active} >
              <ul className={styles.menu}>
                <NameIdeas /> 
                <Constests />
                <OurWork />
                <NamesForSale />
                <Blog />
              </ul>
            </div>
            {this.props.data && this.props.data.role !== CONSTANTS.CREATOR && (
              <Link to='/startContest' style={{textDecoration: "none"}}><div className={styles.startContestBtn}  >
              START CONTEST
            </div></Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.userStore;
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(headerRequest()),
    clearUserStore: () => dispatch(clearUserStore()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
