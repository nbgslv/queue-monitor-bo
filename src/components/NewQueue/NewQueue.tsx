import React from 'react';
import { Alert, Button, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { css } from '@emotion/css';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_QUEUE } from '../../graphql/mutations';

interface QueueFormValues {
  queueName: string;
}

const NewQueue = (): React.ReactElement => {
  const [createNewQueue, { loading, error, data }] = useMutation(CREATE_NEW_QUEUE);
  const formik = useFormik<QueueFormValues>({
    initialValues: {
      queueName: '',
    },
    validationSchema: Yup.object().shape({
      queueName: Yup.string().required('Queue name is required'),
    }),
    onSubmit: values => {
      createNewQueue({
        variables: {
          queueName: values.queueName,
        },
      });
    },
  });
  return (
    <Paper
      elevation={1}
      sx={{
        width: '30%',
        padding: '12px',
      }}>
      <div>
        <Typography
          sx={{
            marginBottom: '16px',
          }}
          variant="h5">
          Create New Queue
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className={css`
            display: flex;
            flex-direction: column;
          `}>
          <TextField
            variant="standard"
            name="queueName"
            id="queueName"
            onChange={formik.handleChange}
            error={Boolean(formik.errors.queueName) || undefined}
            label="Queue Name"
            placeholder="Queue Name"
            sx={{
              padding: '16px 4px',
            }}
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress /> : 'Create'}
          </Button>
          {data && (
            <Alert data-testid="create-queue-success" severity="success">
              Queue created successfully!
            </Alert>
          )}
        </form>
      </div>
    </Paper>
  );
};

export default NewQueue;
