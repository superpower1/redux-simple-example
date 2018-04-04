const initialState = {
  labels: ['data','data','data','data','data','data','data','data','data','data','data','data','data','data','data','data','data','data','data','data'],
  data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CHART':
      return {
        ...state,
        labels: action.newData.labels,
        data: action.newData.data
      }
    default:
      return state
  }
}

export default reducer;
