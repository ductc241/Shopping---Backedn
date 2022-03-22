const productRouter = require('./productRoute')
const categoryRouter = require('./categoryRouter')
const uploadRouter = require('./uploadRouter')
const authRouter = require('./authRouter')
const userRouter = require('./userRouter')
const orderRouter = require('./orderRouter')


function router(app) {
  app.use('/api', productRouter)
  app.use('/api', categoryRouter)
  app.use('/api', uploadRouter)
  app.use('/auth', authRouter)
  app.use('/api', userRouter)
  app.use('/api', orderRouter)
}

module.exports = router;