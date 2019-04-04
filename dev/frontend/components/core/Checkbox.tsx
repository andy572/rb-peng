import * as React from "react";
import {FlexContainer} from "./FlexContainer";
import {Typography} from "./Typography";
import {CheckboxProps} from "../PropDefs";

export class Checkbox extends React.Component<CheckboxProps> {
    public state;

    constructor(props) {
        super(props);
        this.state = {checked:this.props.checked};
    }

    render() {
        let classNames = [];
        classNames.push("fa");
        if (this.state.checked) {
            classNames.push("fa-check");
        }
        classNames.push("rb-checkbox-icon");

        return <FlexContainer style={{...this.props.style}} direction={"row"} alignItems={"center"}>
            <span className={classNames.join(" ")} onClick={() => {return this.onCheckboxClick() }}/>
            <input type={"checkbox"} style={{display:'none'}} ref={this.props.inputRef} checked={this.state.checked}/>
            <Typography>{this.props.label}</Typography>
        </FlexContainer>
    }

    private onCheckboxClick = async () => {
        await this.setState({checked: this.state.checked ? false: true});
        if (this.props.onChange) {
            this.props.onChange();
        }
        return true;
    }
}
