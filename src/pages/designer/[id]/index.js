import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { getDesignerCIDById } from '@selectors/designer.selectors'

import APIService from '@services/api/api.service'
import api from '@services/api/espa/api.service'

import styles from './styles.module.scss'

const DesignerPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState(null)
  const designerCID = useSelector(getDesignerCIDById(id))
  const [materialList, setMaterialList] = useState([])
  const [marketplaceItems, setMarketplaceItems] = useState([])

  async function getMaterials(designerInfo) {
    const thumbnails = await api.getAllThumbnails()
    
    const thumbnailObj = {}
    const blockedList = []
    for (const thumbnail in thumbnails.data) {
      const thumbItem = thumbnails.data[thumbnail]
      thumbnailObj[thumbItem.image_url] = thumbItem.thumbnail_url
      if (thumbItem.blocked) {
        blockedList.push(thumbItem.image_url)
      }
    }

    console.log('thumbnailObj: ', thumbnailObj)

    // setThumbnailList(thumbnailObj)

    const idLabel = 'Designer ID'

    const result = await APIService.getMaterialVS()
    const { digitalaxMaterialV2S } = result

    const { digitalaxCollectionGroups } = await APIService.getCollectionGroups()
    console.log('digitalaxCollectionGroups: ', digitalaxCollectionGroups)
    const auctionItems = []
    digitalaxCollectionGroups.forEach(group => {
      auctionItems.push(
        ...group.auctions.filter(
          auctionItem => {
            return auctionItem.designer.name.toLowerCase() === designerInfo['Designer ID'].toLowerCase()
          }
        ).map(item => {
          console.log('item: ', item)
          return {
            ...item.garment,
            isAuction: 1
          }
        })
      )

      group.collections.filter(
        collectionItem => {
          return collectionItem.designer.name.toLowerCase() === designerInfo['Designer ID'].toLowerCase()
        }
      ).forEach(item => {
        auctionItems.push(
          ...item.garments.map(garment => { return {...garment, rarity: item.rarity, isAuction: 0}})
        )
      })
    })

    setMarketplaceItems(auctionItems)
    console.log('auctionItems: ', auctionItems)

    const materials = []
    // console.log('digitalaxMaterialV2S: ', digitalaxMaterialV2S)
    let noThumbnailData = []
    console.log('designer id: ', designerInfo['Designer ID'])
    if (digitalaxMaterialV2S) {
      for (const item of digitalaxMaterialV2S) {
        // console.log('--- item: ', item)
        const res = await fetch(item.tokenUri)
        // console.log('--- item res: ', res)
        const rdata = await res.json()
        // console.log('--- item rdata: ', rdata)
        if (!rdata['image_url'] || !rdata[idLabel]) continue
        if (designerInfo['Designer ID'].toLowerCase() !== rdata[idLabel].toLowerCase()) continue
        let designerId = rdata[idLabel]
        if (!designerId || designerId === undefined || designerId === '') continue

        if (blockedList.findIndex(item => item === rdata['image_url']) < 0) {
          if (designerInfo['newDesignerID'] && designerInfo['newDesignerID'] !== undefined) {
            designerId = designerInfo['newDesignerID']
          }

          // console.log('--rdata: ', rdata)

          materials.push({
            ...item,
            name:
              rdata['attributes'] && rdata['attributes'].length > 0 && rdata['attributes'][0].value,
            image: rdata['image_url'],
            thumbnail: thumbnailObj ? thumbnailObj[rdata['image_url']] : null,
            description: rdata['description']
          })

          setMaterialList([...materials])

          // if (!data[designerId]) {
          //   data[designerId] = []
          // }
          // if (data[designerId].findIndex(item => item.image === rdata['image_url']) >= 0) {
          //   continue
          // }

          // if (!thumbnailObj[rdata['image_url']]) {
          //   noThumbnailData.push({
          //     designerId,
          //     image_url: rdata['image_url'],
          //     thumbnail: ''
          //   })
          // }

          // data[designerId].push({
          //   ...item,
          //   name:
          //     rdata['attributes'] && rdata['attributes'].length > 0 && rdata['attributes'][0].value,
          //   image: rdata['image_url'],
          //   thumbnail: thumbnailObj ? thumbnailObj[rdata['image_url']] : null,
          //   description: rdata['description'],
            
          // })
          // setItems({...data})
        }
      }
    }

  
  }

  useEffect(() => {
    fetch(`https://digitalax.mypinata.cloud/ipfs/${designerCID}`)
      .then((response) => response.json())
      .then(jsonData => {
        setData(jsonData)
        getMaterials(jsonData)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  if (!data) {
    return null;
  }

  console.log('materialList: ', materialList)

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
        <div className={styles.patternSection}>
          <div className={styles.patternWrapper3}>
            {
              materialList.slice(0, 5).map((item, index) => {
                return (
                  <img 
                    className={styles.patternCircle} src={item.thumbnail ? item.thumbnail : item.image}
                    key={index}
                    style={{
                      marginLeft: `${index % 2 * 30}%`
                    }}
                  />
                )
              })
            }
          </div>
          <div className={styles.patternWrapper4}>
            {
              materialList.slice(6, materialList.length).map((item, index) => {
                return (
                  <img 
                    className={styles.patternCircle} src={item.thumbnail ? item.thumbnail : item.image}
                    key={index}
                    style={{
                      marginTop: `${index % 3 === 1 ? -10 : 0}vw`
                    }}
                  />
                )
              })
            }
          </div>
          <div className={styles.patternWrapper}>
            <img className={styles.pattern1} src='/images/designer-page/pattern-selection.png' />
            <img className={styles.pattern2} src='/images/designer-page/pattern-selection.png' />
            <img className={styles.pattern3} src='/images/designer-page/pattern-selection.png' />
            <img className={styles.pattern4} src='/images/designer-page/pattern-selection.png' />
            <img className={styles.pattern5} src='/images/designer-page/pattern-selection.png' />
          </div>
        </div>

        <div className={styles.marketplaceItems}>
          {
            marketplaceItems.map((item, index) => {
              return (
                item.animation ?
                <video autoPlay muted loop className={styles.clothesPhoto} key={item.animation}>
                  <source
                    src={item.animation.replace('gateway.pinata', 'digitalax.mypinata')}
                    type="video/mp4"
                  />
                </video>
                :
                <img 
                  className={styles.clothesPhoto} 
                  src={item.image}
                  key={item.image}
                  // style={{
                  //   marginTop: `${index % 3 === 1 ? -10 : 0}vw`
                  // }}
                />
              )
            })
          }
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