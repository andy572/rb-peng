import * as React from "react";
import {graphql, ChildDataProps} from "react-apollo";
import gql from "graphql-tag";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

type SearchProps = {
    data: {
        search: string[]
    }
} & ChildDataProps;

class SearchHistoryComponent extends React.Component<SearchProps> {
    render() {
        return <Grid container direction={"column"}>
            <Grid item>
                <Typography variant={"caption"} color={"default"}>Verlauf</Typography>
            </Grid>
            {this.props.data.search.map(value => {
                return <Grid item>
                    <Typography variant={"subtitle1"}>{value}</Typography>
                </Grid>
            })}
        </Grid>;
    }
}

const GET_SEARCH_VALUES = gql`
    query GET_SEARCH_VALUES {
        search @client
    }
`;

export const SearchHistory = graphql<any, SearchProps>(GET_SEARCH_VALUES)(SearchHistoryComponent);