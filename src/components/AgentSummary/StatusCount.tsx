import React, { useState, useEffect } from 'react';
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
  const [sortedList, setSortedList] = useState<Status[]>([]);

  useEffect(() => {
    const temp = props.statusCounts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedList(() => temp);
  }, [props.statusCounts]);

  const sorter = () => {};

  return (
    <Grid gutters='xxs'>
      <Row wrap='wrap' className='u-display-flex'>
        {sortedList.map((statusCount) => (
          <Col key={statusCount.name + statusCount.count} sm={3}>
            <Tag
              hue={statusCount.count ? 'kale' : 'grey'}
              size='large'
              className='u-2/2 u-mb-xxs'
            >
              <div>{statusCount.name}</div>
              <div className='u-ta-right'>{statusCount.count}</div>
            </Tag>
          </Col>
        ))}
      </Row>
    </Grid>
  );
}
