import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import {DialogContent, DialogTitle, Grid, IconButton, Typography} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {gql} from "apollo-boost";
import {ApolloConsumer, ChildDataProps, graphql} from "react-apollo";
import {ImageDialogProps} from "./PropDefs";

class ImageDialogComponent extends React.Component<ImageDialogProps & ChildDataProps> {
    render() {
        console.log( 'dialog => ', (this.props.data.isProductDialogOpen ? 'true' : 'false') );
        return <ApolloConsumer>
            {client => (
                 <Dialog open={this.props.data.isProductDialogOpen} aria-labelledby="customized-dialog-title">
                    <DialogTitle id="customized-dialog-title">
                        <Grid container direction={"row"} alignItems={"center"}
                              style={{padding: 0, margin: 0, borderBottom: '1px solid #efefef'}}>
                            <Grid item alignContent={"stretch"} alignItems="stretch" style={{marginRight: 20}}>
                                <Typography variant={"subtitle1"} color={"default"}>Produktbild(er)</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton>
                                    <CloseIcon onClick={() => {return this.onClose(client)}}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        {this.renderAsset()}
                    </DialogContent>
                </Dialog>
            )}
        </ApolloConsumer>
    }

    renderAsset() {
        return <div style={{width: 300, height: 300,background: 'url(https://picscdn.redblue.de/doi/'+this.props.data.dialogImage+'/fee_325_225_png) no-repeat center/contain'}}/>
    }

    onClose = (client) => {
        client.writeData({data:{isProductDialogOpen: false, dialogImage: null}});
        return true;
    }
}

const GET_DIALOGOPEN_QUERY = gql`
query GET_DIALOGOPEN_QUERY {
    isProductDialogOpen @client,
    dialogImage @client
}
`;

export const ImageDialog = graphql<any, ImageDialogProps & ChildDataProps>(GET_DIALOGOPEN_QUERY)(ImageDialogComponent);
