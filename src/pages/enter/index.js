import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../components/modal/popup';

// import { getUser } from '@selectors/user.selectors';
// import accountActions from '@actions/user.actions';

import { useWallet } from 'use-wallet'
import { useWeb3React } from '@web3-react/core';

function Home(props) {

  // const dispatch = useDispatch();
  // const user = useSelector(getUser);
  // if (!user) {
  //   dispatch(accountActions.checkStorageAuth());
  // }

  const wallet = useWallet();
  const { chainId } = useWeb3React();

  const [comingModalOpen, setComingModalOpen] = useState(false);
  const [switchModalOpen, setSwitchModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    wallet.connect();
  }, []);

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onContribute = () => {
    // if (!user) {
    //   setOpen(true);
    //   return;
    // }
    if (chainId === 137) {
      window.location.href = "/minting";
      return;
    }
    setSwitchModalOpen(true);
  }

  return (
    <div className="flex flex-col">
      <div className="relative" style={{ height: "976px" }} id="parentCo">
        <img src="/images/banner.png" alt="banner" className="absolute w-full h-full" />
        <img src="/images/open.svg" alt="open" className="absolute t-20 l-0 " style={{ width: "948px" }} />
      </div>
      <div>
        <p className="font-inter text-3xl text-white w-1204 mx-auto text-center mt-12">
          It’s often the case that we have to conform to a framework set by gatekeepers in our society. These gatekeepers have been around in every society since the dawn of agriculture. It’s something that so many of us simply must accept with no plausible alternative. Our current centralised economies incentivise an all out war for whoever can control the chokepoints for value exchange — because the model is extractive at its root.
        </p>
        <p className="font-inter text-3xl text-white w-1204 mx-auto text-center mt-12">
          DIGITALAX is operating for a decentralised commercial environment where all players and creators have the ability to spin up a personal decentralised realm with dynamic access keys. We are growing out our ecosystem to continue to include more savvy doorways and access channels for more players and creators to leverage off of.
        </p>
      </div>
      <div className="mx-24 mt-10 pt-9 pb-16 pl-20 pr-12" style={{ background: "url('/images/background.png') no-repeat", backgroundSize: "100% 100%" }}>
        <div className="flex justify-between w-full">
          <div className="relative" style={{ width: "47%" }}>
            <img src="/images/product1.png" className="w-full" />
            <img src="/images/arrow.svg" className="cursor-pointer z-50 w-48 absolute t-9 r-8 animate-horizonbounce" onClick={onContribute} />
          </div>
          <div className="relative" style={{ width: "48%"  }}>
            <img src="/images/product2.png" className="w-full" />
            <a href="/global">
              <img src="/images/arrow.svg" className="cursor-pointer z-50 w-48 absolute b-8 r-8 animate-horizonbounce" />
            </a>
          </div>
        </div>

        <div className="flex justify-between w-full mt-12">
          <div className="relative" style={{ width: "47%" }}>
            <img src="/images/product3.png" className="w-full" />
            <img src="/images/arrow.svg" className="cursor-pointer z-50 w-48 absolute t-9 r-8 animate-horizonbounce" onClick={() => setComingModalOpen(true)} />
          </div>
          <div className="relative" style={{ width: "48%"  }}>
            <img src="/images/product4.png" className="w-full" />
            <a href="/fractional" >
              <img src="/images/arrow.svg" className="cursor-pointer z-50 w-48 absolute b-8 r-8 animate-horizonbounce" />
            </a>
          </div>
        </div>
      </div>

      <Modal open={comingModalOpen} handleClose={() => setComingModalOpen(false)}>
        <p className="text-gray-50 font-normal text-base font-inter text-center">
          Coming Soon!
        </p>
      </Modal>

      <Modal open={switchModalOpen} handleClose={() => setSwitchModalOpen(false)}>
        <p className="text-gray-50 font-normal text-base font-inter text-center">
          Please switch network to Matic on metamask
        </p>
      </Modal>

      <Modal open={open} handleClose={handleClose}>
        <p className="text-gray-50 font-normal text-base font-inter text-center">
        <p className="text-gray-50 font-normal text-base font-inter text-center">
          Hey! Please make sure to SIGN IN to contribute!
        </p>
        <p className="text-gray-50 font-extrabold text-base font-inter text-center mt-6">
          We are currently in BETA and whitelisting designers!
        </p>
        <p className="text-gray-50 font-normal text-base font-inter text-center mt-6">
          If you would like to join the Global Designer Network and contribute to our on-chain open source libraries through Fractional Garment Ownership then please join our discord or telegram and reach out!
        </p>
        <p className="text-gray-50 font-extrabold text-base font-inter text-center mt-6">
          Join us on our mission as we storm the gates of the metaverse and enable the gatemakers for web3 fashion and beyond!
        </p>
        </p>
      </Modal>
    </div>
  );
}

export default Home;
