import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 600
    },
  
  }));

const Comment = () => {
    const classes = useStyles();

  return (
    <Card className={classes.root}>
    
      <CardHeader
        align="left"
        subheader="Savani, September 14, 2016"
        title="Great answer!"
      />
    </Card>
  );
}
export default Comment