const mocks = []

module.exports = {
  mocks,
  register (url, method, data) {
    mocks.push({url, method, data})
  }
}