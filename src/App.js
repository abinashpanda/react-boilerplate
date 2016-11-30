/* @flow */
import React from 'react';
import { Match, Miss } from 'react-router';
import styles from './App.css';
import NotFoundView from './views/NotFoundView';

function App() {
  return (
    <div className={styles.container}>
      <Miss component={NotFoundView} />
    </div>
  );
}

export default App;
