import React from "react";
import enemy from '../../images/enemy.png'
import mario from '../../images/mario.png'
import empty from '../../images/empty.png'
import {ShowComponent} from "../Util";

export const Square = ({i, ...props}) => {
    let {data = {}} = props
    let {MazeData = {}} = data
    let {squares = []} = MazeData
    let {element, display, value} = squares[i]

    let style = {
        "width": "70px",
        "height": "60px",
    }

    return (
        <button type="button" className="btn btn-light btn-outline-dark" onClick={() => props.onClick()} style={style}>
            <ShowComponent show={element === 'mario'}>
                <img src={mario} alt={''}/>
            </ShowComponent>
            <ShowComponent show={element === 'enemy'}>
                <img src={enemy} alt={''}/>
            </ShowComponent>
            <ShowComponent show={element !== 'mario' || element !== 'enemy'}>
                <img src={empty} alt={''}/>
            </ShowComponent>
        </button>
    );
}

export function checkForEnemies(props) {
    let {data = {}} = props
    let {MazeData = {}} = data
    let {squares = [], marioLocation, moves} = MazeData
    let enemies = squares.filter(square => {
        return square.element === 'enemy';
    });
    if (enemies.length === 0) {
        alert('Game over. Total moves to save princess: ' + moves);
    } else {
        decideMove(enemies.map((enemy) => enemy.value), props);
    }
}

function decideMove(enemyLocations, props) {
    let {data = {}} = props
    let {MazeData = {}} = data
    let {marioLocation, width} = MazeData
    let distance = Math.abs(
        enemyLocations[0] - marioLocation
    );
    let marioRange = getMarioRange(props);
    if (
        distance < width
        && enemyLocations[0] < marioLocation
        && numberInRange(enemyLocations[0], marioRange)
    ) {
        moveX('-', props);
    } else if (
        distance < width
        && enemyLocations[0] < marioLocation
        && !numberInRange(enemyLocations[0], marioRange)
    ) {
        moveY('+', props);
    } else if (
        distance < width
        && enemyLocations[0] > marioLocation
        && numberInRange(enemyLocations[0], marioRange)
    ) {
        moveX('+', props);
    } else if (
        distance < width
        && enemyLocations[0] > marioLocation
        && !numberInRange(enemyLocations[0], marioRange)
    ) {
        moveY('-', props);
    } else if (
        distance >= width
        && enemyLocations[0] < marioLocation
    ) {
        moveY('+', props);
    } else {
        moveY('-', props);
    }
}

function getMarioRange(props) {
    let {data = {}} = props
    let {MazeData = {}} = data
    let {height, width, marioLocation} = MazeData

    let marioRange = [];
    for (let i = 0; i < height; i++) {
        if (
            marioLocation >= (i * width)
            && marioLocation < (i * width) + width
        ) {
            marioRange = [
                (i * width),
                (i * width) + width
            ];
        }

    }
    return marioRange
}

function numberInRange(x, range) {
    return x >= range[0] && x < range[1];
}

export function moveY(direction, props) {
    let {data = {}} = props
    let {MazeData = {}} = data
    let {height, width, marioLocation, totalSquares, squares, moves = 0, yMoves = 0, xMoves = 0, lastMove = '+y'} = MazeData
    if (
        direction === '+'
        && (marioLocation + 1 - height) > 0
    ) {
        let newSquares = squares.slice();
        newSquares[marioLocation] = {
            element: '', display: 'none'
        };
        newSquares[marioLocation - height] = {
            element: 'mario', display: 'block'
        };

        let data = {
            gameInitialized: true,
            marioLocation: marioLocation - height, squares: newSquares,
            moves: moves + 1,
            yMoves: yMoves + 1,
            xMoves: 0,
            lastMove: '+y'
        }
        props.UpdateMazeData("MazeSuccessAppend", data)
    } else if (
        direction === '-' &&
        (marioLocation + height) < totalSquares
    ) {
        let newSquares = squares.slice();
        newSquares[marioLocation] = {
            element: '', display: 'none'
        };
        newSquares[marioLocation + height] = {
            element: 'mario', display: 'block'
        };

        let data = {
            gameInitialized: true,
            marioLocation: marioLocation + height,
            squares: newSquares,
            moves: moves + 1, yMoves: yMoves + 1, xMoves: 0, lastMove: '-y'
        }
        props.UpdateMazeData("MazeSuccessAppend", data)
    } else {
        lastMove === '+y'
            ? moveY('-')
            : lastMove === '-y'
            ? moveY('+')
            : props.UpdateMazeData("MazeSuccessAppend", {lastMove: '+y'});
    }

}

export function moveX(direction, props) {
    let {data = {}} = props
    let {MazeData = {}} = data
    let {height, width, marioLocation, totalSquares, squares, moves = 0, yMoves = 0, xMoves = 0, lastMove = '+y'} = MazeData
    if (
        direction === '+'
        && (marioLocation + 2) % width !== 1
        && (marioLocation + 1) < totalSquares
    ) {
        let newSquares = squares.slice();
        newSquares[marioLocation] = {
            element: '', display: 'none'
        };
        newSquares[marioLocation + 1] = {
            element: 'mario', display: 'block'
        };
        let data = {
            gameInitialized: true,
            marioLocation: marioLocation + 1,
            squares: newSquares,
            moves: moves + 1,
            xMoves: xMoves + 1,
            yMoves: 0,
            lastMove: '+x'
        }
        props.UpdateMazeData("MazeSuccessAppend", data)
    } else if (
        direction === '-'
        && (marioLocation) % width !== 0
        && (marioLocation - 1) >= 0
    ) {
        let newSquares = squares.slice();
        newSquares[marioLocation] = {
            element: '', display: 'none'
        };
        newSquares[marioLocation - 1] = {
            element: 'mario', display: 'block'
        };
        let data = {
            gameInitialized: true,
            marioLocation: marioLocation - 1,
            squares: newSquares,
            moves: moves + 1,
            xMoves: xMoves + 1,
            yMoves: 0,
            lastMove: '-x'
        }
        props.UpdateMazeData("MazeSuccessAppend", data)
    } else {
        lastMove === '+x'
            ? moveX('-')
            : lastMove === '-x'
            ? moveX('+')
            : props.UpdateMazeData("MazeSuccessAppend", {lastMove: '+x'});
    }

}

