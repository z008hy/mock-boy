const api = require('../api')
const {register} = require('../mock/register')


register('/test/', 'get', 'hello test')
register(api.getUser, 'get',  {
  user: '@name',
  id: '@id'
})

