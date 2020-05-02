import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export interface Status {
  name: string;
  count: number;
}

interface Props {
  statusCounts: Status[];
}

const useStyles = makeStyles({
  statusBox: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '90px',
    padding: '.25rem .5rem',
  },
});

export function StatusCounts(props: Props) {
  const classes = useStyles();
  return (
    <Grid
      container
      justify='flex-end'
      alignContent='space-around'
      alignItems='center'
      spacing={2}
    >
      {props.statusCounts.map((statusCount) => (
        <Grid item key={statusCount.name + statusCount.count}>
          <Paper className={classes.statusBox} variant='outlined' square>
            <Box component='span'>{statusCount.name}:</Box>
            <Box component='span'>{statusCount.count}</Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
