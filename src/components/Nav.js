import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ isLibraryOpen, setIsLibraryOpen }) => {
  return (
    <nav>
      <h2>Musik</h2>
      <button className='btn' onClick={() => setIsLibraryOpen(!isLibraryOpen)}>
        <FontAwesomeIcon size='1x' icon={faHeadphones} />
        Library
      </button>
    </nav>
  );
};

export default Nav;
