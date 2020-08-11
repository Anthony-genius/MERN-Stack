export default ({ sdgs, countryToSdgs, countries, sectors, allSdgs }) => {
  const countrySdgs = countryToSdgs
    .filter(sdg => countries.some(e => e.name === sdg.country))
    .flatMap(e =>
      e.sdgs.map(sdg => ({
        shortName: sdg.shortName,
        rank: sdg.rank || 0,
        reason: 'country'
      }))
    )

  const sectorLeadershipSdgs = sectors.flatMap(sector =>
    sector.leadershipSdgs.map(sdg => ({
      shortName: sdg.shortName,
      reason: 'leadership',
      rank: 2
    }))
  )

  const sectorOpportunitySdgs = sectors.flatMap(sector =>
    sector.opportunitySdgs.map(sdg => ({
      shortName: sdg.shortName,
      reason: 'opportunity',
      rank: 2
    }))
  )

  const allRankedSdgs = [
    ...countrySdgs,
    ...sectorLeadershipSdgs,
    ...sectorOpportunitySdgs
  ]

  const sortedSdgs = allSdgs
    .map(sdg => {
      const filteredSdgsWithRank = allRankedSdgs.filter(
        e => e.shortName === sdg.shortName
      )

      const rank = filteredSdgsWithRank.reduce((prev, e) => prev + e.rank, 0)

      const reasonSet = new Set()

      filteredSdgsWithRank.flatMap(e => e.reason).forEach(e => reasonSet.add(e))

      return { ...sdg, rank, reason: [...reasonSet] }
    })
    .sort((a, b) => b.rank - a.rank)

  const getIsSelectedForShortName = shortName =>
    sdgs.some(sdg => sdg.shortName === shortName)

  const selectedSdgs = sortedSdgs.map((e, index) => {
    const selected = getIsSelectedForShortName(e.shortName)

    return {
      ...e,
      selected: selected /*|| (sdgs.length === 0 && index <= 2)*/
    }
  })

  return selectedSdgs
}
