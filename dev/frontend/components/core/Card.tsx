import * as React from "react";

type CardProps = {
    className?: string,
    style?: object
}

export class Card extends React.Component<CardProps> {
    render() {
        let classNames:Array<string> = ["rb-card"];
        if (this.props.className) {
            classNames.push(this.props.className.split(/\s/).join(" "));
        }

        const generatedClassNames = classNames.join(" ");
        return <div className={generatedClassNames} style={{...this.props.style}}>
            {this.props.children}
        </div>
    }
}