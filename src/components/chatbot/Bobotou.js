import React, { useState } from "react";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

  function Bobotou(props) {
    
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
                headerTitle="Lt Patricia Bot's office"
                speechSynthesis={{ enable: false, lang: 'en' }}
                steps={[
                    {
                    id: '1',
                    message: 'Good evening !  I am Lt Patricia Bot from Los Bastos Police Department. What can I do for you ?',
                    trigger: '2',
                    },
                    {
                        id: '2',
                        options: [
                        { value: 1, label: 'Directly contact the headquarter.', trigger: '3' },
                        { value: 2, label: 'Investigate on a subject.', trigger: '4' },
                        { value: 3, label: 'Conspirate...', trigger: '5' },
                        ],
                    },
                    {
                    id: '3',
                    message: "Ok, let's contact Vincent",
                    end: true,
                    },
                    {
                    id: '4',
                    message: 'What would you like to investigate on ?',
                    end: true,
                    },
                    {
                    id: '5',
                    message: "Hooo, I see... What would you like to conspirate about ?",
                    trigger: '50',
                    },
                    {
                        id: '50',
                        options: [
                        { value: 1, label: 'I would like to overthrow the government.', trigger: '3' },
                        { value: 2, label: 'Earth might not be so round... you see...', trigger: '70' },
                        { value: 3, label: 'I feel I am surrounded by stranger forces...', trigger: '150' },
                        ],
                    },
                    {
                        id: '150',
                        message: "Hum... sometimes I do so. What do you think they are ?",
                        trigger: '250',
                    },
                    {
                        id: '250',
                        options: [
                        { value: 1, label: 'I think they are not from here... they are from an outer space.', trigger: '350' },
                        { value: 2, label: "I'm sure they are deaths, and they want to eat me.", trigger: '450' },
                        { value: 3, label: 'I feel they are communists.', trigger: '550' },
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
                        message: "OK. That's an emergency. Would you like to contact Vincent about this ?",
                        trigger: '650',
                    },
                    {
                        id: '650',
                        options: [
                        { value: 1, label: 'Yes. Of course. Private R.H.Barnes reporting for duty.', trigger: '350' },
                        { value: 2, label: "Hum. Don,t you think is a commmunist too ?", trigger: '750' }
                        ],
                    },
                    {
                        id: '750',
                        message: "Ohhh you my boy, you sure like to conspirate... any other subject you'd like to conspirate with ?",
                        trigger: '850',
                    },
                    {
                        id: '850',
                        options: [
                        { value: 1, label: "Yes... don't you think earth is kinda... flat ?", trigger: '70' },
                        { value: 2, label: "Let's conspirate against the governement...", trigger: '450' }
                        ],
                    },
                    {
                        id: '70',
                        message: "Sure... it's not round ! But where goes water when it reaches the edges ?",
                        trigger: '170',
                    },
                    {
                        id: '170',
                        options: [
                        { value: 1, label: "It falls into space. Didn't you know that ?", trigger: '350' },
                        { value: 2, label: "It evaporates and that's how clouds are created", trigger: '450' }
                        ],
                    },
                ]}
                />
            </ThemeProvider>
        </div>
    );
}

export default Bobotou;