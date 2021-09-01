import React from 'react'
import cn from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'
import copy from 'copy-to-clipboard'
import { toast } from 'react-toastify'
import NFTProduct from '@components/nft-product'
import Button from '@components/buttons/button'
import Loader from '@components/loader'
import { getUser, getAccount } from '@selectors/user.selectors'
import { useNFTs } from '@hooks/espa/user.hooks'
import accountActions from '@actions/user.actions'
import styles from './styles.module.scss'

const Profile = ({ history }) => {
  const user = useSelector(getUser)
  const dispatch = useDispatch()
  if (!user) {
    dispatch(accountActions.checkStorageAuth())
  }
  const account = useSelector(getAccount)
  console.log('account: ', account)
  const nfts = useNFTs(account)
  const getGameTags = (str) => {
    if (!str) {
      return ''
    }
    let tags = str.replace(', ', ',').split(',')
    tags.sort()
    return tags.reduce((total, cur) => {
      let capitalize = cur.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
      return `${total}#${capitalize} `
    }, '')
  }

  if (!user || !nfts) {
    return <Loader size='large' white className={styles.loader} />
  }

  const onCopyWalletAddress = () => {
    copy(account)
    toast('Wallet Address is copied to the clipboard')
  }

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.leftSideWrapper}>
        <div className={styles.avatarIDSection}>
          <img src={user.get('avatar') ? user.get('avatar') : '../../../images/user-photo.svg'} />
          <span className='text-white'>{user.get('username')}</span>
        </div>
        <span className={styles.email}>{user.get('email')}</span>
        <div className={styles.inputItemwrapper}>
          <span>Changing Room</span>
          <p className='text-white'>{nfts.length}</p>
        </div>
        <div className={styles.inputItemwrapper}>
          <span>Game Tags</span>
          <p>{getGameTags(user.get('gameTags'))}</p>
        </div>
        <div className={styles.inputItemwrapper}>
          <span>Whitelisted IP address</span>
          <p className='text-white'>{user.get('ipAddrs')}</p>
        </div>
        <div className={styles.walletAddress}>
          <span>Connected Wallet Address</span>
          <p className='text-white'>
            {account}
            <img src='/images/clipboard.svg' onClick={onCopyWalletAddress} />
          </p>
        </div>
        <Button
          className={styles.modalButton}
          background='black'
          onClick={() => Router.push('/profile/edit')}
        >
          Edit Profile
        </Button>
      </div>
      <div className={styles.rightSideWrapper}>
        <p className={styles.titleWrapper}>CHANGING ROOM</p>
        <div className={styles.divider} />
        <ul className={cn(styles.list, 'animate__animated animate__fadeIn')}>
          {nfts.map((nft) => (
            <NFTProduct key={`nft_${nft.id}`} nft={nft} nftId={parseInt(nft.id)} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Profile
