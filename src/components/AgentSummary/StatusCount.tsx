import React from 'react';
// import Paper from '@material-ui/core/Paper';
// import { Box, Grid } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import { Tag } from '@zendeskgarden/react-tags';
export interface Status {
  name: string;
  count: number;
}

interface Props {
  statusCounts: Status[];
}

// const useStyles = makeStyles({
//   statusBox: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     minWidth: '90px',
//     padding: '.25rem .5rem',
//   },
// });

const mystyle = {
  display: 'flex',
  justifyContent: 'space-between',
  // minWidth: '90px',
  padding: '.25rem .5rem',
  marginBottom: '4px',
};

export function StatusCounts(props: Props) {
  return (
    <Grid gutters='xxs'>
      <Row wrap='wrap' className='u-display-flex'>
        {props.statusCounts.map((statusCount) => (
          <Col key={statusCount.name + statusCount.count} sm={3}>
            <Tag size='large' className='u-2/2 u-mb-xxs'>
              <div>{statusCount.name}</div>
              <div className='u-ta-right'>{statusCount.count}</div>
            </Tag>
          </Col>
        ))}
      </Row>
    </Grid>
  );
}
