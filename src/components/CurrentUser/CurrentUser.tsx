import React, { useState, useContext, useEffect } from 'react';
import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import { XL } from '@zendeskgarden/react-typography';
import StatusSelect from './StatusSelect';
import { CurrentUserContext } from '../../context';

interface Props {
  updateStatus: any;
}

const CurrentUser = ({ updateStatus }: Props) => {
  const user = useContext(CurrentUserContext);
  const [userStatus, setUserStatus] = useState('');

  useEffect(() => {
    if (user && user.user_fields && user.user_fields.ccc_agent_status) {
      const status = user.user_fields.ccc_agent_status
        .split('|')
        .shift()
        ?.trim();
      if (status) {
        setUserStatus((prevState) => status);
      }
    }
  }, [user]);

  return (
    <Grid>
      <Row alignItems='center' justifyContent='between'>
        <Col sm={4}>
          <XL>My Status:</XL>
        </Col>
        {userStatus && (
          <StatusSelect
            selected={userStatus}
            userID={user?.id || 0}
            updateStatus={updateStatus}
          />
        )}
      </Row>
    </Grid>
  );
};

export default CurrentUser;
