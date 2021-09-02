import React, { useState } from 'react'

import Button from '@components/Button'
import {
  EXCLUSIVE_RARITY,
  COMMON_RARITY,
  SEMI_RARE_RARITY
} from '@constants/global.constants'

import styles from './styles.module.scss'

const QuestionMark = props => {
  const { children } = props
  
  return (
    <span className={styles.questionMarkWrapper}>
      <div className={styles.questionCircle}>?</div>
      <div className={styles.questionText}>
        {
          children
        }
      </div>
    </span>
  )
}

const OnChainFashionSubmitForm = props => {
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemEditionNo, setItemEditionNo] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [itemType, setItemType] = useState('')
  const [itemAttachFGO, setItemAttachFGO] = useState('')

  const onChangeSourceFile = () => {

  }

  const openSourceFile = () => {
    document.getElementById('source-upload').click()
  }

  const onSend = () => {

  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftSide}>
        <div className={styles.leftTop}>
          <div className={styles.label}>ITEM NAME</div>
          <input 
            className={styles.marginBottom50}
            type='text'
            value={itemName}
            onChange={e => setItemName(e.target.value)} 
          />
          <div className={styles.label}>DESCRIPTION</div>
          <textarea
            value={itemDescription}
            onChange={e => setItemDescription(e.target.value)}
          />
        </div>
        <div className={styles.leftBottom}>
          <div className={styles.rarityWrapper}>
            <div className={styles.label}>rarity</div>
            <Button>Exclusive</Button>
            <Button>SEMI-RARE</Button>
            <Button>COMMON</Button>
          </div>
          <div className={styles.editionWrapper}>
            <div className={styles.label}>EDITION NO.</div>
            <input
              className={styles.marginBottom30}
              type='text'
              value={itemEditionNo}
              onChange={e => setItemEditionNo(e.target.value)}
            />
            <div className={styles.label}>PRICE(S)</div>
            <input
              className={styles.marginBottom30}
              type='text'
              value={itemPrice}
              onChange={e => setItemPrice(e.target.value)}
            />
            <div className={styles.label}>
              TYPE 
              <QuestionMark>
                AUCTIONS ARE ONLY EXCLUSIVE, OTHER RARITIES CAN BE INSTANT BUY
              </QuestionMark>
            </div>
            <input
              className={styles.marginBottom30}
              type='text'
              value={itemType}
              onChange={e => setItemType(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.label}>SOURCE FILE
          <QuestionMark>
            Open source fashion. Upload the source file i.e. zprj, blend, fbx
          </QuestionMark>
        </div>
        <input
          id='source-upload'
          type='file'
          onChange={onChangeSourceFile}
          hidden
          accept=".*"
        />
        <Button className={styles.uploadButton} background='black' onClick={openSourceFile}>
          FILE UPLOAD
        </Button>
        <div className={styles.fileName}>No file chosen</div>
        <div className={[styles.label, styles.marginTop22].join(' ')}>
          RENDERS
          <QuestionMark>
            COMPRESS FILES TO BELOW 50MB
          </QuestionMark>
        </div>
        <div className={styles.renderRow}>
          <div className={styles.uploadItem}>
            <input
              id='render1-upload'
              type='file'
              onChange={onChangeSourceFile}
              hidden
              accept=".*"
            />
            <Button className={styles.uploadButton} background='black' onClick={openSourceFile}>
              FILE UPLOAD
            </Button>
            <div className={styles.fileName}>No file chosen</div>
          </div>
          <div className={styles.uploadItem}>
            <input
              id='render2-upload'
              type='file'
              onChange={onChangeSourceFile}
              hidden
              accept=".*"
            />
            <Button className={styles.uploadButton} background='black' onClick={openSourceFile}>
              FILE UPLOAD
            </Button>
            <div className={styles.fileName}>No file chosen</div>
          </div>
        </div>
        <div className={styles.renderRow}>
          <div className={styles.uploadItem}>
            <input
              id='render1-upload'
              type='file'
              onChange={onChangeSourceFile}
              hidden
              accept=".*"
            />
            <Button className={styles.uploadButton} background='black' onClick={openSourceFile}>
              FILE UPLOAD
            </Button>
            <div className={styles.fileName}>No file chosen</div>
          </div>
          <div className={styles.uploadItem}>
            <input
              id='render2-upload'
              type='file'
              onChange={onChangeSourceFile}
              hidden
              accept=".*"
            />
            <Button className={styles.uploadButton} background='black' onClick={openSourceFile}>
              FILE UPLOAD
            </Button>
            <div className={styles.fileName}>No file chosen</div>
          </div>
        </div>
        <div className={styles.renderRow}>
          <div className={styles.uploadItem}>
            <input
              id='render1-upload'
              type='file'
              onChange={onChangeSourceFile}
              hidden
              accept=".*"
            />
            <Button className={styles.uploadButton} background='black' onClick={openSourceFile}>
              FILE UPLOAD
            </Button>
            <div className={styles.fileName}>No file chosen</div>
          </div>
        </div>
        <div className={[styles.label, styles.marginTop22].join(' ')}>
          ATTACH FGO
          <QuestionMark>
            LIST NAME OF FGO PATTERNS TO ATTACH
          </QuestionMark>
        </div>
        <div className={styles.buttonRow}>
          <input
            className={styles.marginBottom30}
            type='text'
            value={itemAttachFGO}
            onChange={e => setItemAttachFGO(e.target.value)}
          />
          <Button className={styles.sendButton} onClick={onSend}>
            Send OFF
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OnChainFashionSubmitForm