import { STAGE_ESPA_BACKEND_URL, USERNAME_ERROR } from '@constants/global.constants'
import { get, post, put } from '@utils/api'
import axios from 'axios'

class EspaApiService {
  constructor() {
    this.url = STAGE_ESPA_BACKEND_URL
  }

  setUrl(url) {
    this.url = url
  }

  async handleSignUp(account, userName, email, ip) {
    try {
      const message = await post('/register', {
        wallet: account,
        username: userName,
        email,
        ipAddrs: ip,
      })
      return message
    } catch (e) {
      return null
    }
  }

  async fetchAuthToken(account) {
    try {
      const data = await post('/account-exists', {
        wallet: account,
      })
      if (data === 0) {
        return ''
      }
      return data
    } catch (e) {
      return ''
    }
  }

  async handleAuthentication(account, signMsg, signature) {
    try {
      const data = await post('/authenticate', {
        wallet: account,
        randomString: signMsg,
        signature,
      })
      return data
    } catch (e) {
      return null
    }
  }

  async checkUserName(username) {
    try {
      const isExist = await get('/username-available', {
        username,
      })
      return isExist | 0
    } catch (e) {
      return USERNAME_ERROR
    }
  }

  async fetchNfts(account) {
    try {
      const ntfs = await get('/get-nfts', {
        wallet: account,
      })
      return ntfs
    } catch (e) {
      return []
    }
  }

  async getProfile() {
    try {
      const user = await get('/profile')
      return user
    } catch (e) {
      return null
    }
  }

  async updateProfile(user) {
    try {
      const data = await put('/profile', user)
      return data
    } catch (e) {
      return null
    }
  }

  async getPresignedUrl() {
    try {
      const data = await get('/presigned-url')
      return data
    } catch (e) {
      return null
    }
  }
  
  async getPresignedGeneralUrl(contentType, fileName) {
    try {
      const data = await get('/presigned-general-url', {
        contentType,
        fileName
      })
      return data
    } catch (e) {
      return null
    }
  }

  async getPresignedVideoUrl() {
    try {
      const data = await get('/presigned-video-url')
      return data
    } catch (e) {
      return null
    }
  }

  async uploadImageToS3(url, file) {
    try {
      await axios.put(url, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return true
    } catch (e) {
      return false
    }
  }
  
  async getMyIP() {
    try {
      const url = 'https://api.ipify.org/?format=json'
      const { data } = await axios.get(url)
      return data.ip
    } catch (e) {
      return ''
    }
  }

  async checkProfanity(username) {
    try {
      const url = `https://www.purgomalum.com/service/containsprofanity?text=${username}`
      const { data } = await axios.get(url)
      return data
    } catch (e) {
      return true
    }
  }

  async getThumbnailsByDesigner(designerId) {
    try {
      const thumbnails = await get('/get-thumbnails-by-designer', { designerId })
      return thumbnails
    } catch (e) {
      return null
    }
  }

  async getAllThumbnails() {
    try {
      const thumbnails = await get('/get-all-thumbnails')
      return thumbnails
    } catch (e) {
      return null
    }
  }

  async getAllDesigners() {
    try {
      const designers = await get('/get-all-designers')
      return designers ? designers.data : []
    } catch (e) {
      return null
    }
  }

  async getDesignerByWallet(wallet) {
    try {
      const designers = await get('/get-designer-by-wallet', { wallet })
      return designers
    } catch (e) {
      return null
    }
  }

  async getDesignerById(designerId) {
    try {
      const designers = await get('/get-designer-by-id', { designerId })
      return designers
    } catch (e) {
      return null
    }
  }

  async saveDressedInfo({
    wallet,
    outfit,
    outfitPattern,
    description,
    outfitVersion,
    outfitPosition,
    outfitRender,
    outfitCharacter,
    outfitNetwork,
    outfitStake,
    outfitPeriod,
    lookText,
    designers,
    file1,
    file2,
    file3,
    amount
  }) {
    try {
      const res = await post('/dressed-info', {
        wallet,
        outfit,
        outfitPattern,
        description,
        outfitVersion,
        outfitPosition,
        outfitRender,
        outfitCharacter,
        outfitNetwork,
        outfitStake,
        outfitPeriod,
        lookText,
        designers,
        file1,
        file2,
        file3,
        amount
      })
      return res
    } catch (e) {
      throw e
    }
  }

  async registerDesigner({
    wallet,
    randomString, 
    designerId,
    description,
    external_url,
    image_url,
    newDesignerID,
    twitter,
    instagram,
    linkedin,
    tiktok,
    youtube,
    web3FashionItems
  }) {
    try {
      const message = await post('/register-designer', {
        wallet,
        randomString,
        designerId,
        description,
        external_url,
        image_url,
        newDesignerID,
        twitter,
        instagram,
        linkedin,
        tiktok,
        youtube,
        web3FashionItems
      })
      return message
    } catch (e) {
      return null
    }
  }
  
  async registerOnChainFashionItem({
    wallet,
    randomString, 
    designerId,
    itemName,
    description,
    rarity,
    editionNo,
    price,
    type,
    sourceFile,
    renderFiles,
    attachFGO
  }) {
    try {
      const message = await post('/register-on-chain-fashion-item', {
        wallet,
        randomString,
        designerId,
        itemName,
        description,
        rarity,
        editionNo,
        price,
        type,
        sourceFile,
        renderFiles,
        attachFGO
      })
      return message
    } catch (e) {
      return null
    }
  }
}

export default new EspaApiService()
