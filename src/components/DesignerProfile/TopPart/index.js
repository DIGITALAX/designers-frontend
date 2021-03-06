import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import Button from '@components/Button';
import CollectionCard from '@components/collection-card';
import OnChainFashionSubmitForm from '../OnChainFashionSubmitForm';
import PatternCircle from '@components/DesignerProfile/PatternCircle';
import designerActions from '@actions/designer.actions';
import styles from './styles.module.scss';

const MAX_DESCRIPTION_LENGTH = 672;

const DesignerProfileTopPart = (props) => {
  const { isEdit, designerInfo, materialList, marketplaceItems } = props;

  const [avatarUrl, setAvatarUrl] = useState('');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [descriptionDraft, setDescriptionDraft] = useState('');
  const [twitterDraft, setTwitterDraft] = useState('');
  const [instagramDraft, setInstagramDraft] = useState('');
  const [tiktokDraft, setTiktokDraft] = useState('');
  const [youtubeDraft, setYoutubeDraft] = useState('');
  const [linkedinDraft, setLinkedinDraft] = useState('');
  const [mirrorDraft, setMirrorDraft] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('--here');
    setAvatarUrl(designerInfo['image_url']);
  }, [designerInfo['image_url']]);

  useEffect(() => {
    setTwitterDraft(designerInfo['twitter']);
    console.log('twitter: ', designerInfo['twitter']);
  }, [designerInfo['twitter']]);

  useEffect(() => {
    setInstagramDraft(designerInfo['instagram']);
  }, [designerInfo['instagram']]);

  useEffect(() => {
    setMirrorDraft(designerInfo['ThreadMirror']);
  }, [designerInfo['ThreadMirror']])

  useEffect(() => {
    setLinkedinDraft(designerInfo['linkedin']);
  }, [designerInfo['linkedin']]);

  useEffect(() => {
    setYoutubeDraft(designerInfo['youtube']);
  }, [designerInfo['youtube']]);

  useEffect(() => {
    setTiktokDraft(designerInfo['tiktok']);
  }, [designerInfo['tiktok']]);

  // Mod Avatar
  const showBrowserForAvatar = () => {
    document.getElementById('avatar-upload').click();
  };

  const cancelModAvatar = () => {
    setIsEditingAvatar(false);
    setAvatarUrl(designerInfo['image_url']);
    document.getElementById('avatar-upload').value = '';
  };

  const saveModAvatar = () => {
    let files = document.getElementById('avatar-upload').files;
    if (files.length === 0) {
      cancelModAvatar();
      return;
    }

    dispatch(designerActions.uploadAvatar(files[0]));
    setIsEditingAvatar(false);
    document.getElementById('avatar-upload').value = '';
  };

  const onChangeAvatarFile = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (files.length === 0) {
      return;
    }

    setAvatarUrl(URL.createObjectURL(files[0]));
    setIsEditingAvatar(true);
  };

  // Mod Description
  const showEditDescription = () => {
    setDescriptionDraft(designerInfo['description']);
    setIsEditingDescription(true);
  };

  const saveModDescription = () => {
    designerInfo['description'] = descriptionDraft;
    dispatch(designerActions.updateProfile(designerInfo));
    setIsEditingDescription(false);
  };

  const cancelModDescription = () => {
    setIsEditingDescription(false);
  };

  const onChangeDescription = (e) => {
    setDescriptionDraft(e.target.value.substring(0, MAX_DESCRIPTION_LENGTH));
  };

  // Add more
  const addMore = () => {
    window.open('/minting', '_blank');
  };

  // Social
  const saveSocialLinks = () => {
    designerInfo['twitter'] = twitterDraft.includes('twitter.com')
      ? twitterDraft
      : `https://twitter.com/${twitterDraft}`;
    designerInfo['instagram'] = instagramDraft.includes('https')
      ? instagramDraft
      : `https://${instagramDraft}`;
    designerInfo['linkedin'] = linkedinDraft.includes('https')
      ? linkedinDraft
      : `https://${linkedinDraft}`;
    designerInfo['youtube'] = youtubeDraft.includes('https')
      ? youtubeDraft
      : `https://${youtubeDraft}`;
    designerInfo['tiktok'] = tiktokDraft.includes('https') ? tiktokDraft : `https://${tiktokDraft}`;
    designerInfo['ThreadMirror'] = mirrorDraft.includes('https') ? mirrorDraft : `https://${mirrorDraft}`;

    dispatch(designerActions.updateProfile(designerInfo));
  };

  return (
    <div className={styles.wrapper}>
      <img className={styles.background} src="/images/designer-page/background.png" />
      {!!designerInfo.GDNPurveyor && (
        <div className={styles.purveyor}> GDN Purveyor Sector: {designerInfo.GDNPurveyor} </div>
      )}
      <div className={styles.rect1}></div>
      <div className={styles.rect2}></div>
      {!isEdit && <img className={styles.triangle} src="/images/designer-page/triangle.png" />}
      <img className={styles.userPhoto} src={avatarUrl} />
      <input
        id="avatar-upload"
        type="file"
        onChange={onChangeAvatarFile}
        hidden
        accept=".jpg, .png, .gif"
      />
      {isEdit && !isEditingAvatar && (
        <Button
          className={[styles.modPFPButton, styles.blueButton].join(' ')}
          onClick={() => showBrowserForAvatar()}
        >
          MOD PFP
        </Button>
      )}
      {isEdit && isEditingAvatar && (
        <Button
          className={[styles.modPFPButtonSave, styles.blueButton].join(' ')}
          onClick={() => saveModAvatar()}
        >
          SAVE
        </Button>
      )}
      {isEdit && isEditingAvatar && (
        <Button
          className={[styles.modPFPButtonCancel, styles.blueButton].join(' ')}
          onClick={() => cancelModAvatar()}
        >
          CANCEL
        </Button>
      )}
      <img className={styles.claimUsername} src="/images/designer-page/claim-username.png" />

      <div className={[styles.designerName, isEdit ? styles.editing : ''].join(' ')}>
        {designerInfo['designerId'].toUpperCase()}
        <img className={styles.arrowImg} src="/images/designer-page/arrow.png" />
      </div>

      {!isEdit && (
        <Link href="/getdressed">
          <div className={styles.getDressedBadge}>
            <div className={styles.textWrapper}>
              Get A Bespoke Metaverse Outfit Designed By {designerInfo['designerId']}
            </div>
          </div>
        </Link>
      )}
      {isEdit && (
        <Button className={[styles.modNameButton, styles.blueButton].join(' ')}>MOD</Button>
      )}

      {!isEdit && (
        <div className={styles.socialIcons}>
          {designerInfo['twitter'] && designerInfo['twitter'] !== '' && (
            <a
              href={
                designerInfo['twitter'].includes('https')
                  ? designerInfo['twitter']
                  : `https://${designerInfo['twitter']}`
              }
              target="_blank"
            >
              <img src="/images/social-button-circle/twitter.png" />
            </a>
          )}
          {designerInfo['instagram'] && designerInfo['instagram'] !== '' && (
            <a
              href={
                designerInfo['instagram'].includes('https')
                  ? designerInfo['instagram']
                  : `https://${designerInfo['instagram']}`
              }
              target="_blank"
            >
              <img src="/images/social-button-circle/instagram.png" />
            </a>
          )}
          {designerInfo['linkedin'] && designerInfo['linkedin'] !== '' && (
            <a
              href={
                designerInfo['linkedin'].includes('https')
                  ? designerInfo['linkedin']
                  : `https://${designerInfo['linkedin']}`
              }
              target="_blank"
            >
              <img src="/images/social-button-circle/linkedin.png" />
            </a>
          )}
          {designerInfo['tiktok'] && designerInfo['tiktok'] !== '' && (
            <a
              href={
                designerInfo['tiktok'].includes('https')
                  ? designerInfo['tiktok']
                  : `https://${designerInfo['tiktok']}`
              }
              target="_blank"
            >
              <img src="/images/social-button-circle/tiktok.png" />
            </a>
          )}
          {designerInfo['youtube'] && designerInfo['youtube'] !== '' && (
            <a
              href={
                designerInfo['youtube'].includes('https')
                  ? designerInfo['youtube']
                  : `https://${designerInfo['youtube']}`
              }
              target="_blank"
            >
              <img src="/images/social-button-circle/youtube.png" />
            </a>
          )}
          {designerInfo['ThreadMirror'] && designerInfo['ThreadMirror'] !== '' && (
            <a
              href={
                designerInfo['ThreadMirror'].includes('https')
                  ? designerInfo['ThreadMirror']
                  : `https://${designerInfo['ThreadMirror']}`
              }
              target="_blank"
            >
              <img src="/images/social-button-circle/mirror.png" />
            </a>
          )}
        </div>
      )}

      {isEdit && (
        <div className={styles.inputSocialIcons}>
          <div className={styles.inputRow}>
            <img src="/images/social-button-circle/twitter.png" />
            <input
              type="text"
              value={twitterDraft}
              onChange={(e) => setTwitterDraft(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <img src="/images/social-button-circle/instagram.png" />
            <input
              type="text"
              value={instagramDraft}
              onChange={(e) => setInstagramDraft(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <img src="/images/social-button-circle/tiktok.png" />
            <input
              type="text"
              value={tiktokDraft}
              onChange={(e) => setTiktokDraft(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <img src="/images/social-button-circle/youtube.png" />
            <input
              type="text"
              value={youtubeDraft}
              onChange={(e) => setYoutubeDraft(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <img src="/images/social-button-circle/linkedin.png" />
            <input
              type="text"
              value={linkedinDraft}
              onChange={(e) => setLinkedinDraft(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <img src="/images/social-button-circle/mirror.png" />
            <input
              type="text"
              value={mirrorDraft}
              onChange={(e) => setMirrorDraft(e.target.value)}
            />
          </div>
          <Button
            className={[styles.modSocialSave, styles.blueButton].join(' ')}
            onClick={() => saveSocialLinks()}
          >
            SAVE
          </Button>
        </div>
      )}

      {!isEditingDescription && (
        <div className={[styles.designerDescription, isEdit ? styles.editing : ''].join(' ')}>
          {designerInfo['description'].substring(0, MAX_DESCRIPTION_LENGTH)}
        </div>
      )}
      {isEdit && isEditingDescription && (
        <textarea
          className={styles.editDescription}
          onChange={onChangeDescription}
          value={descriptionDraft}
        />
      )}
      {isEdit && !isEditingDescription && (
        <Button
          className={[styles.modDescriptionButton, styles.blueButton].join(' ')}
          onClick={() => showEditDescription()}
        >
          MOD
        </Button>
      )}
      {isEdit && isEditingDescription && (
        <Button
          className={[styles.modDescriptionButtonSave, styles.blueButton].join(' ')}
          onClick={() => saveModDescription()}
        >
          SAVE
        </Button>
      )}
      {isEdit && isEditingDescription && (
        <Button
          className={[styles.modDescriptionButtonCancel, styles.blueButton].join(' ')}
          onClick={() => cancelModDescription()}
        >
          CANCEL
        </Button>
      )}

      {!isEdit && (
        <div className={styles.patternSection}>
          <div
            className={[
              styles.patternWrapper3,
              materialList.length <= 5 ? styles.smallPattern : '',
            ].join(' ')}
          >
            {materialList.slice(0, 6).map((item, index) => {
              return (
                <PatternCircle
                  key={index}
                  item={item}
                  index={index}
                  direction={index === 2 ? 'Left' : 'Right'}
                />
              );
            })}
          </div>

          <div className={styles.patternWrapper4}>
            {materialList.slice(7, materialList.length).map((item, index) => {
              return (
                <PatternCircle
                  key={index}
                  item={item}
                  index={index}
                  secondPart
                  direction={index % 3 === 2 ? 'Left' : 'Right'}
                />
                // <div className={styles.patternCircle} >
                //   <img
                //     src={item.thumbnail ? item.thumbnail : item.image}
                //     key={index}
                //     style={{
                //       marginTop: `${index % 3 === 1 ? -10 : 0}vw`
                //     }}
                //   />
                //   {/* <Paper
                //     className={'circlemenu_imgViewer fadeOut' + direction}
                //     elevation={3}
                //     ref={imgViewer}
                //     onMouseLeave={(e) => hleave(2, e)}
                //   >
                //     <div className='circlemenu_curImage' ref={curImage}>
                //       <div className='circlemenu_imgTitle' ref={title} />
                //       <div className='circlemenu_imgDescription' ref={description} />
                //     </div>
                //   </Paper> */}
                // </div>
              );
            })}
          </div>

          <div className={styles.patternWrapper}>
            <div className={styles.selectionGroup}>
              <img src="/images/designer-page/pattern-selection.png" />
              <img src="/images/designer-page/pattern-selection.png" />
              <img src="/images/designer-page/pattern-selection.png" />
              <img src="/images/designer-page/pattern-selection.png" />
              <img src="/images/designer-page/pattern-selection.png" />
            </div>
            <div className={styles.gamePad}>
              <img src="/images/designer-page/gamepad.png" />
            </div>
          </div>
        </div>
      )}

      <div className={styles.ownershipText}>Fractional Garment Ownership.</div>
      {isEdit && (
        <Button
          className={[styles.addMoreButton, styles.blueButton].join(' ')}
          onClick={() => addMore()}
        >
          ADD MORE TO FGO
        </Button>
      )}

      {!isEdit && marketplaceItems.length > 0 && (
        <div className={styles.marketplaceSection}>
          <h1>On-Chain Fashion</h1>

          <div className={styles.marketplaceItems}>
            {marketplaceItems.map((item, index) => (
              <CollectionCard
                item={item}
                key={item.animation && item.animation != '' ? item.animation : item.image}
              />
            ))}
          </div>
        </div>
      )}

      <div className={styles.patternWrapper2}>
        <img className={styles.patternSample1} src="/images/designer-page/pattern_sample1.png" />
        <img className={styles.patternSample2} src="/images/designer-page/pattern_sample2.png" />
        <img className={styles.patternSample3} src="/images/designer-page/pattern_sample3.png" />
      </div>

      {isEdit && (
        <div className={styles.submitFormWrapper}>
          <h1>On-Chain Fashion</h1>
          <OnChainFashionSubmitForm designerId={designerInfo['designerId']} />
        </div>
      )}
    </div>
  );
};

export default DesignerProfileTopPart;
