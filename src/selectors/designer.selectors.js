import kebabCase from 'lodash.kebabcase'

export const getAllDesignersById = (state) => state.designer.get('designersById')
export const getDesignerById = (id) => (state) =>
  state.designer.getIn(['designersById', id]) || null
export const getDesignerGarmentIds = () => (state) => state.designer.get('designerGarmentIds')
export const getDesignerInfoById = (id) => (state) =>
  state.designer.get('infoByDesignerId').find((item) => item.id.toLowerCase() === id.toLowerCase())
export const getAllDesigners = () => (state) => state.designer.get('infoByDesignerId')
export const getAllDesignerCIDs = () => (state) => state.designer.get('designerCID')
export const getDesignerCIDById = id => state => {
  const designerInfo = state.designer.get('designerIDs').find(item => item.designerID.toLowerCase() === id.toLowerCase())
  if (!designerInfo) return null
  return designerInfo['CID'] || null
}
export const getAllDesignerIDs = () => (state) => state.designer.get('designerIDs')
export const getDesignerInfoByName = (name, isEqualCheck = false) => (state) =>
  state.designer
    .get('infoByDesignerId')
    .find((item) => (!isEqualCheck ? kebabCase(item.designerName) === name : item.designerName === name))