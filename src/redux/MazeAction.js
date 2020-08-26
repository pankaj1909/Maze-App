export function clearMazeData(type) {
    return function (dispatch) {
        return dispatch({type: type, data: []});
    }
}

export function UpdateMazeData(type, data) {
    return function (dispatch) {
        return dispatch({type: type, data: data});
    }
}