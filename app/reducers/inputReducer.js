const reducer = (state = {}, action) => {
  console.log(state);
  // switch (action.type) {
  //   case 'CHANGE_INPUT':
  //     return {
  //       ...state,
  //       input: action.input
  //     }
  //   default:
  //     return state
  // }
  if (action.type === 'CHANGE_INPUT') {
    return {
      ...state,
      input: action.input
    }
  }
  return state;
}

export default reducer;
