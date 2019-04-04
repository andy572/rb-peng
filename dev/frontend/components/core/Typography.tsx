import * as React from "react";
import {TypographyProps} from "../PropDefs";

export class Typography extends React.Component<TypographyProps> {
    render() {
        const {variant} = this.props;
        let classNames = [];
        classNames.push(this.props.color ? "rb-"+this.props.color : "rb-textPrimary");

        if (this.props.className && this.props.className.length) {
            classNames.push(this.props.className);
        }

        switch (variant) {
            case "caption":
                return<span className={classNames.join(" ")} style={{...this.props.style}}>{this.props.children}</span>;

            case "subtitle1":
                classNames.push("rb-h4");
                return<h4 className={classNames.join(" ")} style={{...this.props.style}}>{this.props.children}</h4>;

            case "subtitle2":
                classNames.push("rb-h5");
                return<h5 className={classNames.join(" ")} style={{...this.props.style}}>{this.props.children}</h5>;

            case "body":
                return<p className={classNames.join(" ")} style={{...this.props.style}}>{this.props.children}</p>;

            case "h1":
                classNames.push("rb-h1");
                return<h1 className={classNames.join(" ")} style={{...this.props.style}}>{this.props.children}</h1>;

            case "h2":
                classNames.push("rb-h2");
                return<h2 className={classNames.join(" ")} style={{...this.props.style}}>{this.props.children}</h2>;

            case "h3":
                classNames.push("rb-h3");
                return<h3 className={classNames.join(" ")} style={{...this.props.style}}>{this.props.children}</h3>;

            case "h4":
                classNames.push("rb-h4");
                return<h3 className={classNames.join(" ")} style={{...this.props.style}}>{this.props.children}</h3>;

            case "h5":
                classNames.push("rb-h5");
                return<h5 className={classNames.join(" ")} style={{...this.props.style}}>{this.props.children}</h5>;

            case "h6":
                classNames.push("rb-h6");
                return<h6 className={classNames.join(" ")} style={{...this.props.style}}>{this.props.children}</h6>;
        }
        return<span className={classNames.join(" ")} style={{...this.props.style}}>{this.props.children}</span>
    }
}