import React, { useState, useContext, useEffect } from 'react';
import StatusSelect from './StatusSelect';
// import { Typography, Grid, Box, Container } from '@material-ui/core';
import { CurrentUserContext } from '../../context';
import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import { XL } from '@zendeskgarden/react-typography';
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
    // <Box mb={5} mt={3}>
    //   <Container>
    //     <Grid container justify='space-between' alignItems='center' spacing={4}>
    //       <Grid item>
    //         <Typography variant='h5' component='h5'>
    //           My Status:
    //         </Typography>
    //       </Grid>
    //       <Grid item style={{ minWidth: 150 }}>
    //         {userStatus && (
    //           <StatusSelect
    //             selected={userStatus}
    //             userID={user?.id || 0}
    //             updateStatus={updateStatus}
    //           />
    //         )}
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </Box>
  );
};

export default CurrentUser;
