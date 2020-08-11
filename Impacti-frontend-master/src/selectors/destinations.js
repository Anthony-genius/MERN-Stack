export const pathAndMemberIntersection = destinations => (
  member = { destinations: [] }
) => path =>
  destinations
    .filter(destination =>
      member.destinations.some(d => destination._id === d._id)
    )
    .filter(destination =>
      destination.recommendedPaths.some(
        p => p._id === path._id || p === path._id
      )
    )
