import { datasetSelector } from './dataset'

/**
 * Generates selectors with the provided config
 * @param  {Object} config - selector configuration
 *
 * @return {Object} - Set of selectors
 */
const selectors = (config) => {
  if (!config) throw new Error('clerk.selectors: Expected config')
  if (!config.baseSelector) throw new Error('clerk.selectors: Expected baseSelector')

  return {
    dataset: datasetSelector.bind(null, config)
  }
}

export default selectors