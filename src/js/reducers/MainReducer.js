import remoteService from '../services/RemoteService';

const MainReducer = (currentState, action) => {
	currentState = currentState ||{}; // Initial State
  
  switch (action.type) {
		case 'Dirty':
			var res = Object.assign({}, currentState, {"Dirty":action.data});		
			remoteService.get(action.key, undefined, undefined, action.dispatch);
			return res;
		case 'Task':
			return Object.assign({}, currentState, {"Task":action.data});	
		case 'Note':
			return Object.assign({}, currentState, {"Note":action.data});			
    default:
    	return currentState; // Always return the state
  }
}

export default MainReducer;
