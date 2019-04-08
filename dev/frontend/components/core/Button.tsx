import * as React from "react";
import {ButtonProps} from "../PropDefs";
import {FlexContainer} from "./FlexContainer";

export class Button extends React.Component<ButtonProps> {
    render() {
        let classNames = ["rb-flex rb-button"];
        if (this.props.flat || this.props.buttonStyle === "flat")
            classNames.push("flat");

        if (this.props.outlined || this.props.buttonStyle === "outlined")
            classNames.push("outlined");

        if (this.props.buttonType === "success")
            classNames.push("success");

        if (this.props.buttonType === "danger")
            classNames.push("danger");

        if (this.props.buttonType === "primary")
            classNames.push("primary");

        if (this.props.className && this.props.className.length) {
            this.props.className.split(/\s+/).forEach((clazz) => {
                if (clazz.length) {
                    classNames.push(clazz);
                }
            })
        }

        const alignItems:string = "rb-flex-align-" + this.props.align ? this.props.align : "center";
        classNames.push(alignItems);
        return <FlexContainer style={this.props.style} direction={"row"} className={classNames.join(" ")} onClick={this.onButtonClick}>
            {this.props.children}
        </FlexContainer>
    }

    onButtonClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
}