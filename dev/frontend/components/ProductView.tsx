import Grid from "@material-ui/core/Grid";
import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {AssetItemView} from "./AssetItemView";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {Product} from "./PropDefs";
import Typography from "@material-ui/core/Typography";

export class ProductView extends React.Component<{product:Product}> {
    render() {

        return <Grid item>
            <Card>
                <CardContent>
                    <Typography variant="h6">{this.props.product.displayName}</Typography>
                    <Typography color={"textSecondary"} variant="subtitle2">Artikel-Nummer: {this.props.product.articleNumber}</Typography>
                    <Grid container>
                        {this.props.product.assets.map(asset => {
                            return <AssetItemView articleNumber={this.props.product.articleNumber} asset={asset}/>
                        })}
                    </Grid>
                    <ExpansionPanel className={'expansionProductViewPanel'}>
                        <ExpansionPanelSummary className={"expansionProductViewSummary"}>
                            <Typography>Produktbeschreibung</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography variant={"caption"} dangerouslySetInnerHTML={{__html:this.props.product.longDescription}}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </CardContent>
            </Card>
        </Grid>
    }
}