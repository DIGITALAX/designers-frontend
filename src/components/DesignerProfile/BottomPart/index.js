import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Moveable from 'react-moveable'
import { toast } from 'react-toastify'

import api from '@services/api/espa/api.service'
import designerActions from '@actions/designer.actions'

import Button from '@components/Button'
import styles from './styles.module.scss'

const BottomPart = () => {
  const [selectedTarget, setSelectedTarget] = useState(null)
  const [web3FashionItems, setWeb3FashionItems] = useState([])
  const [currentHeight, setCurrentHeight] = useState(0)
  const [isShowTextAdd, setIsShowTextAdd] = useState(false)
  const [isShowImageAdd, setIsShowImageAdd] = useState(false)
  const [isShowVideoAdd, setIsShowVideoAdd] = useState(false)
  const [imageFileName, setImageFileName] = useState('')
  const [videoFileName, setVideoFileName] = useState('')
  const [addTextDraft, setAddTextDraft] = useState('')

  const onClickTarget = e => {
    setSelectedTarget(e.target)
  }

  const onClickImage = () => {
    setIsShowImageAdd(true)
    setIsShowVideoAdd(false)
    setIsShowTextAdd(false)    
  }

  const onClickVideo = () => {
    setIsShowImageAdd(false)
    setIsShowVideoAdd(true)
    setIsShowTextAdd(false)
  }

  const onClickText = () => {
    setIsShowImageAdd(false)
    setIsShowVideoAdd(false)
    setIsShowTextAdd(true)
  }

  const uploadFile = async file => {
    try {
      dispatch(designerActions.setIsloading(true))
      let url = await api.getPresignedUrl()
      if (url) {
        const result = await api.uploadImageToS3(url, file)
        if (result) {
          const queryIndex = url.indexOf('?')
          if (queryIndex >= 0) {
            url = url.slice(0, queryIndex)
          }
          dispatch(designerActions.setIsloading(false))
          return url
        }
      }
      dispatch(designerActions.setIsloading(false))
      return null
    } catch (e) {
      dispatch(designerActions.setIsloading(false))
      return null
    }
  }

  const onClickAddText = () => {
    // validation
    const arrRemoveSpaces = addTextDraft.split(' ')
    if (arrRemoveSpaces.findIndex(item => item !== '') === -1) {
      document.getElementById('text-add-item').focus()
      setAddTextDraft('')
      toast('Please input some text.')
      return
    }

    web3FashionItems.push({
      type: 'text',
      value: addTextDraft.replace(/\r\n|\r|\n/g, '<br />')
    })

    // Reset Add Text
    setAddTextDraft('')
  }


  const onClickAddImage = () => {
    // validation
    if (imageFileName === '') {
      toast('Please choose an image file.')
      return
    }

    const imageUploadEl = document.getElementById('image-upload')
    
    uploadFile(imageUploadEl.files[0])
    .then (uploaded => {
      if (!uploaded) {
        toast('Failed to upload the file. Please try again.')
        return
      }

      web3FashionItems.push({
        type: 'image',
        value: imageUploadEl
      })
  
      // Reset Add Image
      imageUploadEl.value = ''
      setImageFileName('')
    })
    .catch (e => {
      toast('Failed to upload the file. Please try again.')
      return
    })
  }

  const onClickAddVideo = () => {
    // validation
    if (videoFileName === '') {
      toast('Please choose a video file.')
      return
    }

    // Reset Add Video
    document.getElementById('video-upload').value = ''
    setVideoFileName('')
  }

  const onChangeImageFile = e => {
    console.log('e: ', e)
    let files = e.target.files || e.dataTransfer.files
    if (files.length === 0) {
      return
    }
    const pathItems = e.target.value.split('\\')
    console.log('pathItems: ', pathItems)
    setImageFileName(pathItems[pathItems.length - 1])
  }

  const onChangeVideoFile = e => {
    let files = e.target.files || e.dataTransfer.files
    if (files.length === 0) {
      return
    }
    const pathItems = e.target.value.split('\\')
    setVideoFileName(pathItems[pathItems.length - 1])
  }

  const openImageFile = () => {
    document.getElementById('image-upload').click()
  }
  
  const openVideoFile = () => {
    document.getElementById('video-upload').click()
  }

  return (
    <div className={styles.wrapper}>
      <h1>
        Web3 Fashion 101
      </h1>
      <div className={styles.toolbar}>

        <Button
          onClick={onClickImage}
        >
          IMAGE
        </Button>
        <Button
          onClick={onClickVideo}
        >
          VIDEO
        </Button>
        <Button
          onClick={onClickText}
        >
          TEXT
        </Button>
      </div>
      <div className={styles.addItem}>
        {
          isShowTextAdd && (
            <div className={styles.addText}>
              <h1>Text</h1>
              <textarea id='text-add-item' value={addTextDraft} onChange={e => setAddTextDraft(e.target.value)}/>
              <Button className={styles.addButton} onClick={onClickAddText}>
                ADD
              </Button>
            </div>
          )
        }
        {
          isShowImageAdd && (
            <div className={styles.addImage}>
              <h1>Image</h1>
              <input
                id='image-upload'
                type='file'
                onChange={onChangeImageFile}
                hidden
                accept='.jpg, .png, .gif'
              />
              <Button className={styles.uploadButton} background='black' onClick={openImageFile}>
                FILE UPLOAD
              </Button>
              <div className={styles.fileName}>
                {
                  imageFileName && imageFileName !== ''
                  ? imageFileName
                  : 'No file chosen'
                }
              </div>
              <Button className={styles.addButton} onClick={onClickAddImage}>
                ADD
              </Button>
            </div>
          )
        }
        {
          isShowVideoAdd && (
            <div className={styles.addVideo}>
              <h1>Video</h1>
              <input
                id='video-upload'
                type='file'
                onChange={onChangeVideoFile}
                hidden
                accept='.mp4, .mov'
              />
              <Button className={styles.uploadButton} background='black' onClick={openVideoFile}>
                FILE UPLOAD
              </Button>
              <div className={styles.fileName}>
                {
                  videoFileName && videoFileName !== ''
                  ? videoFileName
                  : 'No file chosen'
                }
              </div>
              <Button className={styles.addButton} onClick={onClickAddVideo}>
                ADD
              </Button>
            </div>
          )
        }
      </div>
      <div className={styles.web3FashionView}>
        <Moveable
          target={selectedTarget}
          container={null}
          origin={true}
          draggable={true}
          onDragStart={({ target, clientX, clientY }) => {
              console.log("onDragStart", target);
          }}
          onDrag={({
              target,
              beforeDelta, beforeDist,
              left, top,
              right, bottom,
              delta, dist,
              transform,
              clientX, clientY,
          }) => {
              console.log("onDrag left, top", left, top);
              // target!.style.left = `${left}px`;
              // target!.style.top = `${top}px`;
              console.log("onDrag translate", dist);
              target.style.transform = transform;
          }}
          onDragEnd={({ target, isDrag, clientX, clientY }) => {
            console.log("onDragEnd", target, isDrag);
          }}

          resizable={true}
          throttleResize={0}
          onResizeStart={({ target , clientX, clientY}) => {
              console.log("onResizeStart", target);
          }}
          onResize={({
              target, width, height,
              dist, delta, direction,
              clientX, clientY,
          }) => {
              console.log("onResize", target);
              delta[0] && (target.style.width = `${width}px`);
              delta[1] && (target.style.height = `${height}px`);
          }}
          onResizeEnd={({ target, isDrag, clientX, clientY }) => {
              console.log("onResizeEnd", target, isDrag);
          }}

        />
        {
          web3FashionItems.map((item, index) => {
            if (item.type === 'text') {
              console.log('item.value: ', item.value)
              return (
                <div className={[styles.target, styles.text, 'target'].join(' ')}
                  key={index}
                  onClick={onClickTarget}
                  dangerouslySetInnerHTML={{ __html: item.value }}
                >
                </div>
              )
            } else if (item.type === 'image') {
              console.log('item.value: ', item.value)
              return (
                <div className={[styles.target, styles.image, 'target'].join(' ')}
                  key={index}
                  onClick={onClickTarget}
                >
                  <img src={item.value} />
                </div>
              )
            }
          })
        }
        {/* <div className={[styles.target, styles.text, 'target'].join(' ')}
          onClick={onClickTarget}
        >
          Enter the information in the fillout boxes below to mint your 1155 NFT and contribute to our open sourced material, pattern, texture on-chain libraries. Your contribution can be used in master garments by other designers, artists, creators— it is open sourced. Open source doesn’t mean without monetisation. Our infrastructure is being built to eventually support automated fractional royalties for any designer as they contribute to open source libraries that can be leveraged in both the digital and physical dimensions. A decentralised commercial model. 
          <br />
          Although we can’t automatically enforce in smart contract code this fractional cross-chain, cross-realm royalty distribution as of yet, we still are continuing to prove out the model and hope that those that use these open source prints contribute a fractional portion of the sales back to the DIGITALAX, as we have done and plan to do for anyone contributing to our on-chain libraries going forward. Your NFT is minted on Matic Network for 99% more energy efficiency than the Ethereum or Bitcoin blockchains. Through our MultiToken bridge these NFTs can be bridged back to Ethereum for additional interoperability and functionalities.
        </div>

        <div className={[styles.target, styles.text, 'target'].join(' ')}
          onClick={onClickTarget}
        >
          Enter the information in the fillout boxes below to mint your 1155 NFT and contribute to our open sourced material, pattern, texture on-chain libraries. Your contribution can be used in master garments by other designers, artists, creators— it is open sourced. Open source doesn’t mean without monetisation. Our infrastructure is being built to eventually support automated fractional royalties for any designer as they contribute to open source libraries that can be leveraged in both the digital and physical dimensions. A decentralised commercial model. 
          <br />
          Although we can’t automatically enforce in smart contract code this fractional cross-chain, cross-realm royalty distribution as of yet, we still are continuing to prove out the model and hope that those that use these open source prints contribute a fractional portion of the sales back to the DIGITALAX, as we have done and plan to do for anyone contributing to our on-chain libraries going forward. Your NFT is minted on Matic Network for 99% more energy efficiency than the Ethereum or Bitcoin blockchains. Through our MultiToken bridge these NFTs can be bridged back to Ethereum for additional interoperability and functionalities.
        </div> */}
      </div>
    </div>
  )
}

export default BottomPart