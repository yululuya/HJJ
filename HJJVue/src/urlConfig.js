const adress = process.env.VUE_APP_BASE_API + "/";
const interfaceObj = {
  getListPage: adress + 'parameter/getListPage',
  parameterGetById: adress + 'details/getById',
  uploadImg: adress + 'image/upload',
  uploadFile: adress + 'parameter/upload',
  addPar: adress + 'parameter/add',
  updatePar: adress + 'parameter/update',
  deleteIdsPar: adress + 'parameter/deleteIds',
  titleGetList: adress + 'title/getList',
  weatherUpdate: adress +'weather/update'
};
export {
  interfaceObj
};