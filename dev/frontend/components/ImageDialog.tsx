import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import {DialogContent, DialogTitle, Grid, IconButton, Typography} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {gql} from "apollo-boost";
import {ApolloConsumer, ChildDataProps, graphql} from "react-apollo";
import {ImageDialogProps} from "./PropDefs";

class ImageDialogComponent extends React.Component<ImageDialogProps & ChildDataProps> {
    render() {
        return <ApolloConsumer>
            {client => (
                 <Dialog open={this.props.data.isProductDialogOpen} aria-labelledby="customized-dialog-title">
                    <DialogTitle id="customized-dialog-title" style={{padding:10,backgroundColor:'#f2f2f2',borderBottom: '1px solid #e0e0e0'}}>
                        <Grid container direction={"row"} alignItems={"center"}
                              style={{padding: 0, margin: 0}}>
                            <Grid item style={{flexGrow:1, marginLeft: 15}}>
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
        let imageSizeString;
        let boxSize = {width: 0, height: 0};
        switch (this.props.data.imageSize) {
            case 1:
                imageSizeString = 'fee_194_131_png';
                boxSize = {width: 200, height: 200};
                break;

            case 2:
                imageSizeString = 'fee_325_225_png';
                boxSize = {width: 350, height: 350};
                break;

            case 3:
                imageSizeString = 'fee_786_587_png';
                boxSize = {width: 800, height: 800};
                break;
        }
        return <div style={{width: boxSize.width, height: boxSize.height,background: 'url(https://picscdn.redblue.de/doi/'+this.props.data.dialogImage+'/'+imageSizeString+') no-repeat center/contain'}}/>
    }

    onClose = (client) => {
        client.writeData({data:{isProductDialogOpen: false, dialogImage: null}});
        return true;
    }
}

const GET_DIALOGOPEN_QUERY = gql`
query GET_DIALOGOPEN_QUERY {
    isProductDialogOpen @client,
    dialogImage @client,
    imageSize @client
}
`;

export const ImageDialog = graphql<any, ImageDialogProps & ChildDataProps>(GET_DIALOGOPEN_QUERY)(ImageDialogComponent);