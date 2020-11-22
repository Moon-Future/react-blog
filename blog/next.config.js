const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
// module.exports = withCSS({})
module.exports = () => withSass(withCSS())
