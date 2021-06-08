import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@components/buttons/button';
import Modal from '@components/modal';
import Notification from '@components/notification';

import { closeConnectMetamaskModal, closeNotInstalledMetamask } from '@actions/modals.actions';
import userActions from '@actions/user.actions';
import { WALLET_METAMASK, WALLET_ARKANE } from '@constants/global.constants';

import styles from './styles.module.scss';

const ModalConnectWallet = ({
  className, title, textForIcon, icon, buttonText,
}) => {
  const dispatch = useDispatch();
  const isShowNotificationConnectMetamask = useSelector((state) => state.modals.get('isShowNotificationConnectMetamask'));

  const handleClose = () => {
    dispatch(closeConnectMetamaskModal());
    dispatch(closeNotInstalledMetamask());
  };

  const handleClick = (source) => dispatch(userActions.tryToLogin(source));

  return (
    <>
      {createPortal(
        <Modal onClose={() => handleClose()} title={title} className={className}>
          <div className={styles.modalItem}>
            <div className={styles.modalLeftBox}>
              <span className={styles.modalsTextForIcon}>Arkane Wallet</span>
              <img
                className={styles.modalIcon}
                src="/images/arkane.png"
                alt="arkane"
              />
            </div>
            <Button className={styles.modalButton} background="black" onClick={() => handleClick(WALLET_ARKANE)}>
              {buttonText}
            </Button>
          </div>
          <div className={styles.modalItem}>
            <div className={styles.modalLeftBox}>
              <span className={styles.modalsTextForIcon}>{textForIcon}</span>
              <img className={styles.modalIcon} src={icon} alt="metamask" />
            </div>
            <Button className={styles.modalButton} background="black" onClick={() => handleClick(WALLET_METAMASK)}>
              {buttonText}
            </Button>
            {isShowNotificationConnectMetamask && (
              <Notification
                text={['You have to install the metamask extension.']}
                className={styles.notificationBox}
              />
            )}
          </div>
        </Modal>,
        document.body,
      )}
    </>
  );


};

ModalConnectWallet.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  textForIcon: PropTypes.string,
  icon: PropTypes.string,
  buttonText: PropTypes.string,
};

ModalConnectWallet.defaultProps = {
  className: '',
  title: 'Connect wallet',
  textForIcon: 'Metamask',
  icon: './images/icons/metamask.svg',
  buttonText: 'Connect Wallet',
};

export default ModalConnectWallet;
