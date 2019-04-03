import * as React from "react";
import {TypographyProps} from "../PropDefs";

export class Typography extends React.Component<TypographyProps> {
    render() {
        //const {variant} = this.props;
        return<span>{this.props.children}</span>
    }
}