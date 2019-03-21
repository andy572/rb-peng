import * as React from 'react';
import {gql} from "apollo-boost";
import {ApolloConsumer, ChildDataProps, graphql} from "react-apollo";
import {RefObject} from "react";
import {DataProps} from "./PropDefs";

// UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import {ResultItem} from "./ResultItem";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {RadioGroup} from '@material-ui/core';
import {FormControlLabel} from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";

type ResultProps = DataProps & ChildDataProps;

class ResultPageComp extends React.Component<ResultProps> {
    selectionRef: RefObject<HTMLInputElement> = React.createRef();

    render() {
        const {loading, products} = this.props.data;

        if (loading) {
            return <Grid container direction={"row"} spacing={24} alignItems={"center"}>
                <Grid item>
                    <CircularProgress color="secondary" size={24} />
                </Grid>
                <Grid item>
                    <Typography>Loading...</Typography>
                </Grid>
            </Grid>
        }

        // TODO display error / products not found
        if (!products || products.length === 0) return null;

        return <ApolloConsumer>
            {client => (
                <Grid direction="column" container spacing={8}>
                    <Grid item>
                        <Grid container direction={"row"} spacing={8} alignItems={"center"}>
                            <Grid item>
                                <Checkbox color={"default"} inputRef={this.selectionRef} onChange={() => {return this.onSelectionChange(client)}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant={"caption"}>Alle auswählen</Typography>
                            </Grid>
                            <Grid item style={{flexGrow: 1}}>
                                <Grid container direction={"row"} alignItems={"center"}>
                                    <Grid item style={{flexGrow: 1}}/>
                                    <Grid item>
                                        <Typography variant={"caption"} style={{marginRight: 20}}>Größe:</Typography>
                                    </Grid>
                                    <Grid item>
                                        <RadioGroup row>
                                            <FormControlLabel
                                                value="small"
                                                labelPlacement={"end"}
                                                control={
                                                    <Radio color={"default"} checked={this.props.data.imageSize==1}/>
                                                }
                                                label={
                                                    <Typography variant={"caption"}>small</Typography>
                                                }
                                                onChange={() => {return this.onSizeChange(client, 1)}}
                                            />
                                            <FormControlLabel
                                                value="medium"
                                                labelPlacement={"end"}
                                                control={
                                                    <Radio color={"default"} checked={this.props.data.imageSize==2}/>
                                                }
                                                label={
                                                    <Typography align={"right"} variant={"caption"}>medium</Typography>
                                                }
                                                onChange={() => {return this.onSizeChange(client, 2)}}
                                            />
                                            <FormControlLabel
                                                value="big"
                                                labelPlacement={"end"}
                                                control={
                                                    <Radio color={"default"} checked={this.props.data.imageSize==3}/>
                                                }
                                                label={
                                                    <Typography variant={"caption"}>big</Typography>
                                                }
                                                onChange={() => {return this.onSizeChange(client, 3)}}
                                            />
                                        </RadioGroup>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {
                        products.map(item => {
                            return <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{item.displayName}</Typography>
                                        <Typography color={"textSecondary"} variant="subtitle2">Artikel-Nummer: {item.articleNumber}</Typography>
                                        <Grid container>
                                            {item.assets.map(asset => {
                                                return <ResultItem articleNumber={item.articleNumber} asset={asset}/>
                                            })}
                                        </Grid>
                                        <ExpansionPanel style={{border: 0,boxShadow: 'none', marginTop: 10}}>
                                            <ExpansionPanelSummary style={{marginBottom: 0, paddingBottom: 0}}>
                                                <Typography style={{marginBottom: 0, paddingBottom: 0}}>Produktbeschreibung</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <Typography variant={"caption"} dangerouslySetInnerHTML={{__html:item.longDescription}}/>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </CardContent>
                                </Card>
                            </Grid>
                        })
                    }
                </Grid>
            )}
        </ApolloConsumer>
    }

    async onSelectionChange(client) {
        const checked = this.selectionRef.current.checked;
        const result = await client.query({query: GET_PRODUCTS_QUERY});

        const updated_products = result.data.products.map((product => {
            product.assets = product.assets.map(asset => {
                asset.checked = checked;
                return asset;
            });

            return product;
        }));

        client.cache.writeData({data: {products: updated_products}});
        return true;
    }

    onSizeChange = (client, size) => {
        client.writeData({data: {imageSize: size}})
    }
}

const GET_PRODUCTS_QUERY = gql`
query ProductList {
    products @client {
        displayName, 
        articleNumber,
        catalogEntryId,
        longDescription,
        shortDescription,
        onlineStatus,
        rating,
        salesPrice,
        shipping,
        assets {
            doi,
            id,
            checked
        }
    },
    search @client,
    loading @client,
    error @client,
    imageSize @client
}
`;

export const ResultPage = graphql<any, ResultProps>(GET_PRODUCTS_QUERY)(ResultPageComp);
