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

const abi = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"string","name":"_name","internalType":"string"},{"type":"string","name":"_symbol","internalType":"string"},{"type":"address","name":"_accessControls","internalType":"contract DigitalaxAccessControls"},{"type":"address","name":"_childChain","internalType":"address"},{"type":"address","name":"_trustedForwarder","internalType":"address"}]},{"type":"event","name":"ApprovalForAll","inputs":[{"type":"address","name":"account","internalType":"address","indexed":true},{"type":"address","name":"operator","internalType":"address","indexed":true},{"type":"bool","name":"approved","internalType":"bool","indexed":false}],"anonymous":false},{"type":"event","name":"ChildCreated","inputs":[{"type":"uint256","name":"childId","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"ChildrenCreated","inputs":[{"type":"uint256[]","name":"childIds","internalType":"uint256[]","indexed":false}],"anonymous":false},{"type":"event","name":"DigitalaxMaterialsDeployed","inputs":[],"anonymous":false},{"type":"event","name":"TransferBatch","inputs":[{"type":"address","name":"operator","internalType":"address","indexed":true},{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256[]","name":"ids","internalType":"uint256[]","indexed":false},{"type":"uint256[]","name":"values","internalType":"uint256[]","indexed":false}],"anonymous":false},{"type":"event","name":"TransferSingle","inputs":[{"type":"address","name":"operator","internalType":"address","indexed":true},{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"id","internalType":"uint256","indexed":false},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"URI","inputs":[{"type":"string","name":"value","internalType":"string","indexed":false},{"type":"uint256","name":"id","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract DigitalaxAccessControls"}],"name":"accessControls","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"id","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"balanceOfBatch","inputs":[{"type":"address[]","name":"accounts","internalType":"address[]"},{"type":"uint256[]","name":"ids","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"tokenIds","internalType":"uint256[]"}],"name":"batchCreateChildren","inputs":[{"type":"string[]","name":"_uris","internalType":"string[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"batchMintChildren","inputs":[{"type":"uint256[]","name":"_childTokenIds","internalType":"uint256[]"},{"type":"uint256[]","name":"_amounts","internalType":"uint256[]"},{"type":"address","name":"_beneficiary","internalType":"address"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"burn","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"id","internalType":"uint256"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"burnBatch","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256[]","name":"ids","internalType":"uint256[]"},{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"childChain","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"id","internalType":"uint256"}],"name":"createChild","inputs":[{"type":"string","name":"_uri","internalType":"string"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"address","name":"user","internalType":"address"},{"type":"bytes","name":"depositData","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"garmentNFTApproved","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isApprovedForAll","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"address","name":"operator","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isTrustedForwarder","inputs":[{"type":"address","name":"forwarder","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"mintChild","inputs":[{"type":"uint256","name":"_childTokenId","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"},{"type":"address","name":"_beneficiary","internalType":"address"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeBatchTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256[]","name":"ids","internalType":"uint256[]"},{"type":"uint256[]","name":"amounts","internalType":"uint256[]"},{"type":"bytes","name":"data","internalType":"bytes"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"id","internalType":"uint256"},{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"bytes","name":"data","internalType":"bytes"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setApprovalForAll","inputs":[{"type":"address","name":"operator","internalType":"address"},{"type":"bool","name":"approved","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGarmentNFTApproved","inputs":[{"type":"address","name":"_garmentNFT","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTrustedForwarder","inputs":[{"type":"address","name":"_trustedForwarder","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"supportsInterface","inputs":[{"type":"bytes4","name":"interfaceId","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokenIdPointer","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokenTotalSupply","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"trustedForwarder","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateAccessControls","inputs":[{"type":"address","name":"_accessControls","internalType":"contract DigitalaxAccessControls"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"uri","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"versionRecipient","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawBatch","inputs":[{"type":"uint256[]","name":"ids","internalType":"uint256[]"},{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawSingle","inputs":[{"type":"uint256","name":"id","internalType":"uint256"},{"type":"uint256","name":"amount","internalType":"uint256"}]}];
const address = '0x632914B69B11DCa3b391B62FB2812f5Eee36A626';

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
  const [degree, setDegree] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    wallet.connect();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleContributeClick = async () => {
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

      let response = await contract.methods.createChild(url).send({ from: account });
      console.log('===createChild response: ', response);
      const tokenId = response.events.URI.returnValues.id;

      response = await contract.methods.mintChild(tokenId, 1, account, "0x00").send({ from: account });

      console.log('===mintChild response: ', response);
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
              <Input label="Degree of Exclusivity" value={degree} onChange={(e) => setDegree(e.target.value)} />
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
              <InputBase value={description} onChange={(e) => setDescription(e.target.value)} className="text-black border-1 border-third bg-white" rows={5} multiline></InputBase>
            </div>
          </div>

          <button onClick={handleContributeClick} className="font-black text-base font-inter p-2 px-4 bg-fourth rounded-xl mt-12 max-w-min" style={{ color: "#DB00FF" }}>
            Contribute
          </button>
          <div>
          { status === 1 && <h2 style={{ color: 'white' }}>Loading</h2> }
          { status === 2 && <h2 style={{ color: 'green' }}>Success</h2> }
          { status === 3 && <h2 style={{ color: 'red' }}>Failed</h2> }
          </div>
        </div>
      </div>

    </div>
  );
}

export default Minting;
