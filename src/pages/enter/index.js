import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import Modal from '../../components/modal/popup'

import { getAccount, getUser } from '@selectors/user.selectors'
import { getChainId } from '@selectors/global.selectors'

import userActions from '@actions/user.actions'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

function Home(props) {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const account = useSelector(getAccount)
  if (!user) {
    dispatch(userActions.checkStorageAuth())
  }

  const router = useRouter()
  const chainId = useSelector(getChainId)

  const [comingModalOpen, setComingModalOpen] = useState(false)
  const [switchModalOpen, setSwitchModalOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [whitelisted, setWhitelisted] = useState(false)
  const screenWidth = useWindowDimensions().width
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    screenWidth > 376 ? setIsMobile(false) : setIsMobile(true)
  }, [screenWidth])

  const handleClose1 = () => {
    setOpen1(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const fetchWhiteListed = async () => {
      const resp = await userActions.checkWhitelisted(account)
      if (resp !== whitelisted) setWhitelisted(resp)
    }

    if (account) {
      fetchWhiteListed()
    }
  }, [account])

  const onContribute = () => {
    if (!user) {
      setOpen(true)
      return
    }
    if (!whitelisted) {
      setOpen1(true)
      return
    }
    if (Number(chainId) === 137 || Number(chainId) === 80001) {
      router.push('/minting')
      return
    }
    setSwitchModalOpen(true)
  }

  return (
    <div className="block" style={{height: 'fit-content'}}>
      <div className="relative enterheader" id="parentCo">
        <img src="/images/banner.png" alt="banner" className="md:absolute w-full md:h-full" />
        <img src="/images/open.svg" alt="open" className="absolute t-20 l-0 openimg" />
      </div>
      <div style={{marginBottom:45}}>
        <p className="font-inter text-3xl text-white md:w-1204 sm:w-auto p-12 mx-auto text-center mt-12 entertext">
          It’s often the case that we have to conform to a framework set by gatekeepers in our
          society. These gatekeepers have been around in every society since the dawn of
          agriculture. It’s something that so many of us simply must accept with no plausible
          alternative. Our current centralised economies incentivise an all out war for whoever can
          control the chokepoints for value exchange — because the model is extractive at its root.
        </p>
        <p className="font-inter text-3xl text-white md:w-1204 sm:w-auto p-12 mx-auto text-center md:mt-12 sm:mt-0 entertext">
          DIGITALAX is operating for a decentralised commercial environment where all players and
          creators have the ability to spin up a personal decentralised realm with dynamic access
          keys. We are growing out our ecosystem to continue to include more savvy doorways and
          access channels for more players and creators to leverage off of.
        </p>
      </div>
      <div className="md:mx-24 md:mt-10 md:pt-9 md:pb-16 md:pl-20 md:pr-12 stripebackground">
        <div className="md:flex md:justify-between w-full">
          {/* contribute */}
          <div className="relative productimg">
            <img src="/images/product5.png" className="w-full" alt="" />
            <a href="/getdressed">
              <img
                src="/images/arrow.svg"
                className="cursor-pointer z-50 w-48 absolute t-9 r-8 animate-horizonbounce"
                alt=""
              />
            </a>
          </div>

          {!isMobile ? (
            <div className="relative productimg">
              <img src="/images/product2.png" className="w-full enterimg" alt="" />
              <a href="/global">
                <img
                  src="/images/arrow.svg"
                  className="cursor-pointer z-50 w-48 absolute b-8 r-8 animate-horizonbounce"
                  alt=""
                />
              </a>
            </div>
          ) : (
            <div className="relative productimg">
              <img src="/images/product3.png" className="w-full enterimg" alt="" />
              <a href="/opensourcelibraries">
                <img
                  src="/images/arrow.svg"
                  className="cursor-pointer z-50 w-48 absolute t-9 r-8 animate-horizonbounce"
                  alt=""
                />
              </a>
            </div>
          )}
        </div>

        <div className="md:flex md:justify-between w-full mt-12">
          {/* contribute */}
          <div className="relative productimg">
            <img src="/images/product7.png" className="md:w-full enterimg" alt="" />
            <a href="/web3-fashion-101">
              <img
                src="/images/arrow.svg"
                className="cursor-pointer z-50 w-48 absolute t-9 r-8 animate-horizonbounce"
                alt=""
              />
            </a>
          </div>

          <div className="relative productimg">
            <img src="/images/product8.png" className="w-full enterimg" alt="" />
            <a href="https://fashion.digitalax.xyz" target="_blank">
              <img
                src="/images/arrow.svg"
                className="cursor-pointer z-50 w-48 absolute b-8 r-8 animate-horizonbounce"
                alt=""
              />
            </a>
          </div>
        </div>

        <div className="md:flex md:justify-between w-full mt-12">
          {/* view */}
          {!isMobile ? (
            <div className="relative productimg">
              <img src="/images/product3.png" className="w-full" alt="" />
              <a href="/opensourcelibraries">
                <img
                  src="/images/arrow.svg"
                  className="cursor-pointer z-50 w-48 absolute t-9 r-8 animate-horizonbounce"
                  alt=""
                />
              </a>
            </div>
          ) : (
            <div className="relative productimg">
              <img src="/images/product4.png" className="w-full enterimg" alt="" />
              <a href="/fractional">
                <img
                  src="/images/arrow.svg"
                  className="cursor-pointer z-50 w-48 absolute b-8 r-8 animate-horizonbounce"
                  alt=""
                />
              </a>
            </div>
          )}
          {!isMobile ? (
            <div className="relative productimg">
              <img src="/images/product4.png" className="w-full enterimg" alt="" />
              <a href="/fractional">
                <img
                  src="/images/arrow.svg"
                  className="cursor-pointer z-50 w-48 absolute b-8 r-8 animate-horizonbounce"
                  alt=""
                />
              </a>
            </div>
          ) : (
            <div className="relative productimg">
              <img src="/images/product2.png" className="w-full enterimg" alt="" />
              <a href="/global">
                <img
                  src="/images/arrow.svg"
                  className="cursor-pointer z-50 w-48 absolute b-8 r-8 animate-horizonbounce"
                  alt=""
                />
              </a>
            </div>
          )}
          {/* Fractional */}
        </div>
        <div className="md:flex md:justify-between w-full mt-12">
          {/* view */}
          <div className="relative productimg">
            <img src="/images/product1.png" className="md:w-full enterimg" alt="" />
            <img
              src="/images/arrow.svg"
              className="cursor-pointer z-50 w-48 absolute t-9 r-8 animate-horizonbounce"
              onClick={onContribute}
              alt=""
            />
          </div>
          <div className="relative productimg">
            <img src="/images/product6.png" className="w-full enterimg" alt="" />
            <a href="https://soundcloud.com/talesofweb3tailors" target="_blank">
              <img
                src="/images/arrow.svg"
                className="cursor-pointer z-50 w-48 absolute b-8 r-8 animate-horizonbounce"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>

      <Modal open={comingModalOpen} handleClose={() => setComingModalOpen(false)}>
        <p className="text-gray-50 font-normal text-base font-inter text-center">Coming Soon!</p>
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
            If you would like to join the Global Designer Network and contribute to our on-chain
            open source libraries through Fractional Garment Ownership then please join our discord
            or telegram and reach out!
          </p>
          <p className="text-gray-50 font-extrabold text-base font-inter text-center mt-6">
            Join us on our mission as we storm the gates of the metaverse and enable the gatemakers
            for web3 fashion and beyond!
          </p>
        </p>
      </Modal>

      <Modal open={open1} handleClose={handleClose1}>
        <p className="text-gray-50 font-normal text-base font-inter text-center">
          <p className="text-gray-50 font-normal text-base font-inter text-center">Hey!</p>
          <p className="text-gray-50 font-extrabold text-base font-inter text-center mt-6">
            We are currently in BETA and whitelisting designers!
          </p>
          <p className="text-gray-50 font-normal text-base font-inter text-center mt-6">
            If you would like to join the Global Designer Network and contribute to our on-chain
            open source libraries through Fractional Garment Ownership then please join our discord
            or telegram and reach out!
          </p>
          <p className="text-gray-50 font-extrabold text-base font-inter text-center mt-6">
            Join us on our mission as we storm the gates of the metaverse and enable the gatemakers
            for web3 fashion and beyond!
          </p>
        </p>
      </Modal>
    </div>
  )
}

export default Home
