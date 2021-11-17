import React from 'react';
import { AppBar } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { css } from '@emotion/css';
import NewQueue from '../components/NewQueue/NewQueue';

const Main = (): JSX.Element => (
  <>
    <div
      className={css`
        height: 5vh;
      `}>
      <AppBar />
    </div>
    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 95vh;
      `}>
      <Routes>
        <Route path="/" element={<NewQueue />} />
      </Routes>
    </div>
  </>
);

export default Main;
