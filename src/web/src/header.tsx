import {SlButton} from '@shoelace-style/shoelace/dist/react';
import * as React from 'react';
import {Link} from 'react-router-dom';
import styles from './header.module.css';

export const Header = React.memo(function Header(): JSX.Element {
  return (
    <div className={`${styles.app_header} flex justify-between border-b`}>
      <div className="flex items-center">
        <div className={`${styles.app_header_title} text-primary`}>
          <Link to="/">Lilac</Link>
        </div>
      </div>
      <div className="content-end self-end h-full">
        <Link to="/create">
          <SlButton variant="success" className="mt-1 mr-4">
            New model
          </SlButton>
        </Link>
      </div>
    </div>
  );
});
