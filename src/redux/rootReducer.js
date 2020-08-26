import {combineReducers} from "redux";
import MazeReducer from "./MazeReducer";

const rootReducer = combineReducers({
    data: MazeReducer
});

export default rootReducer;