import React, { useEffect, useState, useRef }  from 'react'
import { Paper } from '@material-ui/core'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import styles from './styles.module.scss'

const patternCircle = props => {
  const { item, index, direction = 'Right', secondPart } = props
  const curImage = useRef(null)
  const imgViewer = useRef(null)
  const description = useRef(null)

  const hovered = () => {
    curImage.current.style.backgroundImage = `url(${item.thumbnail ? item.thumbnail : item.image})`
    imgViewer.current.classList.remove('fadeOut' + direction)
    imgViewer.current.classList.add('fadeIn' + direction)
    const nameItem = item.attributes.find(item => item.type === 'Name of Item')
    let descriptionInnerHTML = ''
    if (nameItem) {
      descriptionInnerHTML = nameItem.value + '<br />'
    }
    descriptionInnerHTML += item.description
    description.current.innerHTML = descriptionInnerHTML
  }

  const hleave = (when, e) => {
    if (
      (when === 1 &&
        e.relatedTarget &&
        e.relatedTarget.classList.value.search('curImage') === -1 &&
        e.relatedTarget.classList.value.search('imgViewer') === -1) ||
      when === 2
    ) {
      if (curImage.current !== null) {
        imgViewer.current.classList.remove('fadeIn' + direction)
        imgViewer.current.classList.add('fadeOut' + direction)
      }
    }
  }

  let marginLeft = 0
  let marginTop = 0

  if (!secondPart) {
    marginLeft = index % 3 * 30
    
    if (index === 2) {
      marginLeft = 65
      marginTop = -23
    } else if (index === 5) {
      marginLeft = -20
      marginTop = -23
    }
  }

  return (
    <div className={[styles.patternCircle, secondPart ? styles.secondPart : ''].join(' ')} 
      
      style={!secondPart ? {
        marginLeft: `${marginLeft}%`,
        marginTop: `${marginTop}%`

      } : {
        marginTop: `${index % 3 === 1 ? -10 : 0}vw`
      }}
    >
      <img 
        src={item.thumbnail ? item.thumbnail : item.image}
        onMouseOver={() => hovered()}
        onMouseOut={(e) => hleave(1, e)}
      />
      <Paper
        className={[
          'circlemenu_imgViewer fadeOut' + direction, 
          styles.patternCircleViewer, 
          direction === 'Right' ? styles.Right : '',
          direction === 'Left' ? styles.Left : ''
        ].join(' ')}
        elevation={3}
        ref={imgViewer}
        onMouseLeave={(e) => hleave(2, e)}
      >
        <div className='circlemenu_curImage' ref={curImage}>
          <div
            className={['circlemenu_imgDescription', styles.description].join(' ')}
            ref={description}
          />
        </div>
      </Paper>
    </div>
  )
}


export default patternCircle