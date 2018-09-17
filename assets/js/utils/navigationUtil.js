/**
 * Find current findSelectedByName navigation element
 * @param name
 * @param alls
 * @return {T}
 */
export function findSelectedByName (name, alls) {
  if (!name) {
    throw Error('name must not be empty')
  }
  if (!alls || alls.length === 0) {
    throw Error('alls must not be empty')
  }

  return alls.find((nav) => {
    return nav.name === name
  })
}

function inRange (nav, start, range) {
  return (nav.id >= start &&
    nav.id <= start + (range - 1))
}

function isCurrent (currents, nav) {
  return currents.find((curr) => {
    return curr.id === nav.id
  }) !== undefined
}

/**
 * Add or remove elements elements from currents array depending on
 * findSelectedByName navigation element findSelectedByName
 * and all navigation elements to show
 * @param name
 * @param currents
 * @param all
 */
export function updateNavigation (navSelected, currents, alls, range) {
  // console.log('updateNavigation', navSelected, currents, alls)
  if (!navSelected) {
    throw Error('navigation findSelectedByName must not be empty')
  }
  if (!alls || alls.length === 0) {
    throw Error('alls must not be empty')
  }
  if (!range || range < 1) {
    throw Error('range must be number bigger than 1')
  }

  // ensure start >= 0 && start <= alls.length - range
  let start = navSelected.id - 1
  if (start < 0) {
    start = 0
  }
  while (start > 0 &&
  (start + range) > (alls.length)) {
    start--
  }

  // 1- remove current element if curr.id < start || curr.id > start + (range - 1)
  let rmIdx = 0
  for (let curr of currents) {
    if (!inRange(curr, start, range)) {
      currents.splice(rmIdx, 1)
    }
    rmIdx++
  }

  // 2- add nav to currents when nav.id >= start or nav.id <= start + (range - 1) and !current.includes(nav).
  // It must be added at first position if currents is empty or nav.id < currents[0].id.
  // Otherwise it must be added at last position.
  for (let nav of alls) {
    if (inRange(nav, start, range) && !isCurrent(currents, nav)) {
      if (currents.length === 0 || nav.id < currents[0].id) {
        currents.splice(0, 0, nav)
      } else {
        currents.splice(currents.length, 0, nav)
      }
    }
  }
}
