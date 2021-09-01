import kebabCase from 'lodash.kebabcase'

export const getDesignerGarmentIds = () => (state) => state.designer.get('designerGarmentIds')
export const getDesignerInfoByName = (name, isEqualCheck = false) => (state) =>
  state.designer
    .get('infoByDesignerId')
    .find((item) => (!isEqualCheck ? kebabCase(item.designerName) === name : item.designerName === name))
export const getCurrentDesignerInfo = () => state => Object.fromEntries(state.designer.get('designerInfo'))
export const getIsLoading = () => state => state.designer.get('isLoading')