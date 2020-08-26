import React from "react";

export function RowColDiv(props) {
    let {style = {}, division = [], rowClasses = ''} = props
    if (division.length === 1) {
        let extraClasses, item = division[0];
        if (isNaN(item) && item.includes("(") && item.includes(")")) {
            extraClasses = item.substring(item.indexOf("(") + 1, item.indexOf(")"))
            item = item.substring(0, item.indexOf("("))
        }
        return <div className={"row " + rowClasses} style={style}>
            <div className={"col-sm-" + item + " " + (extraClasses || "")}>{props.children}</div>
        </div>
    } else {
        return (
            <div className={"row " + rowClasses} style={style}>
                {division.map((item, index) => {
                    let extraClasses;
                    if (isNaN(item) && item.includes("(") && item.includes(")")) {
                        extraClasses = item.substring(item.indexOf("(") + 1, item.indexOf(")"))
                        item = item.substring(0, item.indexOf("("))
                    }
                    return <div key={index} className={"col-sm-" + item + " " + (extraClasses || "")}>
                        {props.children[index]}
                    </div>
                })}
            </div>
        )
    }
}

export function TitleValueDiv(props) {
    let {label, inputLabel, value, mandatory = false, style = {}, bold, title} = props
    if (label) {
        return <RowColDiv rowClasses={props.rowClasses || "border-bottom mt-0"} style={style}
                          division={props.division || [12, 12]}>
            <>
                {bold ? <LabelBold label={label}/> : <Label label={label}/>}{mandatory && <em>*</em>}
            </>
            <label>{value || props.children || ""}</label>
        </RowColDiv>
    } else if (inputLabel) {

        return <RowColDiv rowClasses={props.rowClasses || "border-bottom mt-0"} style={style}
                          division={props.division || [12, 12]}>
            <>
                {bold ? <LabelBold label={label}/> : title ? <span title={title}>{inputLabel}</span> :
                    <Label label={inputLabel}/>}{mandatory && <em>*</em>}
            </>
            <>{props.children}</>
        </RowColDiv>
    } else {
        return <RowColDiv division={props.division || [12, 12]} style={style}>
            <Label label={""}/>
            <label>{value || props.children || ""}</label>
        </RowColDiv>
    }
}

export const LabelBold = ({label, className, children}) => {
    return <label className={"font-weight-bold " + (className || "")}>{label || children}</label>
}

export const Label = props => {
    let {hidden = false, htmlFor = "", id = "", label = ""} = props;
    return (
        <label hidden={hidden} htmlFor={htmlFor} id={id}>
            {label}
        </label>
    );
};

export const Card = ({style = {}, ...props}) => {
    return (
        <div className="card mt-1 ml-5" style={style}>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    )
}

export const ShowComponent = ({show = false, ...props}) => {
    if (show) {
        return <>{props.children}</>
    } else {
        return <></>
    }
}

export default class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.setState({
            value: this.props.value,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                value: this.props.value,
            });
        }
    }

    onInputChange = (e) => {
        let data = e;
        this.setState({
            value: data.target.value,
        });
        if (this.props.onChange) this.props.onChange(data);
    };

    render() {
        let {error = false, id = "", name = "", type = 'text', disable = false, maxlength = 1000, placeholder = '', value = ''} = this.props;
        let classes = error ? "form-control form-control-sm error-border" : "form-control form-control-sm";
        return (
            <div>
                <input
                    className={classes}
                    type={type}
                    id={id}
                    name={name}
                    disabled={disable}
                    value={this.state.value}
                    onChange={(e) => this.onInputChange(e)}
                    placeholder={placeholder}
                    maxLength={maxlength}
                />
                {error ?
                    <small className="error text-danger">{error}</small> : <></>}
            </div>
        );
    }
}
