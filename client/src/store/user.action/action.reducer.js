const initialize = {
  data: [],
  modalAdd: false
}

const reducer = (state = initialize, action) => {
  switch (action.type) {
    case 'ASSIGN_DATA': {
      return {
        ...state,
          data: action.payload
      }
    }

    case 'ASSIGN_CREATE': {
      return {
        ...state,
          data: action.payload,
          modalAdd: false
      }
    }

    case 'OPEN_MODAL_ADD': {
      return {
        ...state,
          modalAdd: true
      }
    }

    default:
      return state;
  }
}

export default reducer