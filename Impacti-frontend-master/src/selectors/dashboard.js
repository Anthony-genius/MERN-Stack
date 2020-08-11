export const getTabsForCurrentlySelectedPaths = (
  selectedPathId,
  tabDefinitions
) => {
  const foundPath = tabDefinitions.find(
    definition => definition.id === selectedPathId
  )

  return foundPath ? foundPath.tabs : []
}
