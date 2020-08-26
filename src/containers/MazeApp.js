import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import MazeAppView from "./mazeApp/MazeAppView";
import {UpdateMazeData} from '../redux/MazeAction'

function MazeApp(props) {

    function onFormSubmit(e) {
        e.preventDefault()
        props.UpdateMazeData("MazeError", undefined)
        let formData = new FormData(e.target)
        let dataArray = {}
        for (let pair of formData.entries()) {
            dataArray[pair[0]] = pair[1]
        }
        let errorData = {
            valid: false
        }
        if (dataArray["Height"] === "" || dataArray["Width"] === "") {
            errorData["error"] = "Missing mandatory data"
            props.UpdateMazeData("MazeError", errorData)
        } else {
            if (isNaN(parseInt(dataArray["Height"]))) {
                errorData["error"] = "Please enter a valid integer for height"
                props.UpdateMazeData("MazeError", errorData)
            } else if (isNaN(parseInt(dataArray["Width"]))) {
                errorData["error"] = "Please enter a valid integer for Width"
                props.UpdateMazeData("MazeError", errorData)
            } else if (parseInt(dataArray["Width"]) < 0 || parseInt(dataArray["Height"]) < 0) {
                errorData["error"] = "Please enter a positive integer"
                props.UpdateMazeData("MazeError", errorData)
            } else {
                let totalSquares = parseInt(dataArray["Height"]) * parseInt(dataArray["Width"])
                let data = {
                    height: parseInt(dataArray["Height"]),
                    width: parseInt(dataArray["Width"]),
                    squares: [],
                    marioLocation: Math.floor(Math.random() * totalSquares),
                    gameInitialized: false,
                    moves: 0,
                    yMoves: 0,
                    xMoves: 0,
                    lastMove: '+y',
                    totalSquares: totalSquares
                }
                props.UpdateMazeData("MazeSuccess", data)
            }
        }
    }

    return (
        <form onSubmit={(e) => onFormSubmit(e)}>
            <MazeAppView {...props} {...props.data}/>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        ...state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        UpdateMazeData: bindActionCreators(UpdateMazeData, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MazeApp)

