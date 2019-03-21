import Grid from "@material-ui/core/Grid/Grid";
import * as React from "react";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import {AssetItemView} from "./AssetItemView";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import {Product} from "./PropDefs";
import Typography from "@material-ui/core/Typography/Typography";

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
                    <ExpansionPanel style={{border: 0,boxShadow: 'none', marginTop: 10}}>
                        <ExpansionPanelSummary style={{marginBottom: 0, paddingBottom: 0}}>
                            <Typography style={{marginBottom: 0, paddingBottom: 0}}>Produktbeschreibung</Typography>
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