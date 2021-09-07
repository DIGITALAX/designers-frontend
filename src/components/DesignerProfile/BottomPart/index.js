import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Moveable from 'react-moveable'
import { toast } from 'react-toastify'

import api from '@services/api/espa/api.service'
import designerActions from '@actions/designer.actions'

import Button from '@components/Button'
import styles from './styles.module.scss'

const BottomPart = props => {
  const { designerInfo, isEditable } = props

  const [selectedTarget, setSelectedTarget] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [web3FashionItems, setWeb3FashionItems] = useState([])
  const [isShowTextAdd, setIsShowTextAdd] = useState(false)
  const [isShowImageAdd, setIsShowImageAdd] = useState(false)
  const [isShowVideoAdd, setIsShowVideoAdd] = useState(false)
  const [imageFileName, setImageFileName] = useState('')
  const [videoFileName, setVideoFileName] = useState('')
  const [addTextDraft, setAddTextDraft] = useState('')
  const [isTextEdit, setIsTextEdit] = useState(false)
  const [scale, setScale] = useState(1)
  const [wrapperHeight, setWrapperHeight] = useState(400)

  const dispatch = useDispatch()

  function handleResize() {
    setSelectedTarget(null)
    setScale(window.innerWidth / 1920)
    const maxYValue = getMaxYValue()
    setWrapperHeight((maxYValue + 100) * scale)
  }

  useEffect(() => {  
    window.addEventListener('resize', handleResize)
    return _ => {
      window.removeEventListener('resize', handleResize)
    }
  })

  useEffect(() => {
    try {
      const web3Items = JSON.parse(designerInfo['web3FashionItems'])
      web3Items.forEach(item => {
        console.log('item.style.height: ', item.style.height)
        console.log('item.style.transform: ', item.style.transform)
      })
      setWeb3FashionItems(web3Items)
      handleResize()
    } catch (e) {

    }
  }, [designerInfo['web3FashionItems']])

  const Removable = {
    name: 'removable',
    props: {},
    events: {},
    render(moveable, React) {
      const rect = moveable.getRect()
      const { pos2 } = moveable.state

      // use css for able
      const RemovableViewer = moveable.useCSS('div', `
      {
        position: absolute;
        left: 0px;
        top: 0px;
        will-change: transform;
        transform-origin: 0px 0px;
      }
  
      .removable-button, .editable-button {
        position: relative;
        width: 24px;
        height: 24px;
        margin-bottom: 4px;
        background: #4af;
        border-radius: 4px;
        appearance: none;
        border: 0;
        color: white;
        font-weight: bold;
      }

      .editable-button {
        padding: 4px;
      }
  
      .removable-button::before, .removable-button::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        width: 16px;
        height: 2px;
        background: #fff;
        border-radius: 1px;
        cursor: pointer;
      }
      
      .removable-button::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      `)

      const isText = selectedIndex >= 0 && web3FashionItems[selectedIndex] && 
      web3FashionItems[selectedIndex].type === 'text'
  
      // Add key (required)
      // Add class prefix moveable-(required)
      return <RemovableViewer 
        key='removable-viewer'
        className={'moveable-removable'}
  
        style={{
          transform: `translate(${pos2[0]}px, ${pos2[1]}px) rotate(${rect.rotation}deg) translate(10px)`,
          color: 'red'
        }}
      >
          <button className='removable-button'
            onClick={() => {
              web3FashionItems.splice(selectedIndex, 1)
              setWeb3FashionItems(web3FashionItems)
              setSelectedTarget(null)
            }}
          >
          </button>
          {
            isText && <button className='editable-button'
              onClick={() => {
                setIsTextEdit(true)
              }}
            >
              <img src='/images/designer-page/edit.svg' />
            </button>
          }
      </RemovableViewer>
    }
  }

  const onClickTarget = (target, index) => {
    if (!target.classList || !target.classList.contains('target')) return
    setSelectedTarget(target)
    setSelectedIndex(index)
    setIsTextEdit(false)
  }


  const onClickImage = () => {
    setIsShowImageAdd(true)
    setIsShowVideoAdd(false)
    setIsShowTextAdd(false)
    setSelectedTarget(null)
  }

  const onClickVideo = () => {
    setIsShowImageAdd(false)
    setIsShowVideoAdd(true)
    setIsShowTextAdd(false)
    setSelectedTarget(null)
  }

  const onClickText = () => {
    setIsShowImageAdd(false)
    setIsShowVideoAdd(false)
    setIsShowTextAdd(true)
    setSelectedTarget(null)
  }

  const uploadFile = async file => {
    try {
      dispatch(designerActions.setIsloading(true))
      let url = await api.getPresignedGeneralUrl(file.type)
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

    setWeb3FashionItems(web3FashionItems)

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
        value: uploaded
      })

      setWeb3FashionItems(web3FashionItems)
  
      // Reset Add Image
      imageUploadEl.value = ''
      setImageFileName('')
    })
    .catch (e => {
      console.log('e: ', e)
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

    const videoUploadEl = document.getElementById('video-upload')
    
    uploadFile(videoUploadEl.files[0])
    .then (uploaded => {
      if (!uploaded) {
        toast('Failed to upload the file. Please try again.')
        return
      }

      web3FashionItems.push({
        type: 'video',
        value: uploaded
      })

      setWeb3FashionItems(web3FashionItems)
  
      // Reset Add Video
      videoUploadEl.value = ''
      setVideoFileName('')
    })
    .catch (e => {
      console.log('e: ', e)
      toast('Failed to upload the file. Please try again.')
      return
    })
  }

  const onChangeImageFile = e => {
    let files = e.target.files || e.dataTransfer.files
    if (files.length === 0) {
      return
    }
    const pathItems = e.target.value.split('\\')
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

  const onClickReset = () => {
    setWeb3FashionItems(JSON.parse(designerInfo['web3FashionItems']))
  }

  const onClickSave = () => {
    designerInfo['web3FashionItems'] = JSON.stringify(web3FashionItems)
    console.log('designerInfo: ', designerInfo)
    dispatch(designerActions.updateProfile({...designerInfo}))
  }

  const getMaxYValue = () => {
    const yValues = web3FashionItems.map((item, index) => {
      let translateY = 0
      let itemHeight = 0
      if (item && item.style) {
        const matrix = new WebKitCSSMatrix(item.style.transform)
        if (matrix['m42']) {
          translateY = matrix['m42']
        }
        
        if (item.style.height) {
          itemHeight = parseInt(item.style.height, 10)
        } else {
          const el = document.getElementById(`web3-fashion-item-${index}`)
          itemHeight = el ? el.clientHeight : 0
        }
      }
      return itemHeight + translateY
    })
    return Math.max(...yValues, 400)
  }

  const maxYValue = getMaxYValue()

  useEffect(() => {
    setWrapperHeight((maxYValue + 100) * scale)
  }, [maxYValue])

  // console.log('yValues: ', yValues)
  // console.log('maxY: ', )

  return (
    <div className={styles.wrapper}>
      {
        (isEditable || web3FashionItems.length > 0) && 
        <h1>
          Web3 Fashion 101
        </h1>
      }
      {isEditable && <div className={styles.toolbar}>
        <div className={styles.leftPart}>
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
        <div className={styles.rightPart}>
          <Button onClick={onClickSave}>Save</Button>
          <Button onClick={onClickReset}>Reset</Button>
        </div>
      </div>
      }
      {
      isEditable && 
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
      }
      {/* {isEditable && <Moveable
        target={document.querySelector('.web3-fashion-wrapper')}
        resizable={true}
        renderDirections={["nw","n","ne","w","e","sw","s","se"]}
        throttleResize={0}
        onResizeStart={({ target , clientX, clientY}) => {

        }}

        onResize={({
            target, width, height,
            dist, delta, direction,
            clientX, clientY
        }) => {
          // delta[0] && (target.style.width = `${width}px`)
          delta[1] && (target.style.height = `${height}px`)
        }}
        onResizeEnd={({ target, isDrag, clientX, clientY }) => {
          // target.style = {
          //   width: target.style.width,
          //   height: target.style.height,
          //   transform: target.style.transform
          // }
        }}
        />
      } */}
      <div className={[styles.web3FashionView, 'web3-fashion-wrapper'].join(' ')}
        style={{         
          width: 1920,
          height: wrapperHeight,
          transformOrigin: '0 0',
          transform: `scale(${scale})`
        }}
      >

        {isEditable && <Moveable
          target={selectedTarget}
          container={null}
          checkInput={isTextEdit}
          ables={[Removable]}
          props={{
            removable: true
          }}

          origin={true}
          draggable={true}
          onDragStart={({ target, clientX, clientY }) => {
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
              target.style.transform = transform
          }}
          onDragEnd={({ target, isDrag, clientX, clientY }) => {
            web3FashionItems[selectedIndex].style = {
              width: target.style.width,
              height: target.style.height,
              transform: target.style.transform
            }
            setWeb3FashionItems([...web3FashionItems])
            onClickTarget(document.getElementById(`web3-fashion-item-${selectedIndex}`), selectedIndex)
            // const matrix = new WebKitCSSMatrix(target.style.transform)
            // console.log('matrix: ', matrix['m42'])
            // target.style.height + target.style.transform.
            // setWrapperHeight
          }}

          resizable={true}
          renderDirections={["nw","n","ne","w","e","sw","s","se"]}
          throttleResize={0}
          onResizeStart={({ target , clientX, clientY}) => {

          }}

          onResize={({
              target, width, height,
              dist, delta, direction,
              clientX, clientY
          }) => {
            delta[0] && (target.style.width = `${width}px`)
            delta[1] && (target.style.height = `${height}px`)
          }}
          onResizeEnd={({ target, isDrag, clientX, clientY }) => {
            web3FashionItems[selectedIndex].style = {
              width: target.style.width,
              height: target.style.height,
              transform: target.style.transform
            }
            setWeb3FashionItems([...web3FashionItems])
            onClickTarget(document.getElementById(`web3-fashion-item-${selectedIndex}`), selectedIndex)
          }}

          rotatable={true}
          throttleRotate={0}
          onRotateStart={e => {
            
          }}
          onRotate={({
            target,
            delta, dist,
            transform,
            clientX, clientY,
          }) => {
            target.style.transform = transform
          }}
          onRotateEnd={({ target, isDrag, clientX, clientY }) => {
            web3FashionItems[selectedIndex].style = {
              width: target.style.width,
              height: target.style.height,
              transform: target.style.transform
            }
            setWeb3FashionItems([...web3FashionItems])
            onClickTarget(document.getElementById(`web3-fashion-item-${selectedIndex}`), selectedIndex)
          }}

        />
        }

        {
          web3FashionItems.map((item, index) => {
            if (item.type === 'text') {
              return (
                <div className={[styles.target, styles.text, 'target', isEditable ? styles.showBorder : ''].join(' ')}
                  id={`web3-fashion-item-${index}`}
                  key={JSON.stringify(item)}
                  style={item.style || {}}
                  onClick={e => onClickTarget(e.target, index)}
                  contentEditable={isEditable}
                  dangerouslySetInnerHTML={{ __html: item.value }}
                >
                </div>
              )
            } else if (item.type === 'image') {
              return (
                <img className={[styles.target, styles.image, 'target', isEditable ? styles.showBorder : ''].join(' ')}
                  key={JSON.stringify(item)}
                  id={`web3-fashion-item-${index}`}
                  style={item.style || {}}
                  onClick={e => onClickTarget(e.target, index)}
                  src={item.value} 
                />
              )
            } else if (item.type === 'video') {
              return (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={item.style || {}}
                  className={[styles.target, styles.video, 'target', isEditable ? styles.showBorder : ''].join(' ')}
                  id={`web3-fashion-item-${index}`}
                  key={JSON.stringify(item)}
                  onClick={e => onClickTarget(e.target, index)}
                >
                  <source src={item.value} type='video/mp4' />
                </video>
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default BottomPart