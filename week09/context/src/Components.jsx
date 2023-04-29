import { useContext } from 'react';
import LanguageContext from './LanguageContext';
import translations from './Translations';

function MyButton(props) {
    const language = useContext(LanguageContext);
    return (
        <button onClick={props.toggleLanguage}>
            {translations[language]['button']}
        </button>
    );
}

function Welcome() {
    const language = useContext(LanguageContext);
    return (
        <p> {translations[language]['welcome']} </p>
    );
}

export {MyButton, Welcome};