import React from 'react';
import './App.css';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_QUEUE } from '../../graphql/mutations';
import Main from '../../layouts/Main';

const App = (): JSX.Element => {
  const [queueName, setQueueName] = React.useState<string>('');
  const [createNewQueue] = useMutation(CREATE_NEW_QUEUE);
  return (
    <div className="App">
      <Main />
    </div>
  );
};

export default App;
