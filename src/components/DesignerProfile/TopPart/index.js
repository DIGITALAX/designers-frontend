import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import Button from '@components/Button'
import CollectionCard from '@components/collection-card'
import OnChainFashionSubmitForm from '../OnChainFashionSubmitForm'
import designerActions from '@actions/designer.actions'
import styles from './styles.module.scss'


const DesignerProfileTopPart = props => {
  const { isEdit, designerInfo, materialList, marketplaceItems } = props

  const [avatarUrl, setAvatarUrl] = useState('')
  const [isEditingAvatar, setIsEditingAvatar] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [descriptionDraft, setDescriptionDraft] = useState('')
  const [twitterDraft, setTwitterDraft] = useState('')
  const [instagramDraft, setInstagramDraft] = useState('')
  const [tiktokDraft, setTiktokDraft] = useState('')
  const [youtubeDraft, setYoutubeDraft] = useState('')
  const [linkedinDraft, setLinkedinDraft] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('--here')
    setAvatarUrl(designerInfo['image_url'])
  }, [designerInfo['image_url']])

  useEffect(() => {
    setTwitterDraft(designerInfo['twitter'])
    console.log('twitter: ', designerInfo['twitter'])
  }, [designerInfo['twitter']])

  useEffect(() => {
    setInstagramDraft(designerInfo['instagram'])
  }, [designerInfo['instagram']])

  useEffect(() => {
    setLinkedinDraft(designerInfo['linkedin'])
  }, [designerInfo['linkedin']])

  useEffect(() => {
    setYoutubeDraft(designerInfo['youtube'])
  }, [designerInfo['youtube']])

  useEffect(() => {
    setTiktokDraft(designerInfo['tiktok'])
  }, [designerInfo['tiktok']])

  // Mod Avatar
  const showBrowserForAvatar = () => {
    document.getElementById('avatar-upload').click()
  }
  
  const cancelModAvatar = () => {
    setIsEditingAvatar(false)
    setAvatarUrl(designerInfo['image_url'])
    document.getElementById('avatar-upload').value = ''
  }

  const saveModAvatar = () => {
    let files = document.getElementById('avatar-upload').files
    if (files.length === 0) {
      cancelModAvatar()
      return
    }

    dispatch(designerActions.uploadAvatar(files[0]))
    setIsEditingAvatar(false)
    document.getElementById('avatar-upload').value = ''
  }

  const onChangeAvatarFile = (e) => {
    let files = e.target.files || e.dataTransfer.files
    if (files.length === 0) {
      return
    }

    setAvatarUrl(URL.createObjectURL(files[0]))
    setIsEditingAvatar(true)
  }

  // Mod Description
  const showEditDescription = () => {
    setDescriptionDraft(designerInfo['description'])
    setIsEditingDescription(true)
  }
  
  const saveModDescription = () => {
    designerInfo['description'] = descriptionDraft
    dispatch(designerActions.updateProfile(designerInfo))
    setIsEditingDescription(false)
  }
  
  const cancelModDescription = () => {
    setIsEditingDescription(false)
  }

  const onChangeDescription = (e) => {
    setDescriptionDraft(e.target.value)
  }

  // Add more
  const addMore = () => {
    window.open('/minting', '_blank')
  }

  // Social
  const saveSocialLinks = () => {
    designerInfo['twitter'] = twitterDraft
    designerInfo['instagram'] = instagramDraft
    designerInfo['linkedin'] = linkedinDraft
    designerInfo['youtube'] = youtubeDraft
    designerInfo['tiktok'] = tiktokDraft

    dispatch(designerActions.updateProfile(designerInfo))
  }

  return (
    <div className={styles.wrapper}>
      <img className={styles.background} src='/images/designer-page/background.png' />
      <div className={styles.rect1}></div>
      <div className={styles.rect2}></div>
      {!isEdit && <img className={styles.triangle} src='/images/designer-page/triangle.png' />}
      <img className={styles.userPhoto} src={avatarUrl} />
      <input
        id='avatar-upload'
        type='file'
        onChange={onChangeAvatarFile}
        hidden
        accept='.jpg, .png, .gif'
      />
      {
        isEdit && !isEditingAvatar &&
        <Button
          className={[styles.modPFPButton, styles.blueButton].join(' ')}
          onClick={() => showBrowserForAvatar()}
        >
          MOD PFP
        </Button>
      }
      {
        isEdit && isEditingAvatar &&
        <Button
          className={[styles.modPFPButtonSave, styles.blueButton].join(' ')}
          onClick={() => saveModAvatar()}
        >
          SAVE
        </Button>
      }
      {
        isEdit && isEditingAvatar &&
        <Button
          className={[styles.modPFPButtonCancel, styles.blueButton].join(' ')}
          onClick={() => cancelModAvatar()}
        >
          CANCEL
        </Button>
      }
      <img className={styles.claimUsername} src='/images/designer-page/claim-username.png' />

      <div className={styles.designerName}>
        { designerInfo['designerId'].toUpperCase() }
        <img className={styles.arrowImg} src='/images/designer-page/arrow.png' />
      </div>
      {
        isEdit && 
        <Button className={[styles.modNameButton, styles.blueButton].join(' ')}>MOD</Button>
      }
      
      {!isEdit && <div className={styles.socialIcons}>
        {
          designerInfo['twitter'] && designerInfo['twitter'] !== '' &&
          <Link href={designerInfo['twitter']}>
            <a target='_blank'>
              <img src='/images/social-button-circle/twitter.png' />
            </a>
          </Link>
        }
        {
          designerInfo['instagram'] && designerInfo['instagram'] !== '' &&
          <Link href={designerInfo['instagram']}>
            <a target='_blank'>
              <img src='/images/social-button-circle/instagram.png' />
            </a>
          </Link>
        }
        {
          designerInfo['linkedin'] && designerInfo['linkedin'] !== '' &&
          <Link href={designerInfo['linkedin']}>
            <a target='_blank'>
              <img src='/images/social-button-circle/linkedin.png' />
            </a>
          </Link>
        }
        {
          designerInfo['tiktok'] && designerInfo['tiktok'] !== '' &&
          <Link href={designerInfo['tiktok']}>
            <a target='_blank'>
              <img src='/images/social-button-circle/tiktok.png' />
            </a>
          </Link>
        }
        {
          designerInfo['youtube'] && designerInfo['youtube'] !== '' &&
          <Link href={designerInfo['youtube']}>
            <a target='_blank'>
              <img src='/images/social-button-circle/youtube.png' />
            </a>
          </Link>
        }
      </div>
      }

      {isEdit && <div className={styles.inputSocialIcons}>
        <div className={styles.inputRow}>
          <img src='/images/social-button-circle/twitter.png' />
          <input type='text' value={twitterDraft} onChange={e => setTwitterDraft(e.target.value)} />
        </div>
        <div className={styles.inputRow}>
          <img src='/images/social-button-circle/instagram.png' />
          <input type='text' value={instagramDraft} onChange={e => setInstagramDraft(e.target.value)} />
        </div>
        <div className={styles.inputRow}>
          <img src='/images/social-button-circle/tiktok.png' />
          <input type='text' value={tiktokDraft} onChange={e => setTiktokDraft(e.target.value)}/>
        </div>
        <div className={styles.inputRow}>
          <img src='/images/social-button-circle/youtube.png' />
          <input type='text' value={youtubeDraft} onChange={e => setYoutubeDraft(e.target.value)} />
        </div>
        <div className={styles.inputRow}>
          <img src='/images/social-button-circle/linkedin.png' />
          <input type='text' value={linkedinDraft} onChange={e => setLinkedinDraft(e.target.value)} />
        </div>
        <Button
          className={[styles.modSocialSave, styles.blueButton].join(' ')}
          onClick={() => saveSocialLinks()}
        >
          SAVE
        </Button>
      </div>
      }

      { 
        !isEditingDescription && <div className={[styles.designerDescription, isEdit ? styles.editing : ''].join(' ')}>
          { designerInfo['description'] }
        </div>
      }
      {
        isEdit && isEditingDescription && <textarea
          className={styles.editDescription}
          onChange={onChangeDescription}
          value={descriptionDraft}
        />
      }
      {
        isEdit && !isEditingDescription && 
        <Button
          className={[styles.modDescriptionButton, styles.blueButton].join(' ')}
          onClick={() => showEditDescription()}
        >
          MOD
        </Button>
      }
      {
        isEdit && isEditingDescription &&
        <Button
          className={[styles.modDescriptionButtonSave, styles.blueButton].join(' ')}
          onClick={() => saveModDescription()}
        >
          SAVE
        </Button>
      }
      {
        isEdit && isEditingDescription &&
        <Button
          className={[styles.modDescriptionButtonCancel, styles.blueButton].join(' ')}
          onClick={() => cancelModDescription()}
        >
          CANCEL
        </Button>
      }

      {!isEdit && 
      <div className={styles.patternSection}>
        <div className={[styles.patternWrapper3, materialList.length <= 5 ? styles.smallPattern : ''].join(' ')}>
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
          <div className={styles.selectionGroup}>
            <img src='/images/designer-page/pattern-selection.png' />
            <img src='/images/designer-page/pattern-selection.png' />
            <img src='/images/designer-page/pattern-selection.png' />
            <img src='/images/designer-page/pattern-selection.png' />
            <img src='/images/designer-page/pattern-selection.png' />
          </div>
          <div className={styles.gamePad}>
            <img src='/images/designer-page/gamepad.png' />
          </div>
          
        </div>
        
      </div>
      }

      <div className={styles.ownershipText}>
        Fractional Garment Ownership.          
      </div>
      {
        isEdit && 
        <Button
          className={[styles.addMoreButton, styles.blueButton].join(' ')}
          onClick={() => addMore()}
        >
          ADD MORE TO FGO
        </Button>
      }
      
      {!isEdit && 
      <div className={styles.marketplaceSection}>
        <h1>
          On-Chain Fashion            
        </h1>
        <div className={styles.marketplaceItems}>
          {
            marketplaceItems.map((item, index) => 
              <CollectionCard 
                item={item}
                key={item.animation && item.animation != '' ? item.animation : item.image}
              />
            )
          }
        </div>
      </div>
      }

      <div className={styles.patternWrapper2}>
        <img className={styles.patternSample1} src='/images/designer-page/pattern_sample1.png' />
        <img className={styles.patternSample2} src='/images/designer-page/pattern_sample2.png' />
        <img className={styles.patternSample3} src='/images/designer-page/pattern_sample3.png' />
      </div>

      {
        isEdit &&
        <div className={styles.submitFormWrapper}>
          <h1>
            On-Chain Fashion
          </h1>
          <OnChainFashionSubmitForm 
            designerId={designerInfo['designerId']}
          />
        </div>
      }
    </div>
  )
}

export default DesignerProfileTopPart