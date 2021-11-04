import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss'

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

function Landing(props) {
  const screenWidth = useWindowDimensions().width;
  const [isMobile, setIsMobile] = useState(false);
  const [showTopSocial, setShowTopSocial] = useState(false);

  useEffect(() => {
    
    screenWidth > 707 ? setIsMobile(false) : setIsMobile(true);
  }, [screenWidth]);

  const onClickTopArrow = () => {
    console.log('clicked!')
    setShowTopSocial(true)
  }

  return (
    <>
      {!isMobile ? (
        <>
          {' '}
          <div className="block" style={{height: 'fit-content'}}>
            <div className="flex items-center absolute z-50 l-8">
              <p className="uppercase font-inter text-third bg-fourth text-5xl p-1 font-black">
                GET DRESSED BY THE BEST
              </p>
              <Link href="/getdressed">
                <img
                  src="/images/arrow.svg"
                  className="animate-horizonbounce opengatearrow"
                  // onClick={() => onClickTopArrow()}
                />
              </Link>
              {/* {
                showTopSocial && <div className={styles.topSocialIcons}>
                  <a href='https://twitter.com/web3fashion' target='_blank'>
                    <img src='/images/social-button-circle/twitter.png' />
                  </a>
                  <a href='https://www.instagram.com/global_designer_network/' target='_blank'>
                    <img src='/images/social-button-circle/instagram.png' />
                  </a>
                  <a href='https://www.linkedin.com/company/global-designer-network/' target='_blank'>
                    <img src='/images/social-button-circle/linkedin.png' />
                  </a>
                  <a href='https://www.tiktok.com/@globaldesignernetwork' target='_blank'>
                    <img src='/images/social-button-circle/tiktok.png' />
                  </a>
                  <a href='https://www.youtube.com/channel/UCUoUOJ-t6lb2mKqqoefrrnA' target='_blank'>
                    <img src='/images/social-button-circle/youtube.png' />
                  </a>
                </div>
              } */}
            </div>
            <div className="relative">
              <video width="100%" autoPlay muted loop playsInline>
                <source src="/video/v1.mp4" type="video/mp4" />
              </video>
            </div>

            <div
              className="flex flex-col pt-20 pb-60 mb-80"
              style={{
                backgroundImage: "url('/images/landing_bg.png')",
                backgroundRepeat: 'repeat-y',
                backgroundPositionX: '140px',
              }}
            >
              <div className="mt-20 bg-black z-50 py-10 px-12">
                <p className="text-gray-50 uppercase font-inter font-black text-6xl whitespace-normal mt-32">
                  Building The Open fabric of a New
                </p>
                <p
                  className="text-gray-50 uppercase font-inter font-black whitespace-normal text-gradient mb-32"
                  style={{ fontSize: '80px' }}
                >
                  Web3 Fashion movement
                </p>
              </div>

              <div className="flex pl-20 items-center">
                <img src="/images/enter.svg" className="entertextimg"/>
                <Link href="/enter">
                  <img
                    src="/images/arrow.svg"
                    className="ml-10 transform animate-horizonbounce arrowimg"
                  />
                </Link>
              </div>

              <div className="bg-black z-50 py-20 px-20">
                <p
                  className="text-gray-50 uppercase font-inter font-black whitespace-normal"
                  style={{ fontSize: '66px' }}
                >
                  Using web3, crypto, nfts, open{' '}
                </p>
                <p
                  className="text-gray-50 uppercase font-inter font-black whitespace-normal"
                  style={{ fontSize: '66px' }}
                >
                  source{' '}
                </p>
                <p
                  className="text-gray-50 uppercase font-inter font-black whitespace-normal text-gradient"
                  style={{ fontSize: '76px' }}
                >
                  To empower an entire
                </p>
                <p
                  className="text-gray-50 uppercase font-inter font-black whitespace-normal text-gradient"
                  style={{ fontSize: '76px' }}
                >
                  Decentralised tribe of
                </p>
                <p
                  className="text-gray-50 uppercase font-inter font-black whitespace-normal text-gradient"
                  style={{ fontSize: '76px' }}
                >
                  Creators Across The Realms
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="block" style={{height: 'fit-content'}}>
          <div className="relative" style={{ padding: '0 0 40px 0' }}>
            <video width="100%" autoPlay muted loop playsInline>
              <source src="/video/v1.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="flex flex-col" style={{zIndex:10}}>
            <div className="greenline"/>
            <div className="violetline"/>
            <div className="bg-black indexparagraph1">
              <p className="text-gray-50 uppercase font-inter font-black text-6xl whitespace-normal buildingtext" style={{marginTop:49}}>
                Building The Open fabric of a New
              </p>
              <p className="text-gray-50 uppercase font-inter font-black whitespace-normal text-gradient digitaltext" >
                Digital
                <br /> Fashion
                <br /> movement
              </p>
            </div>

            <div
              className="flex flex-col items-center"
              style={{ width: 375, maxWidth: 375, marginTop:31 }}
            >
              <img src="/images/enter.svg" className="entertextimg" />
              <Link href="/enter">
                <img
                  src="/images/arrow.svg"
                  className="ml-10 transform animate-horizonbounce arrowimg"
                  style={{ alignSelf: 'flex-end', marginRight: 65,height:121,width:122 }}
                />
              </Link>
            </div>

            <div className="bg-black indexparagraph2">
              <p
                className="text-gray-50 uppercase font-inter font-black whitespace-normal"
                style={{ fontSize: '40px' }}
              >
                Using web3, crypto, nfts,
              </p>
              <p
                className="text-gray-50 uppercase font-inter font-black whitespace-normal"
                style={{ fontSize: '40px' }}
              >
                open source{' '}
              </p>
              <p
                className="text-gray-50 uppercase font-inter font-black whitespace-normal text-gradient"
                style={{ fontSize: '30px' }}
              >
                To empower an entire
              </p>
              <p
                className="text-gray-50 uppercase font-inter font-black whitespace-normal text-gradient"
                style={{ fontSize: '30px' }}
              >
                Decentralised tribe of
              </p>
              <p
                className="text-gray-50 uppercase font-inter font-black whitespace-normal text-gradient"
                style={{ fontSize: '30px', lineHeight: '36.31px' }}
              >
                Creators Across The Realms
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Landing;
