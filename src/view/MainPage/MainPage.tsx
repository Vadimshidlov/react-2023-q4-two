import { PureComponent, ReactNode } from 'react';
import Search from '../Search/Search';

class MainPage extends PureComponent {
  render(): ReactNode {
    return (
      <div>
        <Search />
        {/* <Posts /> */}
      </div>
    );
  }
}

export default MainPage;
