import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ClassicModal from '@components/ClassicModal';

import { closeCC02Modal } from '@actions/modals.actions';
import { getModalParams } from '@selectors/modal.selectors';

import styles from './styles.module.scss';

const ModalCC02 = ({ className }) => {
  const dispatch = useDispatch();
  const params = useSelector(getModalParams);

  console.log('params: ', params);

  const handleClose = () => {
    dispatch(closeCC02Modal());
  };

  const handleSubmit = () => {
    params && params();
    dispatch(closeCC02Modal());
  };

  return (
    <>
      {createPortal(
        <ClassicModal
          onClose={() => handleClose()}
          title='This NFT will be CC0.'
          className={(className, styles.modalWrapper)}
        >
          <div className={styles.textWrapper}>
            The DIGITALAX protocol fully embraces CC0 for all NFTs minted. If you don’t know what that is, 
            read more <a href='https://digitalax.gitbook.io/digitalax/web3-cc0' target='_blank'>here</a> first before continuing with the minting process.
          </div>
          <button className={styles.modalButton} onClick={() => handleSubmit() }>
            Confirm
          </button>
        </ClassicModal>,
        document.body
      )}
    </>
  );
};

ModalCC02.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

ModalCC02.defaultProps = {
  className: '',
  title: 'This NFT will be CC0.',
};

export default ModalCC02;
