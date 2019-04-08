import * as React from "react";
import {Card} from "./Card";
import {FlexContainer} from "./FlexContainer";

export class DialogOverlay extends React.Component<{open:boolean}> {
    render() {
        const visible = this.props.open ? "visible" : "hidden";
        return <div className={"rb-overlay"} style={{visibility: visible}}>
            {this.props.children}
        </div>
    }
}

export class Dialog extends React.Component<{open:boolean}> {
    render() {
        const opacity = this.props.open ? 1 : 0;
        const clazz = opacity == 1 ? "visible" : "";
        return <DialogOverlay open={this.props.open}>
            <Card className={"rb-dialog ".concat(clazz)}>
                {this.props.children}
            </Card>
        </DialogOverlay>
    }
}

export class DialogTitle extends React.Component {
    render() {
        return <FlexContainer direction={"row"} className={"rb-dialog-title"}>
            {this.props.children}
        </FlexContainer>
    }
}

export class DialogContent extends React.Component {
    render() {
        return <div className={"rb-dialog-content"}>
            {this.props.children}
        </div>
    }
}

export class DialogControls extends React.Component {
    render() {
        return <div className={"rb-dialog-controls"}>
            {this.props.children}
        </div>
    }
}