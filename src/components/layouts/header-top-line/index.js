import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import cn from 'classnames';
import Link from 'next/link';
import Button from '@components/buttons/button';
import SmallPhotoWithText from '@components/small-photo-with-text';
import { getUser } from '@selectors/user.selectors';
import { openConnectMetamaskModal } from '@actions/modals.actions';
import accountActions from '@actions/user.actions';
import Logo from './logo';
import LandingHeader from './landing';
import Icon from '@material-ui/core/Icon';
import styles from './styles.module.scss';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const HeaderTopLine = ({ className, isShowStaking, buttonText, linkText }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isCollapse, setIsCollapse] = useState(false);

  const screenWidth = useWindowDimensions().width;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    screenWidth > 472 ? setIsMobile(false) : setIsMobile(true);
  }, [screenWidth]);

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  if (!user) {
    dispatch(accountActions.checkStorageAuth());
  }

  const handleClick = () => dispatch(openConnectMetamaskModal());
  const onIconHander = () => {
    setIsCollapse(!isCollapse);
  };

  const [isShowMenu, setIsShowMenu] = useState(false);

  const router = useRouter();
  const pathname = router.pathname;

  const isLandingPage = pathname === '/';

  const handleProfileClick = () => {
    setIsShowMenu(false);
    Router.push('/profile');
  };
  const handleLogoutClick = () => {
    setIsShowMenu(false);
    dispatch(accountActions.logout());
  };
  // console.log('Show Menu => ', isCollapse);
    return (
    <div className={cn(className, styles.wrapper, hasScrolled ? styles.floatingNav : '')} >
      <div className={styles.leftBox}>
        <Logo />
      </div>
      <div className={styles.rightBox}>
        <div className={cn(styles.links, isCollapse ? styles.expandedMenu : '')}>
          <Link href="https://skins.digitalax.xyz">
            <a className={styles.link} target="_blank">
              SUIT UP IN YOUR GAME SKINS
            </a>
          </Link>
          <Link href="https://drip.digitalax.xyz">
            <a className={styles.link} target="_blank">
              REP YOUR STLE IRL
            </a>
          </Link>
          <Link href="/global">
            <a className={styles.link}>Global Designer Network</a>
          </Link>
          <Link href="http://staking.digitalax.xyz/">
            <a className={styles.link}>STAKE YOUR FASHION</a>
          </Link>
          {isMobile && (
            <a className={styles.link} onClick={() => handleClick()}>
              {buttonText}
            </a>
          )}
          <div className={styles.signBtn}>
            {user ? (
              <div className={styles.buttonWrapper}>
                <SmallPhotoWithText
                  photo={user.get('avatar') ? user.get('avatar') : './images/user-photo.svg'}
                  address={user.get('username')}
                  className={styles.hashAddress}
                >
                  <button className={styles.arrowBottom} onClick={() => setIsShowMenu(!isShowMenu)}>
                    <img
                      className={styles.arrowBottomImg}
                      src="./images/icons/arrow-bottom.svg"
                      alt="arrow-bottom"
                    />
                  </button>
                </SmallPhotoWithText>
                {isShowMenu && (
                  <div className={styles.menuWrapper}>
                    <button onClick={() => handleProfileClick()} className={styles.menuButton}>
                      Profile
                    </button>
                    <button onClick={() => handleLogoutClick()} className={styles.menuButton}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={() => handleClick()} className={styles.signButton}>
                {buttonText}
              </Button>
            )}
          </div>
          <a className={styles.collapseIcon} onClick={onIconHander}>
            <img src="/images/hamburger.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

HeaderTopLine.propTypes = {
  className: PropTypes.string,
  isShowStaking: PropTypes.bool,
  buttonText: PropTypes.string,
  linkText: PropTypes.string,
};

HeaderTopLine.defaultProps = {
  className: '',
  isShowStaking: true,
  buttonText: 'SIGN IN',
  linkText: 'Staking',
};

export default HeaderTopLine;
