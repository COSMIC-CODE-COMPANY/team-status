import React, { useState, useEffect } from 'react';
import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import { Tag } from '@zendeskgarden/react-tags';
import { useAppsettings } from '../../context';
export interface Status {
  name: string;
  count: number;
}
interface Props {
  statusCounts: Status[];
}

export function StatusCounts(props: Props) {
  const [sortedList, setSortedList] = useState<Status[]>([]);
  const settings = useAppsettings();

  useEffect(() => {
    const temp = props.statusCounts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setSortedList(() => temp);
  }, [props.statusCounts]);

  return (
    <Grid gutters={'xxs'}>
      <Row wrap='wrap' justifyContent={'start'}>
        {sortedList.map((statusCount) => (
          <Col key={statusCount.name + statusCount.count} sm={3}>
            <Tag
              hue={
                statusCount.name === 'Offline' || statusCount.name === 'Unknown'
                  ? 'grey'
                  : statusCount.count
                  ? settings?.color
                  : 'grey'
              }
              size='large'
              className='u-2/2 u-mb-xxs'
            >
              <Row wrap='nowrap'>
                <Col>
                  {statusCount.name.length > 15
                    ? `${statusCount.name.substring(0, 10)}...`
                    : statusCount.name}
                </Col>
                <Col className='u-ta-right'>{statusCount.count}</Col>
              </Row>
            </Tag>
          </Col>
        ))}
      </Row>
    </Grid>
  );
}
