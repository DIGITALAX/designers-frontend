import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import ModalConnectWallet from '@containers/modals/modal-connect-wallet'
import ModalConnectArkane from '@containers/modals/modal-connect-arkane'
import ModalSignup from '@containers/modals/modal-sign-up'
import ModalSuccess from '@containers/modals/modal-gen-success'
import ModalCC0 from '@containers/modals/modal-cc0'
import ModalCC02 from '@containers/modals/modal-cc0-2'
import PreviewMaterial from '@containers/modals/preview-material'
import ModalConnectMatic from './modal-connect-matic'

const Modals = () => {
  const modals = useSelector((state) => state.modals.toJS())
  const {
    isShowModalConnectMetamask,
    isShowModalConnectArkane,
    isShowModalSignup,
    isShowModalSuccess,
    isShowModalCC0,
    isShowModalCC02,
    isShowPreviewMaterial,
    isShowModalConnectMatic
  } = modals

  return (
    <>
      {isShowModalConnectMetamask && <ModalConnectWallet />}
      {isShowModalSignup && <ModalSignup />}
      {isShowModalSuccess && <ModalSuccess />}
      {isShowModalCC0 && <ModalCC0 />}
      {isShowModalCC02 && <ModalCC02 />}
      {isShowPreviewMaterial && <PreviewMaterial />}
      {isShowModalConnectMatic && <ModalConnectMatic />}
      {isShowModalConnectArkane && <ModalConnectArkane/>}
    </>
  )
}

export default memo(Modals)
