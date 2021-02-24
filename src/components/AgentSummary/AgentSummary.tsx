import React, { useState, useEffect } from 'react';
import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import GroupSelect from './GroupSelect';
import { StatusCounts, Status } from './StatusCount';
import MDTable from './AgentTable';

import { useSelectedGroupContext, useZendeskContext } from '../../context';
import { useAppsettings } from '../../context/appContext';
import { User, Group, Zendesk } from '../../Types';

interface Props {
  zendeskContext?: Zendesk;
}

const AgentSummary = (props: Props) => {
  const users = useZendeskContext().allUsers;
  const groups = useZendeskContext().groups;
  const appSettings = useZendeskContext().appSettings;

  const [statusList, setStatusList] = useState<string[]>([
    'Phone',
    'Email',
    'Chat',
    'Lunch',
    'Break',
  ]);
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [formattedUsers, setFormattedUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [statusCounts, setStatusCounts] = useState<Status[]>([]);
  const selectedGroup = useSelectedGroupContext();

  useEffect(() => {
    if (
      appSettings &&
      appSettings.settings &&
      appSettings.settings.statusList
    ) {
      const defaultStatusList = appSettings.settings.statusList;
      const statusArray: string[] = defaultStatusList
        .split(',')
        .map((item: string) => item.trim());
      setStatusList(() => statusArray);
    }
  }, [appSettings]);

  useEffect(() => {
    if (groups) {
      setGroupList([...groups]);
    }
  }, [groups, selectedGroup]);

  useEffect(() => {
    formatUsers();
  }, [users]);

  useEffect(() => {
    filterUsers();
  }, [formattedUsers, selectedGroup]);

  useEffect(() => {
    getStatusCounts();
  }, [filteredUsers]);

  const formatUsers = async () => {
    const usersTemp: User[] = [];
    if (users) {
      for (const user of users) {
        let [status, last_update] = user.user_fields?.ccc_agent_status
          ? user.user_fields.ccc_agent_status.split('|')
          : ['Unknown', 'Unknown'];

        usersTemp.push({
          id: user.id,
          name: user.name,
          status: status,
          last_update: last_update,
          last_logon: user.last_login_at
            ? new Date(user.last_login_at.trim()).toUTCString()
            : 'Unknown',
        });
      }
    }
    setFormattedUsers([...usersTemp]);
  };

  const filterUsers = async () => {
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
    const statusArr: Status[] = [];
    const tempMap: any = {};
    if (filteredUsers) {
      for (const status of statusList) {
        tempMap[status] = 0;
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
        <Col>
          <MDTable data={filteredUsers}></MDTable>
        </Col>
      </Row>
    </Grid>
  );
};

export default AgentSummary;
