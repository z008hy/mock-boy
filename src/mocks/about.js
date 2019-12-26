const api = require('../api')
const {register} = require('../server/mock/register')


register('/test/', 'get', 'hello test')

module.exports = [
  {
    url: api.ABOUT_GET,
    method: 'post',
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
  }
]
