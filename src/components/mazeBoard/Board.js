import React, {useEffect} from "react";
import {checkForEnemies, Square} from "./TagLib";
import {ShowComponent} from "../Util";


export default function Board(props) {
    let {data = {}} = props
    let {MazeData = {}} = data
    let {height, width, squares = [], marioLocation, gameInitialized = false, moves = 0, yMoves = 0, xMoves = 0, lastMove = '+y', totalSquares} = MazeData

    useEffect(() => {
        init()
    }, [height, width])

    useEffect(() => {
        setTimeout(() => {
            if (moves !== 0) {
                checkForEnemies(props);
            }
        }, 100);
    }, [moves])

    function init() {
        if (!gameInitialized) {
            let luckySquares = [];
            for (let i = 0; i < Math.floor(Math.sqrt(totalSquares)) + 1; i++) {
                luckySquares.push(
                    Math.floor(Math.random() * (totalSquares))
                );
            }
            let squareNumber = 0;
            let squares1 = [];
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    let element = squareNumber === marioLocation ? "mario" : luckySquares.includes(squareNumber) ? "enemy" : "";
                    let display = luckySquares.includes(squareNumber) || squareNumber === marioLocation ? "block" : "none";
                    squares1.push({element, display, value: squareNumber});
                    squareNumber++;
                }
            }
            props.UpdateMazeData("MazeSuccessAppend", {squares: squares1})
        }
    }

    function renderBoard() {
        let board = [];
        let rows = [];
        for (let i = 0, squareNumber = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                rows.push(
                    renderSquare(squareNumber)
                );
                squareNumber++;
            }
            board.push(renderRows(rows));
            rows = [];
        }
        return board;
    }

    function renderRows(squares) {
        return (<div>
            {squares}
        </div>);
    }

    function renderSquare(i) {
        return <Square i={i}
                       {...props}
                       onClick={() => handleClick(i)}/>;
    }

    function handleClick(i) {
        if (i === marioLocation) checkForEnemies(props);
    }


    return (
        <ShowComponent show={squares.length !== 0}>
            <>
                {renderBoard()}
            </>
        </ShowComponent>
    )

}