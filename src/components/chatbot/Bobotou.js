import React, { useState } from "react";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import {useTranslation} from "react-i18next";

  function Bobotou(props) {
    const {t} = useTranslation('common');
    //const [isShown, setIsShown] = useState(false);
    let [state, setState] = useState({        
        answer: "Welcome ! I'm Lt Clark Bot from SAPD's office !",
        meeting: {
            a: "I've got no time to loose, get me a contact form.",
            b: "Good morning, Lt Clark. How are you today ?",
            c: "I'd like to open a case"
        },
        question1: {
            litterature: "happy",
            a: "Nice to meet you !",
            b: "Very pleased someone's here... that's quite dark here !",
            c: "Ho, a friend !"
        }
    });

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
                botAvatar=  'bot.png'
                userAvatar=  'barnes.png'
                headerTitle={t('contact.baseline')}
                speechSynthesis={{ enable: false, lang: 'en' }}
                steps={[
                    {
                    id: '1',
                    message: t('contact.1message'),
                    trigger: '2',
                    },
                    {
                        id: '2',
                        options: [
                        { value: 1, label: t('contact.2v1'), trigger: '3' },
                        { value: 2, label: t('contact.2v2'), trigger: '4' },
                        { value: 3, label: t('contact.2v3'), trigger: '5' },
                        ],
                    },
                    {
                    id: '3',
                    message: t('contact.3message'),
                    end: true,
                    },
                    {
                    id: '4',
                    message: t('contact.4message'),
                    end: true,
                    },
                    {
                    id: '5',
                    message: t('contact.5message'),
                    trigger: '50',
                    },
                    {
                        id: '50',
                        options: [
                        { value: 1, label: t('contact.50v1'), trigger: '3' },
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
                        { value: 1, label: t('contact.250v1'), trigger: '350' },
                        { value: 2, label: t('contact.250v2'), trigger: '450' },
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
                        { value: 1, label: t('contact.650v1'), trigger: '350' },
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
                        { value: 2, label: t('contact.850v2'), trigger: '450' }
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
                        { value: 1, label: t('contact.170v1'), trigger: '350' },
                        { value: 2, label: t('contact.170v2'), trigger: '450' }
                        ],
                    },
                ]}
                />
            </ThemeProvider>
        </div>
    );
}

export default Bobotou;