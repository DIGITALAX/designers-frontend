import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Paper } from '@material-ui/core';

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
  
const PiePaths = ({ count }) => {
  const endx = Math.cos(((360 / count - 90) * Math.PI) / 180) * 0.5 + 0.5;
  const endy = Math.sin(((360 / count - 90) * Math.PI) / 180) * 0.5 + 0.5;
    
  const screenWidth = useWindowDimensions().width;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    console.log('circle menu screen Width = >', screenWidth);
    screenWidth > 376 ? setIsMobile(false) : setIsMobile(true);
  }, [screenWidth]);

  return (
    <svg height="0" width="0">
      <defs>
        <clipPath clipPathUnits="objectBoundingBox" id={'sector' + count}>
          {count !== 1 ? (
            <path
              fill="none"
              stroke="#111"
              d={'M0.5,0.5 L0.5,0 A0.5,0.5 0 0 1 ' + endx + ' ' + endy + ' z'}
            ></path>
          ) : (
            <path
              fill="none"
              stroke="#111"
              d="M0.5,0.5 L0.5,0 A0.5,0.5 0 1 1 0.49899999999 0 z"
            ></path>
          )}
        </clipPath>
      </defs>
    </svg>
  );
};

const Pie = ({ items, keyName, direction = 'Right' }) => {
  const count = items.length;
  const menu = useRef(null);
  const curImage = useRef(null);
  const imgViewer = useRef(null);
  const title = useRef(null);
  const description = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      menu.current.classList.toggle('active');
      menu.current.style.transition = 'transform .25s ease-out, opacity .25s ease-in';
    }, 1000);
  }, []);

  const hovered = (item) => {
    curImage.current.style.backgroundImage = `url(${item.image})`;
    imgViewer.current.classList.remove('fadeOut' + direction);
    imgViewer.current.classList.add('fadeIn' + direction);
    title.current.innerHTML = '';
    description.current.innerHTML = item.description;
  };

  const hleave = (when, e) => {
    if (
      (when === 1 &&
        e.relatedTarget &&
        e.relatedTarget.classList.value.search('curImage') === -1 &&
        e.relatedTarget.classList.value.search('imgViewer') === -1) ||
      when === 2
    ) {
      if (curImage.current !== null) {
        imgViewer.current.classList.remove('fadeIn' + direction);
        imgViewer.current.classList.add('fadeOut' + direction);
      }
    }
  };

  return (
    <>
      <section>
        <div className="circlemenu_container">
          <ul className="circlemenu_ul" ref={menu}>
            {items.map((item, i) => (
              <li
                key={i}
                style={{
                  transform: 'rotate(-' + (360 / count) * i + 'deg)',
                  clipPath: 'url(#sector' + count + ')',
                }}
                onMouseOver={() => hovered(item)}
                onMouseOut={(e) => hleave(1, e)}
              >
                <img
                  className="circlemenu_piece_img"
                  style={{ transform: 'rotate(' + (360 / count) * i + 'deg)' }}
                  src={item.image}
                  alt=""
                />
              </li>
            ))}
          </ul>
          <PiePaths count={count} />
        </div>
        <Paper
          className={'circlemenu_imgViewer fadeOut' + direction}
          elevation={3}
          ref={imgViewer}
          onMouseLeave={(e) => hleave(2, e)}
        >
          <div className="circlemenu_curImage" ref={curImage}>
            <div className="circlemenu_imgTitle" ref={title} />
            <div className="circlemenu_imgDescription" ref={description} />
          </div>
        </Paper>
        <div style={{ color: 'white', textAlign: 'center' }}>{keyName}</div>
      </section>
    </>
  );
};

export default Pie;
