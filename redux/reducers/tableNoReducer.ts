const defaultState = '';
const tableNo = (state = defaultState, action: any) => {
  switch (action.type) {
    case 'UPDATE_TABLE_NO':
      return action.payload;
    default: 
      return state;
  }
};

export default tableNo;