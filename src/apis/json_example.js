module.exports = {
  url: '/json_example',
  method: 'get',
  data: {
    data: [
      {
        neType: '@name',
        version: '@id@id',
        hardwareVersion: '@id',
        softwareVersion: '@id',
        neMac: '@id',
        barCode: '@id',
      },
    ],
    error: { errorcode: '0', errorinfo: 'error info' },
    errors: [{ errorcode: '1' }, { errorinfo: 'errors info' }],
  }
};