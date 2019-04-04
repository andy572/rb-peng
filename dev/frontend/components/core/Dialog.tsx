import * as React from "react";

export class Dialog extends React.Component<{open:boolean}> {
    render() {
        const visible = this.props.open ? "block" : "none";
        return <div className={"rb-overlay"} style={{display: visible}}>
            {this.props.children}
        </div>
    }
}