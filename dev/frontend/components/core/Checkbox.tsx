import * as React from "react";
import {FlexContainer} from "./FlexContainer";
import {Typography} from "./Typography";
import {CheckboxProps} from "../PropDefs";
import {RefObject} from "react";

export class Checkbox extends React.Component<CheckboxProps> {
    private inputRef:RefObject<HTMLInputElement> = React.createRef();
    public state;

    constructor(props) {
        super(props);

        const checked = this.props.checked;
        this.state = {checked:checked};
    }

    render() {
        let classNames = [];
        classNames.push("fa");

        const checked = this.props.checked || this.state.checked;
        if (checked) {
            classNames.push("fa-check");
        }
        classNames.push("rb-checkbox-icon");

        let labelClass = "";
        if (this.props.labelColor) {
            labelClass = "rb-".concat(this.props.labelColor);
        }

        return <FlexContainer style={{...this.props.style}} direction={"row"} alignItems={"center"}>
            <span className={classNames.join(" ")} onClick={() => {return this.onCheckboxClick() }}/>
            <input type={"checkbox"} style={{display:'none'}} ref={this.inputRef} checked={checked}/>
            <Typography style={{...this.props.labelStyle}} className={labelClass}>{this.props.label}</Typography>
        </FlexContainer>
    }

    private onCheckboxClick = async () => {
        const checked = this.state.checked == false ? true : false;
        await this.setState({checked: checked});

        if (this.props.onChange) {
            this.props.onChange(checked);
        }
        return true;
    }
}
