import React, { useState, useEffect } from "react";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import {useTranslation} from "react-i18next";
import PropTypes from 'prop-types';

function Bobotou(props) {
    const {t} = useTranslation('common');
    //const [isShown, setIsShown] = useState(false);

    const steps=[
        {
        id: '1',
        message: t('contact.1message'),
        trigger: '2',
        },
        {
            id: '2',
            options: [
            { value: 1, label: t('contact.2v1'), trigger: '3' },
            { value: 3, label: t('contact.2v3'), trigger: '5' },
            ],
        },
        {
        id: '3',
        message: t('contact.3message'),
        trigger: 'name',
        },
        {
        id: '5',
        message: t('contact.5message'),
        trigger: '50',
        },
        {
            id: '50',
            options: [
            { value: 1, label: t('contact.50v1'), trigger: '30' },
            { value: 2, label: t('contact.50v2'), trigger: '70' },
            { value: 3, label: t('contact.50v3'), trigger: '150' },
            ],
        },
        {
            id: '150',
            message: t('contact.150message'),
            trigger: '250',
        },
        {
            id: '250',
            options: [
            { value: 2, label: t('contact.250v2'), trigger: '890' },
            { value: 3, label: t('contact.250v3'), trigger: '550' },
            ],
        },
        {
            id: '350',
            message: "Hum... sometimes I do so. What do you think they are ?",
            trigger: '250',
        },
        {
            id: '450',
            message: "Hum... sometimes I do so. What do you think they are ?",
            trigger: '250',
        },
        {
            id: '550',
            message: t('contact.550message'),
            trigger: '650',
        },
        {
            id: '650',
            options: [
            { value: 1, label: t('contact.650v1'), trigger: '3' },
            { value: 2, label: t('contact.650v2'), trigger: '750' }
            ],
        },
        {
            id: '750',
            message: t('contact.750message'),
            trigger: '850',
        },
        {
            id: '850',
            options: [
            { value: 1, label: t('contact.850v1'), trigger: '70' },
            { value: 2, label: t('contact.850v2'), trigger: '230' },
            { value: 3, label: t('contact.850v3'), trigger: '3' }
            ],
        },
        {
            id: '70',
            message: t('contact.70message'),
            trigger: '170',
        },
        {
            id: '170',
            options: [
            { value: 1, label: t('contact.170v1'), trigger: '270' },
            { value: 2, label: t('contact.170v2'), trigger: '1010' }
            ],
        },
        {
            id: '270',
            message: t('contact.70message'),
            trigger: '170',
        },
        {
            id: '370',
            message: t('contact.70message'),
            trigger: '170',
        },
        {
            id: '470',
            options: [
            { value: 1, label: t('contact.470v1'), trigger: '270' },
            { value: 2, label: t('contact.470v2'), trigger: '370' }
            ],
        },
        {
            id: '30',
            message: t('contact.30message'),
            trigger: '130',
        },
        {
            id: '130',
            options: [
            { value: 1, label: t('contact.130v1'), trigger: '230' },
            { value: 2, label: t('contact.130v2'), trigger: '150' }
            ],
        },
        {
            id: '230',
            message: t('contact.230message'),
            trigger: '330',
        },
        {
            id: '330',
            options: [
            { value: 1, label: t('contact.330v1'), trigger: '430' },
            { value: 2, label: t('contact.330v2'), trigger: '530' }
            ],
        },
        {
            id: '430',
            message: t('contact.430message'),
            trigger: '730',
        },
        {
            id: '530',
            message: t('contact.530message'),
            trigger: '630',
        },
        {
            id: '630',
            options: [
            { value: 1, label: t('contact.630v1'), trigger: '3' },
            { value: 2, label: t('contact.630v2'), trigger: '70' }
            ],
        },
        {
            id: '730',
            options: [
            { value: 1, label: t('contact.730v1'), trigger: '3' },
            { value: 2, label: t('contact.730v2'), trigger: '150' }
            ],
        },
        {
            id: '270',
            message: t('contact.270message'),
            trigger: '470',
        },
        {
            id: '370',
            message: t('contact.370message'),
            trigger: '630',
        },
        {
            id: '470',
            options: [
            { value: 1, label: t('contact.470v1'), trigger: '230' },
            { value: 2, label: t('contact.470v2'), trigger: '3' }
            ],
        },
        {
            id: '890',
            message: t('contact.890message'),
            trigger: '990',
        },
        {
            id: '990',
            options: [
            { value: 1, label: t('contact.990v1'), trigger: '3' },
            { value: 2, label: t('contact.990v2'), trigger: '70' }
            ],
        },
        {
            id: '1010',
            message: t('contact.1010message'),
            trigger: '1020',
        },
        {
            id: '1020',
            options: [
            { value: 1, label: t('contact.1020v1'), trigger: '1030' },
            ],
        },
        {
            id: '1030',
            message: t('contact.1030message'),
            trigger: '250',
        },
        {
            id: 'name',
            user: true,
            trigger: '01',
            validator: (value) => {
                if (typeof value !== "string") {
                  return t('validation.name1');
                }
                else if (value.length > 60) {
                  return t('validation.name2'); 
                }
                return true;
            }
        },
        {
            id: '01',
            message: t('contact.01message'),
            trigger: 'email',
        },
        {
            id: 'email',
            user: true,
            trigger: '02',
            validator: (value) => {
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
                    return true;
                }
                return t('validation.mail');
            }
        },
        {
            id: '02',
            message: t('contact.subject'),
            trigger: 'subject',
        },
        {
            id: 'subject',
            user: true,
            trigger: '03',
            validator: (value) => {
                if (typeof value !== "string") {
                  return t('validation.subject1');
                }
                else if (value.length > 50) {
                  return t('validation.subject2'); 
                }
                return true;
            }
        },
        {
            id: '03',
            message: t('contact.02message'),
            trigger: 'message',
        },
        {
            id: 'message',
            user: true,
            trigger: '04',
            validator: (value) => {
                if (typeof value !== "string") {
                  return t('validation.text');
                }
                else if (value.length > 2000) {
                  return t('validation.text2'); 
                }
                return true;
            }
        },
        {
            id: '04',
            component: <Review />,
            asMessage: true,
            trigger: '05',
        },
        {
            id: '05',
            message: t('contact.03message'),
            end: true,
        }
    ]

    //console.log(steps)

    const theme = {
        background: '#000000',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#000000',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: '#ffffff',
        botFontColor: '#000000',
        userBubbleColor: 'darkgrey',
        userFontColor: '#ffffff',
        width: '100%'
    };

    return (
        <div className="bobotou-container">
            <ThemeProvider theme={theme}>
                <ChatBot
                key={props.btRefresh}
                botAvatar=  'bot.png'
                userAvatar=  'barnes.png'
                headerTitle={t('contact.baseline')}
                speechSynthesis={{ enable: false, lang: 'en' }}
                steps={steps}
                />
            </ThemeProvider>
        </div>
    );
}

