import React, { useState, useEffect } from 'react';
// import { Grid, Box, Container } from '@material-ui/core';
import GroupSelect from './GroupSelect';
import { StatusCounts, Status } from './StatusCount';
import MDTable from './AgentTable';
import { User, Group } from '../../Types';

import { Grid, Row, Col } from '@zendeskgarden/react-grid';

import {
  useAllUsersContext,
  useGroupsContext,
  useSelectedGroupContext,
} from '../../context';

import { statusListMock } from '../../mock/data';

const AgentSummary = () => {
  const users = useAllUsersContext();
  const groups = useGroupsContext();
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [formattedUsers, setFormattedUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [statusCounts, setStatusCounts] = useState<Status[]>([]);
  const selectedGroup = useSelectedGroupContext();
  useEffect(() => {
    // console.log('USE EFFECT TRIGGERED FOR: GROUPS', groups)
    if (groups) {
      setGroupList([...groups]);
    }
  }, [groups, selectedGroup]);

  useEffect(() => {
    // console.log('USE EFFECT TRIGGERED FOR: USERS', users)
    formatUsers();
  }, [users]);

  useEffect(() => {
    // console.log('USE EFFECT TRIGGERED FOR: FORMATTED USERS', formattedUsers)
    filterUsers();
  }, [formattedUsers, selectedGroup]);

  useEffect(() => {
    // console.log('USE EFFECT TRIGGERED FOR: FILTERED USERS', filteredUsers)
    getStatusCounts();
  }, [filteredUsers]);

  const formatUsers = async () => {
    // console.log('FORMATTING USERS', users)
    const usersTemp: User[] = [];
    if (users) {
      for (const user of users) {
        let [status, last_update] = user.user_fields.ccc_agent_status
          ? user.user_fields.ccc_agent_status.split('|')
          : ['Unknown', 'Unknown'];
        // last_update !== 'Unknown' && (last_update = new Date(last_update.trim()).toLocaleTimeString());
        if (last_update && last_update !== 'Unknown') {
          last_update = new Date(last_update.trim()).toLocaleTimeString();
        }

        usersTemp.push({
          id: user.id,
          name: user.name,
          status: status,
          last_update: last_update,
          last_logon: user.last_login_at
            ? new Date(user.last_login_at.trim()).toLocaleTimeString()
            : 'Unknown',
        });
      }
    }
    setFormattedUsers([...usersTemp]);
  };

  const filterUsers = async () => {
    // console.log('FILTERING USERS USERS', filteredUsers)
    let fUsers: User[] = [];
    if (formattedUsers) {
      const selectedGroupString = selectedGroup.selectedGroup;
      if (selectedGroupString === 'All Groups' || !selectedGroupString) {
        fUsers = [...formattedUsers];
      } else {
        const selectedGroup = groupList.find(
          (group) => group.name === selectedGroupString
        );
        if (selectedGroup?.user_ids) {
          for (const userID of selectedGroup.user_ids) {
            const user = formattedUsers.find((user) => user.id === userID);
            user && fUsers.push(user);
          }
        }
      }
    }
    setFilteredUsers((state) => [...fUsers]);
  };

  const getStatusCounts = async () => {
    // console.log('GETTING STATUS COUNTS', filteredUsers)
    const statusArr: Status[] = [];
    const tempMap: any = {};
    if (filteredUsers) {
      for (const status of statusListMock) {
        const name = status.name.trim();
        tempMap[name] = 0;
      }
      for (const user of filteredUsers) {
        const status = user.status?.trim() || 'Unknown';
        if (typeof tempMap[status] === 'number') {
          tempMap[status]++;
        } else {
          tempMap[status] = 1;
        }
      }
      Object.entries(tempMap).forEach(([key, value]) => {
        statusArr.push({ name: key, count: value as number });
      });
    }
    setStatusCounts([...statusArr]);
  };

  return (
    <Grid>
      <Row className='u-mv-sm'>
        <Col sm={3}>
          <GroupSelect groups={groupList} filter={filterUsers} />
        </Col>
        <Col sm={9}>
          <StatusCounts statusCounts={statusCounts} />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <MDTable data={filteredUsers}></MDTable>
        </Col>
      </Row>
    </Grid>
    // <div>
    //   {/* <Box>
    //     <Box mb={5}>
    //       <Container>
    //         <Grid container justify='space-between' wrap='nowrap' spacing={5}>
    //           <Grid item>
    //             <GroupSelect groups={groupList} filter={filterUsers} />
    //           </Grid>
    //           <Grid item>
    //             <StatusCounts statusCounts={statusCounts} />
    //           </Grid>
    //         </Grid>
    //       </Container>
    //     </Box>
    //     <Box flexGrow={1}>
    //       <Box>
    //         <MDTable data={filteredUsers}></MDTable>
    //       </Box>
    //     </Box>
    //   </Box> */}
    // </div>
  );
};

export default AgentSummary;
