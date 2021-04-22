import React from "react";
import { ReactSVG } from 'react-svg'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import {useTranslation} from "react-i18next";

function About(props) {
    const {t} = useTranslation('common');
    return (
    <div className="projets-container"
        style={{backgroundColor: "black"}}
    >
        <Link to="/" className="closing-cross">X</Link>
        <div className="container">
            <h1 className="page-title page-title-contact">{t('about.title')}</h1>
            <ReactSVG
                src="vincent.svg"
                className="illuvincent"
            />
            <div className="textvincent">
                <p>
                <span
                    style={{
                        fontStyle: "italic"
                    }}
                >
                {t('about.line1')}<br/>
                {t('about.line2')}<br/>
                {t('about.line3')}
                </span>
                <br/><br/>
                <h3>{t('about.toknow')}</h3><br/>
                <ul>
                    <li>{t('about.toknow1')}</li>
                    <li>{t('about.toknow2')}</li>
                    <li>{t('about.toknow3')}</li>
                    <li>{t('about.toknow4')}</li>
                    <li>{t('about.toknow5')}</li>
                    <li>{t('about.toknow6')}</li>
                    <li>{t('about.toknow7')}</li>
                </ul>
                <h3>{t('about.path')}</h3>
                <ul>
                    <li>{t('about.path1')}</li>
                    <li>{t('about.path2')}</li>
                    <li>{t('about.path3')}</li>
                    <li>{t('about.path4')}</li>
                </ul>
                <h3>{t('about.knowledge')}</h3>
                <ul>
                    <li>{t('about.knowledge1')}</li>
                    <li>{t('about.knowledge2')}</li>
                    <li>{t('about.knowledge3')}</li>
                </ul>
                <h3>{t('about.passions')}</h3>
                <ul>
                    <li>{t('about.passions1')}.</li>
                    <li>{t('about.passions2')}</li>
                    <li>{t('about.passions3')}</li>
                    <li>{t('about.passions4')}</li>
                    </ul>
                    {t('about.warzoneline')}
                    <br/>
                    <br/>
                    <h3>{t('about.thanks')}</h3>
                    <ul>
                        <li>{t('about.thanks1')}</li>
                        <li>{t('about.thanks2')}</li>
                        <li>{t('about.thanks3')}</li>
                        <li>{t('about.thanks4')}</li>
                        <li>{t('about.thanks5')}</li>
                        <li>{t('about.thanks6')}</li>
                    </ul>
                </p>
            </div>
        </div>
    </div>
    );
}

export default About;