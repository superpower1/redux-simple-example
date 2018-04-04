export const changeInput = input => {
  return {
    type: "CHANGE_INPUT",
    input
  }
}

export const updateChart = newData => {
  return {
    type: "UPDATE_CHART",
    newData
  }
}
