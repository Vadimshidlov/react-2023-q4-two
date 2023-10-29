import { useState } from 'react';
import './ErrorButton.scss';

function ErrorButton() {
  const [error, setError] = useState<boolean>(false);

  if (error) {
    throw Error('Ooops! Something ERROR!');
  }

  const generateErrorHandler = (): void => {
    setError(true);
  };

  return (
    <button type="button" onClick={generateErrorHandler} className="error-button">
      Error
    </button>
  );
}

export default ErrorButton;
