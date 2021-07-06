import React, { memo, useEffect, useState, useMemo } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { getAllDesigners, getAllDesignerCIDs } from '@selectors/designer.selectors';
import styles from './styles.module.scss';
import DesignerCard from './designer-card';

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

const DesignerList = () => {
  // const designerList = useSelector(getAllDesigners());
  const designerCIDs = useSelector(getAllDesignerCIDs());

  const screenWidth = useWindowDimensions().width;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    screenWidth > 410 ? setIsMobile(false) : setIsMobile(true);
  }, [screenWidth]);

  // const sortedList = useMemo(
  //   () => designerList
  //     .toJS()
  //     .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)),
  //   [designerList],
  // );
  return (
    <>
      {!isMobile ? (
        <div className={cn(styles.wrapper)}>
          <img src="/images/global_designers.png" className="px-5" alt="" />
          <img src="/images/network.png" className="ml-10" alt="" />
          <div className={styles.container}>
            {designerCIDs.map((cid,index) => (
              <DesignerCard cid={cid} key={`designercard-${index}`}/>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ position: 'relative', height: 231, marginBottom: 20 }}>
            <img
              src="/images/global1.png"
              style={{ position: 'absolute', top: 0,height:98 }}
              alt=""
            />
            <img
              src="/images/designer1.png"
              style={{ position: 'absolute', top: 72,height:81,marginLeft:31 }}
              alt=""
            />
            <img
              src="/images/network1.png"
              style={{ position: 'absolute', top: 131, height:69,marginLeft:21}}
              alt=""
            />
          </div>
          <div style={{display: 'flex',flexWrap: 'wrap', flexDirection: 'row'}}>
            {designerCIDs.map((cid,index) => (
              <DesignerCard cid={cid} key={`designercard-${index}`}/>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(DesignerList);
