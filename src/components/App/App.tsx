import React from 'react';
import './App.css';
import { useMutation } from "@apollo/client";
import { CREATE_NEW_QUEUE } from "../../graphql/mutations";

function App(): JSX.Element {
  const [queueName, setQueueName] = React.useState<string>('')
  const [createNewQueue] = useMutation(CREATE_NEW_QUEUE);
  return (
    <div className="App">
      <input name="queue-name" onChange={(e) => setQueueName(e.target.value)} />
      <button type="submit" onClick={() => createNewQueue({
        variables: {
          queueName,
        }
      })}>Create Queue</button>
    </div>
  );
}

export default App;