const Review = (props)  => {
    const [state, setState] = useState({ name: '', subject: '', email: '', message: ''});
    const {t} = useTranslation('common');

    useEffect(() => {
      const { steps } = props;
      const { name, subject, email, message } = steps;
      setState({ name, subject, email, message });
      var formdata = new FormData();
      formdata.append("your-name", state.name.message);
      formdata.append("your-subject", state.subject.message);
      formdata.append("your-email", state.email.message);
      formdata.append("your-message", state.message.message);
  
      var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
      };
  
      fetch("https://vincentlhoste.fr/vincentlhoste/wp-json/contact-form-7/v1/contact-forms/36/feedback", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }, [props])
      
    console.log(state)

   

      const { name, subject, email, message } = state;
      return (
        <div style={{ width: '100%' }}>
          <h3>{t('contact.summarylabel')}</h3>
                <h4>{t('contact.namelabel')}</h4>
                <hr></hr>
                {name.value}<br/>
                <hr></hr>
                <h4>{t('contact.subjectlabel')}</h4>
                <hr></hr>
                {subject.value}<br/>
                <hr></hr>
                <h4>{t('contact.emaillabel')}</h4>
                <hr></hr>
                {email.value}<br/>
                <hr></hr>
                <h4>{t('contact.messagelabel')}</h4>
                <hr></hr>
                {message.value}<br/>
                <hr></hr>
        </div>
      );
  }
  
  Review.propTypes = {
    steps: PropTypes.object,
  };
  
  Review.defaultProps = {
    steps: undefined,
  };
  

export default Bobotou;