import apiService from '@services/api/espa/api.service';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const Purveyors = () => {
  const [designers, setDesigners] = useState([]);
  const fetchDesigners = async () => {
    const res = await apiService.getAllDesigners();
    setDesigners(res.filter((designer) => designer.GDNPurveyor));
  };

  useEffect(() => {
    fetchDesigners();
  }, []);

  console.log({ designers });

  return (
    <div className={styles.wrapper}>
      <div className="container mx-auto p-4">
        <div className={styles.topSection}>
          <div className={styles.left}>
            <div className={styles.title}>GDN Purveyors</div>
            <div className={styles.description}>
              These are members of the Global Designer Network that are taking the lead over certain
              key categories and sub-sectors that we are further supporting and empowering for
              catalysing the broader web3 fashion community.
              <br />
              <br />
              Having a more composable and modular structure within the GDN DAO is critical to
              maintaining momentum, engagement and driving forth our aligned mission. This is how we
              continuously refresh the magic of scalable small world networks.
              <br />
              <br />
              It allows us to be nimble, fast pace and cover a broader range of areas.
            </div>
          </div>
          <div className={styles.right}>
            <video autoPlay muted loop className={styles.video}>
              <source src="/video/Untitled (14).mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className={styles.desigersSection}>
          {designers.map((designer) => (
            <div className={styles.designer} key={designer.wallet}>
              <Link href={`/designers/${designer.designerId}`}>
                <a>
                  <img src={designer.image_url} className={styles.avatar} />
                </a>
              </Link>
              <Link href={`/designers/${designer.designerId}`}>
                <a>
                  <div className={styles.name}>{designer.designerId}</div>
                </a>
              </Link>
              <div className={styles.text}>{designer.GDNPurveyor}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Purveyors;
