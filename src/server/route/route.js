module.exports = router => {
  router['get']('/', async (ctx) => {
    ctx.body = 'mock-boy'
  })
}