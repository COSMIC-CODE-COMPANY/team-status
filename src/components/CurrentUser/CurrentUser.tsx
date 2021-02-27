import React, { useState, useEffect } from 'react';
import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import { LG } from '@zendeskgarden/react-typography';
import { Skeleton } from '@zendeskgarden/react-loaders';
import StatusSelect from './StatusSelect';

import { useZendeskContext } from '../../context';

import * as Types from '../../Types';
interface Props {
  updateStatus?: any;
  zendeskContext?: Types.Zendesk;
}

const CurrentUser = (props: Props) => {
  const user = useZendeskContext().currentUser;
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState('');

  useEffect(() => {
    if (user) {
      const status =
        user?.user_fields?.ccc_agent_status?.split('|').shift()?.trim() ||
        'Unknown';
      setUserStatus(status);
      setLoading(() => false);
    }
  }, [user]);

  return (
    <Grid className='current-user'>
      <Row alignItems='center' justifyContent='start'>
        <Col sm={2}>
          <LG>My Status:</LG>
        </Col>
        {loading && <Skeleton width={'150px'} height={'25px'} />}
        {!loading && (
          <Col sm={3}>
            {userStatus && (
              <StatusSelect
                selected={userStatus}
                userID={user?.id || 0}
                updateStatus={props.updateStatus}
              />
            )}
          </Col>
        )}
        <Col sm={6}></Col>
      </Row>
    </Grid>
  );
};

export default CurrentUser;
