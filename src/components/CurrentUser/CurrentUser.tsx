import React, { useState, useContext, useEffect } from 'react';
import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import { XL, LG } from '@zendeskgarden/react-typography';
import StatusSelect from './StatusSelect';

import { useZendeskContext } from '../../context';

import * as Types from '../../Types';
interface Props {
  updateStatus?: any;
  zendeskContext?: Types.Zendesk;
}

const CurrentUser = (props: Props) => {
  // const user = useContext(CurrentUserContext);
  const user = useZendeskContext().currentUser;
  // const user = props.zendeskContext.currentUser;
  const [userStatus, setUserStatus] = useState('');

  useEffect(() => {
    if (user && user.user_fields && user.user_fields.ccc_agent_status) {
      const status = user.user_fields.ccc_agent_status
        .split('|')
        .shift()
        ?.trim();
      if (status) {
        console.log('Updating user status', user, status);
        setUserStatus((prevState) => status);
      }
    }
  }, [user]);

  return (
    <Grid>
      <Row alignItems='center' justifyContent='start'>
        <Col sm={2}>
          <LG>My Status:</LG>
        </Col>
        <Col sm={3}>
          {userStatus && (
            <StatusSelect
              selected={userStatus}
              userID={user?.id || 0}
              updateStatus={props.updateStatus}
            />
          )}
        </Col>
        <Col sm={6}></Col>
      </Row>
    </Grid>
  );
};

export default CurrentUser;
