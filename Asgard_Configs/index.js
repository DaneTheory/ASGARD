import DefaultConfig from './DefaultConfig'


const AsgardConfig = () => {
  return DefaultConfig()
    .then(data => data)
    .catch(e => {
      console.error(e)
      return new Error(e)
    })
}


export default AsgardConfig
