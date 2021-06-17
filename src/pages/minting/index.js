import React, { useState, useEffect } from "react";
import Input from '../../components/Input';
import Icon from '@material-ui/core/Icon';
import Popper from '@material-ui/core/Popper';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import Fade from '@material-ui/core/Fade';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { upload as UploadToPinata } from '../../utils/pinata';

import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { useWallet } from 'use-wallet'

const abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"garmentTokenId","type":"uint256"}],"name":"GarmentCreated","type":"event"},{"inputs":[],"name":"accessControls","outputs":[{"internalType":"contract DigitalaxAccessControls","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_uri","type":"string"}],"name":"createNewChild","outputs":[{"internalType":"uint256","name":"childTokenId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_childTokenUri","type":"string"},{"internalType":"uint256","name":"_childTokenAmount","type":"uint256"}],"name":"createNewChildWithVerifiedRole","outputs":[{"internalType":"uint256","name":"childTokenId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"_uris","type":"string[]"}],"name":"createNewChildren","outputs":[{"internalType":"uint256[]","name":"childTokenIds","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_garmentTokenUri","type":"string"},{"internalType":"address","name":"_designer","type":"address"},{"internalType":"string[]","name":"_childTokenUris","type":"string[]"},{"internalType":"uint256[]","name":"_childTokenAmounts","type":"uint256[]"},{"internalType":"address","name":"_beneficiary","type":"address"}],"name":"createNewChildrenWithBalanceAndGarment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"_childTokenUris","type":"string[]"},{"internalType":"uint256[]","name":"_childTokenAmounts","type":"uint256[]"},{"internalType":"address","name":"_beneficiary","type":"address"}],"name":"createNewChildrenWithBalances","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"_childTokenUris","type":"string[]"},{"internalType":"uint256[]","name":"_childTokenAmounts","type":"uint256[]"}],"name":"createNewChildrenWithVerifiedRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"garmentToken","outputs":[{"internalType":"contract DigitalaxGarmentNFT","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract DigitalaxGarmentNFT","name":"_garmentToken","type":"address"},{"internalType":"contract DigitalaxMaterials","name":"_materials","type":"address"},{"internalType":"contract DigitalaxAccessControls","name":"_accessControls","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"materials","outputs":[{"internalType":"contract DigitalaxMaterials","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"garmentTokenUri","type":"string"},{"internalType":"address","name":"designer","type":"address"},{"internalType":"uint256[]","name":"childTokenIds","type":"uint256[]"},{"internalType":"uint256[]","name":"childTokenAmounts","type":"uint256[]"},{"internalType":"address","name":"beneficiary","type":"address"}],"name":"mintParentWithChildren","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"garmentTokenUri","type":"string"},{"internalType":"address","name":"designer","type":"address"},{"internalType":"address","name":"beneficiary","type":"address"}],"name":"mintParentWithoutChildren","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const address = '0xED1cACcB23e4eC422ca56Ba4FB0fEA14822337fd';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

function Minting(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');

  const wallet = useWallet();
  const { library, account } = useWeb3React();

  const [status, setStatus] = useState(0);

  const [designerId, setDesignerId] = useState('');
  const [issueNo, setIssueNo] = useState('');
  const [pattern, setPattern] = useState('');
  const [traits, setTraits] = useState('');
  const [degree, setDegree] = useState('Common');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    wallet.connect();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleContributeClick = async () => {
    if (designerId === '' || issueNo === '' || pattern === '' || traits === '' || !file || description === '') {
      setStatus(-1);
      return;
    }
    setStatus(1);
    try {
      const metaJson = {
        "Designer ID": designerId,
        "description": description,
        "external_url": "http://designers.digitalax.xyz/",
        "attributes": [
          {
            "trait_type": "Pattern, Material, Texture Name",
            "value": pattern
          },
          {
            "trait_type": "Issue No.",
            "value": issueNo
          },
          {
            "trait_type": "Unique Traits",
            "value": traits
          },
          {
            "trait_type": "Degree of Exclusivity",
            "value": degree
          }
        ]
      }

      const url = await UploadToPinata(file, metaJson);
      if (!url) {
        return;
      }

      const web3 = new Web3(library);
      const contract = new web3.eth.Contract(abi, address);

      let response = await contract.methods.createNewChildWithVerifiedRole(url, 1).send({ from: account });

      console.log('===createChild response: ', response);
      setStatus(2);
    } catch (error) {
      console.log('===error: ', error);
      setStatus(3);
    }
  }

  const handleHover = (text) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
    setText(text);
  };
  return (
    <div className="flex flex-col pt-20 pb-16 mb-10 ml-16 pl-2" style={{ backgroundImage: "url('/images/minting_bg.png')", backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}>
      <Popper open={open} anchorEl={anchorEl} placement="right" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <span>{text}</span>
          </Fade>
        )}
      </Popper>
      <div className="bg-black pl-16 pr-24 pb-16" style={{ width: "73.5%" }}>
        <div className="mt-10">
          <p className="font-inter font-black whitespace-normal text-gradient" style={{ fontSize: "86px" }}>Contribute to Open</p>
          <p className="font-inter font-black whitespace-normal text-gradient" style={{ fontSize: "86px" }}>Source On-Chain</p>
          <p className="font-inter font-black whitespace-normal text-gradient" style={{ fontSize: "86px" }}>Libraries</p>
        </div>

        <div>
          <p className="font-inter font-normal text-base text-gray-50 mt-10">
            Enter the information in the fillout boxes below to mint your 1155 NFT and contribute to our open sourced material, pattern, texture on-chain libraries. Your contribution can be used in master garments by other designers, artists, creators— it is open sourced. Open source doesn’t mean without monetisation. Our infrastructure is being built to eventually support automated fractional royalties for any designer as they contribute to open source libraries that can be leveraged in both the digital and physical dimensions. A decentralised commercial model.
          </p>
          <p className="font-inter font-normal text-base text-gray-50 mt-8">
            Although we can’t automatically enforce in smart contract code this fractional cross-chain, cross-realm royalty distribution as of yet, we still are continuing to prove out the model and hope that those that use these open source prints contribute a fractional portion of the sales back to the DIGITALAX, as we have done and plan to do for anyone contributing to our on-chain libraries going forward. Your NFT is minted on Matic Network for 99% more energy efficiency than the Ethereum or Bitcoin blockchains. Through our MultiToken bridge these NFTs can be bridged back to Ethereum for additional interoperability and functionalities.
          </p>
        </div>

        <div className='flex flex-col w-1/2 mt-12 mb-20'>
          <div className="flex justify-center">
            <div className="w-1/2 flex flex-col mr-10">
              <Input label="Designer ID" required="true" description="Creator Name or pseudonym." value={designerId} onChange={(e) => setDesignerId(e.target.value)} />
              <Input label="Pattern, Material, Texture" value={pattern} onChange={(e) => setPattern(e.target.value)} />
              <Input disabled label="Degree of Exclusivity" value={degree} onChange={(e) => setDegree(e.target.value)} />
            </div>
            <div className="w-1/2 flex flex-col">
              <Input value={issueNo} onChange={(e) => setIssueNo(e.target.value)} label="Issue No." required="true" description="Provide an issue number for your own cataloging & on-chain sorting as you grow your contributions overtime. " />
              <Input value={traits} onChange={(e) => setTraits(e.target.value)} label="Unique Traits" required="true" description="Anything else that you want minted on chain with the contribution. Separate by commas." />
              <div className="flex flex-col mt-10 w-full">
                <div className="flex">
                  <span className="font-inter font-extrabold text-gray-50 text-sm mb-2">File Upload</span>
                  <LightTooltip title="Files accepted; PNG, ERX, TIFF, GIF, MP4, MOV, AVI" placement="right">
                    <span className="questionMark">?</span>
                  </LightTooltip>
                </div>
                <label for="file" className="border-2 border-third bg-white rounded-2xl py-1 px-6 max-w-max font-inter text-xs font-medium">Choose File</label>
                <InputBase type="file" id="file" className="border-1 w-180 border-third bg-white h-9 w-2/3 hidden" style={{ display: "none" }} onChange={handleFileChange} />
                <span className="font-medium font-inter text-xxs mx-16 mt-2 whitespace-nowrap" style={{ color: "#868686" }}>
                  { file ? file.name : 'No file Chosen' }
                </span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-col mt-16">
              <span className="font-inter font-extrabold text-gray-50 text-sm mb-2">Description</span>
              <InputBase
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-black border-1 border-third bg-white"
                rows={5}
                multiline
              />
            </div>
          </div>

          <button onClick={handleContributeClick} className="font-black text-base font-inter p-2 px-4 bg-fourth rounded-xl mt-12 max-w-min" style={{ color: "#DB00FF" }}>
            Contribute
          </button>
          <div>
          { status === -1 && <h2 style={{ color: 'red' }}>Please fill all fields</h2> }
          { status === 1 && <h2 style={{ color: 'white' }}>Processing</h2> }
          { status === 2 && <h2 style={{ color: 'green' }}>Success</h2> }
          { status === 3 && <h2 style={{ color: 'red' }}>Failed</h2> }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Minting;
