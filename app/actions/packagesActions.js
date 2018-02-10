/**
 * Redux actions
 */

import * as types from 'constants/ActionTypes'

export function setVersion(version) {
  return {
    type: types.SET_VERSION,
    version
  }
}

export function setActiveTab(tabIndex) {
  return {
    type: types.SET_TAB_INDEX,
    tabIndex
  }
}

export function toggleExpanded() {
  return {
    type: types.TOGGLE_EXPANDED
  }
}

export function setTotal(total) {
  return {
    type: types.SET_TOTAL,
    total
  }
}

export function setPackagesOutdated(outdated) {
  return {
    type: types.SET_PACKAGES_OUTDATED,
    outdated
  }
}

export function setPackageGroup(group) {
  return {
    type: types.SET_PACKAGE_GROUP,
    group
  }
}

export function setPackageActions(actions) {
  return {
    type: types.SET_PACKAGE_ACTIONS,
    actions
  }
}

export function setPackages(packages) {
  return {
    type: types.SET_PACKAGES,
    packages
  }
}

export function setActive(active) {
  return {
    type: types.SET_ACTIVE,
    active
  }
}

export function toggleMainLoader(isLoading) {
  return {
    type: types.TOGGLE_MAIN_LOADER,
    isLoading
  }
}