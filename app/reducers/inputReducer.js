const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        input: action.input
      }
    default:
      return state
  }
}

export default reducer;
