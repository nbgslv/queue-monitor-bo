import { gql } from '@apollo/client';

export const CREATE_NEW_QUEUE = gql`
  mutation CreateNewQueue($queueName: String!) {
    createNewQueue(queueName: $queueName)
  }
`;
