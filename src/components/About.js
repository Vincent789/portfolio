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
                Ce site est expérimental, construit avec Three.js, React, Wordpress, Howler, Mongo.<br/>
                Il n'a pas vocation a être léger, lu sur tous les navigateurs mais il devrait s'en sortir sans trop de problèmes.<br/>
                C'est un patchwork des technologies que je maîtrise, parfois bien, parfois moins bien :
                </span>
                <br/><br/>
                <h3>À savoir :</h3><br/>
                <ul>
                    <li>Wordpress (habitué avec ardoise), si possible sans jamais utiliser de plugin (des fois il faut hein...).</li>
                    <li>HTML, CSS, JS, PHP, SASS, etc...</li>
                    <li>Team Debian pour ce qui est du serveur mais je ne suis pas adminsys... mais j'adore Debian :)</li>
                    <li>React.js, Vue.js, Three.js, Howler.js, et toutes sortes de choses avec .js à la fin.</li>
                    <li>La suite Adobe avec un bon niveau sur AI, AE, PS, PRPro.</li>
                    <li>Les API, Laravel, Node, Express... même si je préfère le front au back.</li>
                    <li>De la gestion de projets même si je préfère mettre la main à la pâte.</li>
                </ul>
                <h3>Pour ce qui est de mon parcours :</h3>
                <ul>
                    <li>DUT Métiers du Multimédia et de l'Internet (ancien SRC) à Chambéry.</li>
                    <li>Licence INFOCOM.</li>
                    <li>Diplomé d'un master Sénarisation de Contenus Audiovisuels Multimédias - ( 2eme année spé Médias Interactifs Numériques, Jeux).</li>
                    <li>Titre RNCP niveau 2 en cours à Épitech (donnez-le moi svp) avec équivalence niveau 3.</li>
                </ul>
                <h3>Pour ce qui est de mon expérience :</h3>
                <ul>
                    <li>Stages : Radio Craponne, ALTAL éditions, PLF Events, La Société des Apaches, Inook, La Société des Apaches de nouveau.</li>
                    <li>Expérience pro : Webmaster et Vidéaste à l'UCLy pendant trois ans (Gestion de projet du nouveau site en interne, Motion design pour les métros, entre autres).</li>
                    <li>Beaucoup de sites et projets divers que j'essaierai d'uploader au fur et à mesure ici.</li>
                </ul>
                <h3>Pour ce qui est de mes passions :</h3>
                <ul>
                    <li>Trail-Running : diverses courses de 30km, Sainté-Lyon 2019.</li>
                    <li>Pense vélo, mange vélo, dort vélo (fou de vélo, comme dirait Gégé).</li>
                    <li>Les mêmes, la bière, l'AS-Saint-Étienne, la Peinture et le Dessin.</li>
                    <li>Le rock progressif, la chanson française (pas la variété, la chanson française), le reggaeton, la Minimale, et à peu près tout ce qui s'écoute.</li>
                    </ul>
                    Retraité de COD Warzone car mon ratio de 0.26 me posait des problèmes d'égo.
                    <br/>
                    <br/>
                    <h3>Pour ce site, remerciements à :</h3>
                    <ul>
                        <li>Louka pour la musique.</li>
                        <li>Mon père pour beaucoup de petites choses qui font un tout conséquent.</li>
                        <li>Prisonner 849 pour la plage.</li>
                        <li>Plus généralement aux membres du forum Three qui répondent vite et bien.</li>
                        <li>L'UCLy pour ses trois années de confiance.</li>
                        <li>Orlando de Bitume.</li>
                    </ul>
                </p>
            </div>
        </div>
    </div>
    );
}

export default About;