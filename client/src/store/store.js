import { createStore } from 'redux'

const initialState={
    user:{login:null},
    admin:{login:null},
    currentWorkspace:null,
    refresh:true,
    workspaces:{}
}

function reducer(state=initialState, action){
    switch(action.type){
        case 'user': return {...state, user:action.payload};
        case 'admin': return {...state, admin:action.payload};
        case 'workspace': return {...state, currentWorkspace:action.payload};
        case 'addWorkspace': return {...state,workspaces:{...state.workspaces,[action.payload.id]:action.payload.workspace}}
        case 'clearWorkspace': return {...state,currentWorkspace:null,workspaces:{}}
        
        case 'refresh': return {...state, refresh:!state.refresh}; //old

        // case 'refresh':
        //     return { ...state, refresh: action.payload };

        default: return state;
    }

}

export default createStore(reducer)