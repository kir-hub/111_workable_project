import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header';

import Footer from '../../components/Footer/Footer';
import Steps from './Faqs/steps/steps';
import Asks from './Faqs/asks/Asks';
import HowWorkFaq from './Faqs/howWorkFaq/HowWorkFaq';
import SpinnerLoader from '../../components/Spinner/Spinner';
import styles from './LearnSquadHelp.module.sass'
import GetInTouch from './Faqs/GetInTouch/GetInTouTouch';
import {connect} from 'react-redux';



const LearnSquadHelp = (props) => {

    const {isFetching} = props;

    

    

    return(
        <>
            <Header/>
            {isFetching ? <SpinnerLoader/> : (<>
            
            <div className={styles.bodyCont}>
                <div className={styles.videoCont}>
                    <span className={styles.videoSpan}> 
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/5qap5aO4i9A" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </span> 
                    <span className={styles.howWorkFaqCont}> <HowWorkFaq/> </span>
                 
                </div>


                <Steps/>
                
                <div className={styles.contestCont}>
                    <Link className={styles.buttonLink} to="/startContest">START A CONTEST </Link> 
                    </div>
                <div className={styles.questionsCont}>
                    <Asks/>
                </div>

                
                </div>
                <GetInTouch/>
                <Footer/>
                
                </>)}
        </>
    )
}


const mapStateToProps = (state) => {
    const {isFetching} = state.userStore;
    return {isFetching};
};

export default connect(mapStateToProps, null)(LearnSquadHelp);
