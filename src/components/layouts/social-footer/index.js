import React from 'react'
import styles from './styles.module.scss'

const SocialFooter = () => {
  return (
    <div className={styles.socialBar}>
      Follow the Web3 Fashion Anarchists and Join the Network. 
      <div className={styles.socialIcons}>
        <a href='https://twitter.com/web3fashion' target='_blank'>
          <img src='/images/social-button-circle/twitter.png' />
        </a>
        <a href='https://www.instagram.com/global_designer_network/' target='_blank'>
          <img src='/images/social-button-circle/instagram.png' />
        </a>
        <a href='https://www.linkedin.com/company/global-designer-network/' target='_blank'>
          <img src='/images/social-button-circle/linkedin.png' />
        </a>
        <a href='https://www.tiktok.com/@globaldesignernetwork' target='_blank'>
          <img src='/images/social-button-circle/tiktok.png' />
        </a>
        <a href='https://www.youtube.com/channel/UCUoUOJ-t6lb2mKqqoefrrnA' target='_blank'>
          <img src='/images/social-button-circle/youtube.png' />
        </a>
        <a href='https://mirror.xyz/0x95Fa3122c4672717EB768E9F49E40DC4478c4258' target='_blank'>
          <img src='/images/social-button-circle/mirror.png' />
        </a>
        <a href='https://discord.gg/rzFbc9ZmAg' target='_blank'>
          <img src='/images/social-button-circle/discord.png' />
        </a>
      </div>            
    </div>
  )
}

export default SocialFooter