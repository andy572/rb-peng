import * as React from "react";
import {ResultSelectionView} from "./ResultSelectionView";
import {FlexContainer} from "./core/FlexContainer";
import {Typography} from "./core/Typography";

type AssetToolboxProps = {
    client: any
}

export class AssetToolbox extends React.Component<AssetToolboxProps> {
    render() {
        return <FlexContainer direction={"column"} className={"rb-page-content rb-right-panel"}>
            <Typography variant={"h2"}>Asset-Aktionen</Typography>
            <ResultSelectionView client={this.props.client}/>
        </FlexContainer>
    }
}