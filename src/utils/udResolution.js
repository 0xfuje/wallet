import { default as Resolution } from '@unstoppabledomains/resolution';

const resolutionConfig = () => {
  return new Resolution({
    sourceConfig: {
      uns: {
        api: true
      }
    }
  })
}
const resolutionUD = resolutionConfig()

const getSupportedUDomains = async () => {
  const tlds = fetch('https://resolve.unstoppabledomains.com/supported_tlds')
    .then((response) => response.json())
    .then((data) => data.tlds)
  return tlds
}

const isUnstoppableDomain = async (domain) => {
  const domainsUD = await getSupportedUDomains()
  const bool = domainsUD.some((tld) => {
    if (domain.includes(tld)) {
      return true
    }
    return false
  })
  return bool
}

const resolveUD = async (domain) => {
  const resolved = await resolutionUD.addr(domain, 'ETH')
  console.log(resolved)
  return resolved
}

export default resolveUD
export { isUnstoppableDomain }
