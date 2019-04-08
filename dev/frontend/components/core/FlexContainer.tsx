import * as React from "react";
import {FlexContainerProps} from "../PropDefs";

export class FlexContainer extends React.Component<FlexContainerProps> {
    render() {
        let classNames:[string] = ["rb-flex"];
        classNames.push("rb-flex-".concat(this.props.direction));

        if (this.props.wrap) {
            classNames.push("rb-flex-wrap")
        }
        if (this.props.grow) {
            classNames.push("rb-flex-grow")
        }
        if (this.props.alignItems) {
            classNames.push("rb-flex-align-".concat(this.props.alignItems));
        }
        if (this.props.alignContent) {
            classNames.push("rb-flex-content-".concat(this.props.alignContent));
        }
        if (this.props.className) {
            classNames.push(this.props.className.split(/\s/).join(" "));
        }

        const generatedClassNames = classNames.join(" ");
        return <div className={generatedClassNames} style={{...this.props.style}} onClick={this.onClick}>
            {this.props.children}
        </div>
    }

    onClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
}