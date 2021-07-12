import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import CircleMenu from '@components/circle-menu'
import { getAllDesignerIDs } from '@selectors/designer.selectors'
import APIService from '@services/api/api.service'

function getWindowDimensions() {
  const {
    innerWidth: width,
    innerHeight: height
  } = window

  return {
    width,
    height
  }
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

function Libraries(props) {
  const [open, setOpen] = useState(true)
  const handleClose = () => setOpen(false)

  const [items, setItems] = useState({})

  const screenWidth = useWindowDimensions().width
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    console.log('screen Width = >', screenWidth)
    screenWidth > 796 ? setIsMobile(false) : setIsMobile(true)
  }, [screenWidth])


  // https://digitalax.mypinata.cloud/ipfs/${cid}
  const designerIDs = useSelector(getAllDesignerIDs())

  async function getData() {
    const idLabel = 'Designer ID'
    const ids = designerIDs.map(item => item.designerID)

    const result = await APIService.getMaterialVS()
    const { digitalaxMaterialV2S } = result

    console.log('result: ', result)

    if (digitalaxMaterialV2S) {
      let data = {}
      for (const item of digitalaxMaterialV2S) {
        console.log('--- item: ', item)
        const res = await fetch(item.tokenUri)
        console.log('--- item res: ', res)
        const rdata = await res.json()
        console.log('--- item rdata: ', rdata)
        if (rdata['image_url'] && rdata[idLabel] && ids.includes(rdata[idLabel])) {
          const designerId = rdata[idLabel]
          if (!data[designerId]) {
            data[designerId] = []
          }
          data[designerId].push({
            name:
              rdata['attributes'] && rdata['attributes'].length > 0 && rdata['attributes'][0].value,
            image: rdata['image_url'],
            description: rdata['description'],
          })
        }
      }
      console.log('------- designers data: ', data)
      setItems(data)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div style={{ marginBottom: 30 }}>
      {!isMobile ? (
        <>
          <div className='flex my-5 items-center'>
            <img src='/images/on-chain.png' className='onchainimg' alt='' />
            <img src='/images/opensource.png' className='opensourceimg' alt='' />
          </div>
          <div className='flex my-5 items-center'>
            <img src='/images/llss.png' className='llssimg' alt='' />
            <img src='/images/nft.png' className='nftimg' alt='' />
            <img src='/images/libraries.png' className='librariesimg' alt='' />
          </div>
          <div className='flex justify-center my-10 w-full'>
            <img src='/images/texture.png' alt='' />
            <img src='/images/material.png' className='mx-10 materialimg' alt='' />
            <img src='/images/pattern.png' alt='' />
          </div>
          <div className='flex my-16'>
            <img src='/images/designer_contribution.png' className='mx-auto' alt='' />
          </div>
        </>
      ) : (
        <>
          <div className='flex flex-col my-5 items-center opensourceheader'>
            <img src='/images/on-chain.png' className='onchainimg' alt='' />
            <img src='/images/llss.png' className='llssimg' alt='' />
            <img src='/images/nft.png' className='nftimg' alt='' />
            <img src='/images/opensource.png' className='opensourceimg' alt='' />
            <img src='/images/libraries.png' className='librariesimg' alt='' />
            <img src='/images/texture.png' alt='' className='flex' />
            <img src='/images/material.png' className='materialimg' alt='' />
            <img src='/images/pattern.png' alt='' className='flex' />
            <img src='/images/designer.png' alt='' className='flex' />
            <img
              src='/images/contribution.png'
              alt=''
              className='flex'
              style={{ marginTop: '-21px' }}
            />
          </div>
        </>
      )}
      {!isMobile ? (
        <Grid container item xs={12}>
          {Object.keys(items).map((key, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid container item xs={4} justify='center' key={`circle-${index}`}>
              <CircleMenu
                items={items[key]}
                keyName={key}
                direction={index % 3 < 2 ? 'Right' : 'Left'}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div style={{ width: 375, maxWidth: 375}}>
          <div className='opensourcecontent'>
            {/* <Grid container item xs={12}> */}
            {Object.keys(items).map((key, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid container item xs={12} justify='center' key={`circle-${index}`}>
                <CircleMenu items={items[key]} keyName={key} direction='Right' />
              </Grid>
            ))}
            {/* </Grid> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Libraries
