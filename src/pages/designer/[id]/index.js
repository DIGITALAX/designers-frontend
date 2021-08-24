import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import kebabCase from 'lodash.kebabcase'

import { getDesignerCIDById } from '@selectors/designer.selectors'
import styles from './styles.module.scss'

const DesignerPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState(null)
  const designerCID = useSelector(getDesignerCIDById(id))

  useEffect(() => {
    fetch(`https://digitalax.mypinata.cloud/ipfs/${designerCID}`)
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => {
        console.error(error)
      })
  }, [])

  if (!data) {
    return null;
  }

  console.log('data: ', data)

  return (
    <div className={styles.wrapper}>
      <div className={styles.topPart}>
        <img className={styles.background} src='/images/designer-page/background.png' />
        <div className={styles.rect1}></div>
        <div className={styles.rect2}></div>
        <img className={styles.triangle} src='/images/designer-page/triangle.png' />
        <img className={styles.userPhoto} src={data['image_url']} />
        <img className={styles.claimUsername} src='/images/designer-page/claim-username.png' />

        <div className={styles.designerName}>
          { data['Designer ID'].toUpperCase() }
          <img className={styles.arrowImg} src='/images/designer-page/arrow.png' />
        </div>

        <div className={styles.designerDescription}>
          { data['description'] }
        </div>

        <div className={styles.patternWrapper}>
          <img className={styles.pattern1} src='/images/designer-page/pattern-selection.png' />
          <img className={styles.pattern2} src='/images/designer-page/pattern-selection.png' />
          <img className={styles.pattern3} src='/images/designer-page/pattern-selection.png' />
          <img className={styles.pattern4} src='/images/designer-page/pattern-selection.png' />
          <img className={styles.pattern5} src='/images/designer-page/pattern-selection.png' />
        </div>

        <div className={styles.patternWrapper2}>
          <img className={styles.patternSample1} src='/images/designer-page/pattern_sample1.png' />
          <img className={styles.patternSample2} src='/images/designer-page/pattern_sample2.png' />
        </div>

      </div> 
      <div className={styles.bottomPart}></div> 
    </div>
  )
}

export default DesignerPage