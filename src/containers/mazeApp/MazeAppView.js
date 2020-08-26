import React from "react";
import InputBox, {Card, RowColDiv, ShowComponent, TitleValueDiv} from "../../components/Util";
import Board from "../../components/mazeBoard/Board";

export default function MazeAppView(props) {
    let {data = {}} = props
    let {MazeErrorData, MazeData = {}} = data
    let {height = undefined, width = undefined} = MazeData
    let errorData
    let validTrue = true
    if (MazeErrorData) {
        let {error, valid} = MazeErrorData
        errorData = error
        validTrue = valid
    }

    let style = {
        "backgroundColor": "grey",
        "width": "500px"
    }

    return (
        <>
            <RowColDiv division={[12]} rowClasses="text-center">
                <h2>Enter The Width and height Details</h2>
            </RowColDiv>
            <RowColDiv division={[12]} rowClasses="offset-3 mt-1">
                <Card style={style}>
                    <ShowComponent show={!validTrue}>
                        <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                        <span className={"text-danger ml-1 mb-2"}>{errorData}</span>
                    </ShowComponent>
                    <TitleValueDiv division={["6(text-left mt-1)", "6(mt-1)"]} rowClasses="form-group" inputLabel={"Height"}
                                   mandatory={true}>
                        <InputBox name="Height" id="Height" maxlength={25}/>
                    </TitleValueDiv>
                    <TitleValueDiv division={["6(text-left)", 6]} rowClasses="form-group" inputLabel={"Width"}
                                   mandatory={true}>
                        <InputBox name="Width" id="Width" maxlength={25}/>
                    </TitleValueDiv>
                    <TitleValueDiv division={["12(text-center)"]}>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </TitleValueDiv>
                </Card>
            </RowColDiv>
            <RowColDiv division={[12]} rowClasses="text-center mt-3">
                <ShowComponent show={height && width}>
                    <Board {...props}/>
                </ShowComponent>
            </RowColDiv>
        </>
    )

}