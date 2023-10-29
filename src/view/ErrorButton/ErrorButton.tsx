import { Component } from 'react';
import './ErrorButton.scss';

interface State {
  error: boolean;
}

class ErrorButton extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      error: false,
    };
  }

  generateErrorHandler = (): void => {
    this.setState({ error: true });
  };

  render() {
    const { error } = this.state;

    if (error) {
      throw Error('Ooops! Something went wrong!');
    }

    return (
      <button type="button" onClick={this.generateErrorHandler} className="error-button">
        Error
      </button>
    );
  }
}

export default ErrorButton;
