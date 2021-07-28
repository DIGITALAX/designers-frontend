import React, { useState, useEffect } from 'react';
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

const LandingFooter = () => {
  const screenWidth = useWindowDimensions().width;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    screenWidth > 376 ? setIsMobile(false) : setIsMobile(true);
  }, [screenWidth]);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.heading}>GET IN TOUCH</div>
        <div className={styles.description}>
          Contact us through contact@digitalax.xyz or reach out on any of our social media channels.
          We would love to hear from you.
        </div>
        <div className={styles.centerWrapper}>
          <div className={[styles.dFlex, styles.aboutLine].join(' ')}>
            <a href="https://drive.google.com/file/d/1zG8h4GnodW7uWm_OsUY3g4I4RpOx6bMH/view?usp=sharing">
              ABOUT DIGITALAX
            </a>
            <a href="https://digitalax.gitbook.io/digitalax/" target="_blank">
              DOCUMENTATION
            </a>
            <a
              href="https://drive.google.com/file/d/1oFiBGBr_CN0-mUuuEp_g6wDBr-mNA0Uh/view?usp=sharing"
              className={styles.readabout}
            >
              READ ABOUT ESPA
            </a>
          </div>
          <img
            src="/images/social-icons/white-logo.svg"
            alt="white-logo"
            className={styles.whiteLogo}
          />
          <div className={[styles.dFlex, styles.iconsLine].join(' ')}>
            {!isMobile ? (
              <>
                <a href="https://www.facebook.com/digitalax1" target="_blank">
                  <img
                    src="/images/social-icons/facebook.png"
                    alt="facebook-icon"
                    className="facebook-icon"
                  />
                </a>
                <a href="https://twitter.com/DIGITALAX_" target="_blank">
                  <img
                    src="/images/social-icons/twitter.png"
                    alt="twitter-icon"
                    className="twitter-icon"
                  />
                </a>
                <a href="https://www.instagram.com/_digitalax" target="_blank">
                  <img
                    src="/images/social-icons/ig.png"
                    alt="instagram-icon"
                    className="instagram-icon"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/digitalax-digital-fashion/"
                  target="_blank"
                >
                  <img
                    src="/images/social-icons/linkedin.png"
                    alt="linkedin-icon"
                    className={styles.linkedinIcon}
                  />
                </a>
                <a href="https://www.tiktok.com/@digitalax?" target="_blank">
                  <img
                    src="/images/social-icons/tiktok.png"
                    alt="tiktok-icon"
                    style={{
                      marginRight: 20,
                    }}
                    className="tiktok-icon"
                  />
                </a>
                <a href="https://www.twitch.tv/digitalax" target="_blank">
                  <img
                    src="/images/social-icons/twitch.png"
                    alt="twitch-icon"
                    style={{
                      marginRight: 20,
                    }}
                    className="twitch-icon"
                  />
                </a>
                <a href="https://discord.com/invite/DKbSqRGtKv" target="_blank">
                  <img
                    src="/images/social-icons/disc.png"
                    alt="discord-icon"
                    className="discord-icon"
                  />
                </a>
                <a href="https://www.reddit.com/r/DIGITALAX/" target="_blank">
                  <img
                    src="/images/social-icons/reddit.png"
                    alt="reddit-icon"
                    className="reddit-icon"
                  />
                </a>
                <a href="https://www.youtube.com/channel/UCE26XV44aaYe1zlPnDbiz5Q" target="_blank">
                  <img
                    src="/images/social-icons/youtube.png"
                    alt="youtube-icon"
                    className={styles.youtubeIcon}
                  />
                </a>
                <a href="https://digitalax.medium.com/" target="_blank">
                  <img
                    src="/images/social-icons/medium-small.png"
                    alt="medium-icon"
                    className={styles.mediumIcon}
                  />
                </a>
              </>
            ) : (
              <div style={{display: 'flex', flexDirection: 'row', width: 264, alignItems: 'center', justifyContent: 'space-between'}}>
                <a href="https://www.facebook.com/digitalax1" target="_blank">
                  <img
                    src="/images/social-icons/facebook.png"
                    alt="facebook-icon"
                    className="facebook-icon"
                  />
                </a>
                <a href="https://twitter.com/DIGITALAX_" target="_blank">
                  <img
                    src="/images/social-icons/twitter.png"
                    alt="twitter-icon"
                    className="twitter-icon"
                  />
                </a>
                <a href="https://www.instagram.com/_digitalax" target="_blank">
                  <img
                    src="/images/social-icons/ig.png"
                    alt="instagram-icon"
                    className="instagram-icon"
                  />
                </a>
                
                <a href="https://www.tiktok.com/@digitalax?" target="_blank">
                  <img
                    src="/images/social-icons/tiktok.png"
                    alt="tiktok-icon"
                    className="tiktok-icon"
                  />
                </a>
                <a href="https://www.twitch.tv/digitalax" target="_blank">
                  <img
                    src="/images/social-icons/twitch.png"
                    alt="twitch-icon"
                    style={{
                      height: 20,
                    }}
                    className="twitch-icon"
                  />
                </a>
                <a href="https://discord.com/invite/DKbSqRGtKv" target="_blank">
                  <img
                    src="/images/social-icons/disc.png"
                    alt="discord-icon"
                    className="discord-icon"
                  />
                </a>
                <a href="https://www.reddit.com/r/DIGITALAX/" target="_blank">
                  <img
                    src="/images/social-icons/reddit.png"
                    alt="reddit-icon"
                    className="reddit-icon"
                  />
                </a>
                <a href="https://www.youtube.com/channel/UCE26XV44aaYe1zlPnDbiz5Q" target="_blank">
                  <img
                    src="/images/social-icons/youtube.png"
                    alt="youtube-icon"
                    className={styles.youtubeIcon}
                  />
                </a>
              </div>
            )}
          </div>

          <div className={[styles.dFlex, styles.faqLine].join(' ')}>
            <a href="https://blog.digitalax.xyz" target="_blank">
              FAQs
            </a>
            <a href="https://www.digitalax.xyz/marketplace" target="_blank">
              Digital Fashion Auctions
            </a>
            <a href="https://staking.digitalax.xyz" target="_blank">
              Staking
            </a>
          </div>
        </div>
      </div>
      {/* <div className={styles.textHiring}>
        <a href='https://www.digitalax.xyz/careers'>WE ARE HIRING!</a>
      </div> */}
    </footer>
  );
};

export default LandingFooter;
