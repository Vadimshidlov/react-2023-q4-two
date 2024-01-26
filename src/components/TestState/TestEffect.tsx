import { useEffect } from 'react';

function TestEffect() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Go');
    }, 1000);

    return function cleanUp() {
      console.log('CleanUp have called');

      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <h1>This if Effect Test</h1>
    </div>
  );
}

export default TestEffect;
