import axios from 'axios'

const pinataOptions = {
  'pinata_api_key': '0d2ee8348c1e9452499d',
  'pinata_secret_api_key': '3972307ed1683a4ce45ad2d3a4978ad3c71c8a41f5b4fe552b1e4f61f827ec3d'
}

export const upload = async (metaJson, renderFile, sourceFile = null) => {
  try {
    const cloudURL = 'https://digitalax.mypinata.cloud'
    // const cloudURL = 'https://gateway.pinata.cloud'

    let formData = new FormData()
    formData.append("file", renderFile)

    const image = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...pinataOptions
      }
    })
    
    let sourceImage = null

    if (sourceFile) {
      let sourceFormData = new FormData()
      sourceFormData.append("file", sourceFile)

      sourceImage = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', sourceFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...pinataOptions
        }
      })
    }
    
    const result = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      pinataMetadata: {
        name: 'metadata.json'
      },
      pinataContent: {
        ...metaJson,
        image_url: `${cloudURL}/ipfs/${image.data.IpfsHash}`,
        source_url: (sourceFile && sourceImage) ? `${cloudURL}/ipfs/${sourceImage.data.IpfsHash}` : null
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        ...pinataOptions
      }
    })

    return `${cloudURL}/ipfs/${result.data.IpfsHash}`
  } catch(error) {
    console.log('error --> ', error)
    return null
  }
}