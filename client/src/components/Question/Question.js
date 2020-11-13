import React from 'react'
import faq from '../RegistrationForm/registrationJSON/RegistrationPage.json';
import styles from '../../pages/RegistrationPage/RegistrationPage.module.sass'

export default function Question(props) {


    const {header, body} = props

    const faqElements = faq.map((question, index) => (
        <div key={index}>
          <div className={styles.headerArticle}>{question.header}</div>
          <div className={styles.article}>{question.body}</div>
        </div>
    ));

    return (
        <div>
            {faqElements}
            <div className={styles.headerArticle}>
    I have other questions! How can I get in touch with Squadhelp?
  </div>
  <div className={styles.article}>
    Check out our <a href='#'><span className={styles.orangeSpan}>FAQs</span></a> or
    send us a <a href='#'><span className={styles.orangeSpan}>message</span></a>. For
    assistance with launching a contest, you can also call us at (877)
    355-3585 or schedule a{' '}
    <a href='#'><span className={styles.orangeSpan}>Branding Consultation</span></a>
  </div>
        </div>
    )
}