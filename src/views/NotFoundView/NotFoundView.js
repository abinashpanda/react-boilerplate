/* @flow */

import React from 'react';
import styles from './NotFoundView.css';
import notFoundImage from '../../images/404.png';

export default function NotFound({
  pathname,
}: {
  pathname: string,
}) {
  return (
    <div>
      <div className={styles.container}>
        <img
          src={notFoundImage}
          alt="Page Not Found"
          className={styles.errorImage}
        />
        <h1 className={styles.errorMessage}>404 Page Not Found</h1>
      </div>
    </div>
  );
}
