import * as React from "react";
import {FlexContainer} from "./FlexContainer";
import {Typography} from "./Typography";
import {CheckboxProps} from "../PropDefs";

export class Checkbox extends React.Component<CheckboxProps> {
    state : {checked: boolean, useState: boolean};

    constructor(props) {
        super(props);
        this.state = {checked:false, useState: (this.props.checked === undefined)};
    }

    render() {
        let classNames = [];
        classNames.push("fa");

        let checked = false;
        if (this.props.checked === true)
            checked = true;

        if (this.state.useState)
            checked = this.state.checked;

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
            <Typography style={{...this.props.labelStyle}} className={labelClass}>{this.props.label}</Typography>
        </FlexContainer>
    }

    private onCheckboxClick = async () => {
        const checked = this.state.checked == false;
        await this.setState({checked: checked});

        if (this.props.onChange) {
            this.props.onChange(checked);
        }
        return true;
    }
}
