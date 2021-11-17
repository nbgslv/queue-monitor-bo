import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import NewQueue from './NewQueue';
import { CREATE_NEW_QUEUE } from '../../graphql/mutations';

const TEST_QUEUE_NAME = 'Test Queue';

const apolloClientMocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: CREATE_NEW_QUEUE,
      variables: {
        queueName: TEST_QUEUE_NAME,
      },
    },
    result: { data: { queueName: TEST_QUEUE_NAME } },
  },
];

it('should render successfully', () => {
  const { getByLabelText } = render(
    <MockedProvider mocks={apolloClientMocks} addTypename={false}>
      <NewQueue />
    </MockedProvider>
  );

  const queueNameInput = getByLabelText('Queue Name');

  expect(queueNameInput).toBeTruthy();
});

it('should submit queue name input', async () => {
  const { getByLabelText } = render(
    <MockedProvider mocks={apolloClientMocks} addTypename={false}>
      <NewQueue />
    </MockedProvider>
  );

  const queueNameInput = getByLabelText('Queue Name');

  await waitFor(() => {
    fireEvent.change(queueNameInput, {
      target: {
        value: TEST_QUEUE_NAME,
      },
    });
  });

  expect(queueNameInput).toHaveValue(TEST_QUEUE_NAME);
});
