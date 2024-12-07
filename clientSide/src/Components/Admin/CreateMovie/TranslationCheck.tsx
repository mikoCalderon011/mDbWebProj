import React from 'react';

const TranslationCheck = ({ translation }) => {
  const message = translation.isValid
    ? 'The input for "overview" was detected in English.'
    : `The input for 'overview' was detected in a language other than English and was translated into ${translation.detectedLang.charAt(0).toUpperCase() + translation.detectedLang.slice(1)}.`;

  return (
    <div className={`translation-check ${translation.isValid ? 'success' : 'failed'}`}>
      <span className="title">
        Translation Check {translation.isValid ? 'Success' : 'Failed'}
      </span>
      <span className="message">
        {message}
      </span>
    </div>

  );
};

export default TranslationCheck;
