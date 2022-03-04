import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ClassicModal from '@components/ClassicModal';

import { closeCC0Modal } from '@actions/modals.actions';
import { getModalParams } from '@selectors/modal.selectors';

import styles from './styles.module.scss';

const ModalCC0 = ({ className }) => {
  const dispatch = useDispatch();
  const params = useSelector(getModalParams);

  console.log('params: ', params);

  const handleClose = () => {
    dispatch(closeCC0Modal());
  };

  const handleSubmit = () => {
    params && params();
    dispatch(closeCC0Modal());
  };

  return (
    <>
      {createPortal(
        <ClassicModal
          onClose={() => handleClose()}
          title='This Content is Now CC0.'
          className={(className, styles.modalWrapper)}
        >
          <div className={styles.textWrapper}>
            Once on-chain the content you are minting will be fully CC0. If you don’t know what that is, read more here first before continuing with the minting process.
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

ModalCC0.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

ModalCC0.defaultProps = {
  className: '',
  title: 'This Content is Now CC0.',
};

export default ModalCC0;
