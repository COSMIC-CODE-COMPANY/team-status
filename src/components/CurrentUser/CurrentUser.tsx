import React, { useState, useContext, useEffect } from 'react';
import StatusSelect from './StatusSelect';
import { Typography, Grid, Box, Container } from '@material-ui/core';
import { CurrentUserContext } from "../../context";

const CurrentUser = () => {
  const user = useContext(CurrentUserContext);
  const [userStatus, setUserStatus] = useState('');

  useEffect(() => {
    if (user && user.user_fields && user.user_fields.ccc_agent_status) {
      const status = user.user_fields.ccc_agent_status.split('|').shift()?.trim()
      if (status) {
        setUserStatus(prevState => status)
      }
    }
  }, [user])

  return (
    <Box mb={5} mt={3}>
      <Container>
        <Grid container justify='space-between' alignItems='center' spacing={4}>
          <Grid item>
            <Typography variant='h4' component='h4'>
              My Status:
          </Typography>
          </Grid>
          <Grid item style={{ minWidth: 150 }}>
            {userStatus && <StatusSelect selected={userStatus} />}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CurrentUser;
