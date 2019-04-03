import Grid from "@material-ui/core/Grid";
import {Typography} from "./core/Typography";
import * as React from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {ClientProp} from "./PropDefs";
import Radio from "@material-ui/core/Radio";

export class ResultSizeSelectionView extends React.Component<ClientProp & {imageSize: number}> {
    render() {
        return <React.Fragment>
            <Grid item>
                <Typography variant={"caption"} style={{marginRight: 20}}>Größe:</Typography>
            </Grid>
            <Grid item>
                <RadioGroup row>
                    <FormControlLabel
                        value="small"
                        labelPlacement={"end"}
                        control={
                            <Radio color={"default"} checked={this.props.imageSize==1}/>
                        }
                        label={
                            <Typography variant={"caption"}>small</Typography>
                        }
                        onChange={() => {return this.onSizeChange(1)}}
                    />
                    <FormControlLabel
                        value="medium"
                        labelPlacement={"end"}
                        control={
                            <Radio color={"default"} checked={this.props.imageSize==2}/>
                        }
                        label={
                            <Typography align={"right"} variant={"caption"}>medium</Typography>
                        }
                        onChange={() => {return this.onSizeChange(2)}}
                    />
                    <FormControlLabel
                        value="big"
                        labelPlacement={"end"}
                        control={
                            <Radio color={"default"} checked={this.props.imageSize==3}/>
                        }
                        label={
                            <Typography variant={"caption"}>big</Typography>
                        }
                        onChange={() => {return this.onSizeChange(3)}}
                    />
                </RadioGroup>
            </Grid>
        </React.Fragment>
    }

    onSizeChange = (size) => {
        this.props.client.writeData({data: {imageSize: size}})
    }
}