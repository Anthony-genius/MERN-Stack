const determineAPIBaseUrl = () => {
  // eslint-disable-next-line
  switch (process.env.SERVER) {
    case 'demo':
      return '"http://impacti-demo-api.impacti.solutions"'
    case 'stage':
      return '"http://impacti-stage-api.impacti.solutions"'
    case 'prod':
      return '"http://webapp-api.impacti.solutions"'
    case 'local':
      return '"http://localhost:3001"'
    default:
      return '"http://localhost:3001"'
  }
}

const determineAppBaseUrl = () => {
  // eslint-disable-next-line
  switch (process.env.SERVER) {
    case 'demo':
      return '"http://impacti-demo.impacti.solutions"'
    case 'stage':
      return '"http://impacti-stage.impacti.solutions"'
    case 'prod':
      return '"http://webapp.impacti.solutions"'
    case 'local':
      return '"http://localhost:3001"'
    default:
      return '"http://localhost:3001"'
  }
}

export default {
  determineAppBaseUrl,
  determineAPIBaseUrl
}
