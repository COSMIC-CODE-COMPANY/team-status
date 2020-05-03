import React from 'react';
import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import { Tag } from '@zendeskgarden/react-tags';
export interface Status {
  name: string;
  count: number;
}
interface Props {
  statusCounts: Status[];
}

export function StatusCounts(props: Props) {
  return (
    <Grid gutters='xxs'>
      <Row wrap='wrap' className='u-display-flex'>
        {props.statusCounts.map((statusCount) => (
          <Col key={statusCount.name + statusCount.count} sm={3}>
            <Tag hue='kale' size='large' className='u-2/2 u-mb-xxs'>
              <div>{statusCount.name}</div>
              <div className='u-ta-right'>{statusCount.count}</div>
            </Tag>
          </Col>
        ))}
      </Row>
    </Grid>
  );
}
