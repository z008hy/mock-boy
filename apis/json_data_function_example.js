module.exports = {
  url: '/json_data_function_example',
  method: 'get',
  data: (x) => {
    console.log(x)
    const now = new Date()
    return {
      data: [
        {
          neType: '@name',
          version: '@id@id',
          hardwareVersion: '@id',
          softwareVersion: '@id',
          neMac: '@id',
          barCode: '@id',
          now,
        },
      ],
      error: { errorcode: '0', errorinfo: 'error info' },
      errors: [{ errorcode: '1' }, { errorinfo: 'errors info' }],
    }
  }
}
