type AppConfig = {
  apiURL: string
}

const config: AppConfig = require('../../../config.json')

export const { apiURL } = config
export const MAX_PAGE_SIZE = 50
