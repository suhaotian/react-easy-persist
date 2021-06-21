import * as React from 'react';
import * as ReactDOM from 'react-dom';
import EasyPersistExample from './EasyPersistExample';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EasyPersistExample />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
