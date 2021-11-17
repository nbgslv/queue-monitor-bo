import React from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { css } from '@emotion/css';

interface QueueFormValues {
  queueName: string;
}

const NewQueue = (): React.ReactElement => {
  const formik = useFormik<QueueFormValues>({
    initialValues: {
      queueName: '',
    },
    validationSchema: Yup.object().shape({
      queueName: Yup.string().required('Queue name is required'),
    }),
    onSubmit: values => {
      console.log(values);
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
        <form
          onSubmit={formik.handleSubmit}
          className={css`
            display: flex;
            flex-direction: column;
          `}>
          <Typography
            sx={{
              marginBottom: '16px',
            }}
            variant="h5">
            Create New Queue
          </Typography>
          <TextField
            variant="standard"
            name="queueName"
            onChange={formik.handleChange}
            error={Boolean(formik.errors.queueName) || undefined}
            label="Queue Name"
            placeholder="Queue Name"
            sx={{
              padding: '16px 4px',
            }}
          />
          <Button type="submit" variant="contained">
            Create
          </Button>
        </form>
      </div>
    </Paper>
  );
};

export default NewQueue;
