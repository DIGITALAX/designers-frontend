import React, { useEffect, useState } from 'react'
import { Button, Select, MenuItem } from '@material-ui/core'
import styles from './styles.module.scss'

const FontNames = [
  'Poppins',
  'Raleway',
  'Roboto',
  'Babycakes',
  'Fashionism',
  'Redmond Fashion',
  'PUNK FASHION',
  'Regular Fashion',
  'Just Old Fashion'
]

const FontSizes = [
  '6',
  '8',
  '10',
  '12',
  '14',
  '16',
  '20',
  '24',
  '30'
]



const ChooseFont = props => {
  const { target, onClosed } = props
  const [fontName, setFontName] = useState('')
  const [fontSize, setFontSize] = useState('')

  useEffect(() => {
    setFontName(target.style.fontFamily.replaceAll('"', ''))
    setFontSize(target.style.fontSize.replace('pt', ''))
    console.log('target: ', target.style.fontFamily.replace('"', '-'))

  }, [target])


  const onChangeFontName = e => {
    setFontName(e.target.value)
    target.style.fontFamily = e.target.value
  }
  
  const onChangeFontSize = e => {
    setFontSize(e.target.value)
    target.style.fontSize = e.target.value + 'pt'
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        Choose Font
      </div>
      <Select
        className={styles.fontFamily}
        onChange={onChangeFontName}
        style={{
          fontFamily: fontName,
        }}
        value={fontName}
      >
        {
          FontNames.map((item, index) => {
            return (
              <MenuItem 
                key={index} 
                value={item}
                style={{
                  fontFamily: item
                }}>
                {
                  item
                }
              </MenuItem>
            )
          })
        }
      </Select>

      <Select
        className={styles.fontSize}
        onChange={onChangeFontSize}
        value={fontSize}
      >
        {
          FontSizes.map((item, index) => {
            return (
              <MenuItem
                key={index}
                value={item}
              >
                {
                  item
                }
              </MenuItem>
            )
          })
        }
      </Select>
      
      <Button
        className={styles.closeButton}
        onClick={onClosed}
      >
        Close
      </Button>
    </div>
  )
}

export default ChooseFont