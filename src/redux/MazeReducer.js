export default function MazeReducer(state = {}, action) {

    switch (action.type) {
        case "MazeSuccess":
            return {
                ...state,
                MazeData: action.data,
                MazeErrorData: null,
            };
        case "MazeSuccessAppend":
            return {
                ...state,
                MazeData: {...state.MazeData, ...action.data},
                MazeErrorData: null,
            };
        case "MazeError":
            return {
                ...state,
                MazeErrorData: action.data
            };
        default:
            return state;
    }
}