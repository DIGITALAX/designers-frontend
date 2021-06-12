import axios from 'axios';

const pinataOptions = {
    'pinata_api_key': '35e372d845e4a940dcdf',
    'pinata_secret_api_key': 'c15072fa076ce962950ed4878c61b83c67e7e8af3ae4d9dd8d2f81e6b204fb0a'
};

export const upload = async (file, metaJson) => {
    try {
        const cloudURL = 'https://digitalax.mypinata.cloud';
        // const cloudURL = 'https://gateway.pinata.cloud';

        let formData = new FormData();
        formData.append("file", file);

        const image = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...pinataOptions
            }
        });

        const result = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
            pinataMetadata: {
                name: 'metadata.json'
            },
            pinataContent: {
                ...metaJson,
                image_url: `${cloudURL}/ipfs/${image.data.IpfsHash}`
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                ...pinataOptions
            }
        });

        return `${cloudURL}/ipfs/${result.data.IpfsHash}`;
    } catch(error) {
        console.log('error --> ', error);
        return null;
    }
};