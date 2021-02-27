import React, { useState, useEffect } from 'react';
import {
  Table,
  Head,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@zendeskgarden/react-tables';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { TableSelect } from './TableSelect';
import { useDateHelper } from '../../hooks';
import { User } from '../../Types';
import { useAppsettings } from '../../context';
interface Props {
  data: User[];
}

const AgentTable = (props: Props) => {
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);
  const isAdmin = useAppsettings()?.isAdmin;

  useEffect(() => {
    const temp = props.data.sort((a, b) => a.name.localeCompare(b.name));
    setSortedUsers(() => temp);
  }, [props.data]);

  return (
    <div className='table-wrapper'>
      <Table size='medium'>
        <Head>
          <HeaderRow>
            <HeaderCell width='175'>Agent</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell width='175'>Last Status Update</HeaderCell>
            <HeaderCell width='175'>Last Zendesk Logon</HeaderCell>
          </HeaderRow>
        </Head>
        <Body>
          {sortedUsers.map((data) => (
            <Row key={data.id}>
              <Cell>{data.name}</Cell>
              {isAdmin ? (
                <Cell>
                  <TableSelect status={data.status} userid={data.id} />
                </Cell>
              ) : (
                <Cell>
                  {data.status && data.status.length > 15
                    ? `${data.status.substring(0, 15)}...`
                    : data.status}
                </Cell>
              )}
              <Cell className='cursor-default'>
                <Tooltip
                  hasArrow
                  type='light'
                  content={
                    data.last_update
                      ? useDateHelper().getLocalDateString(data.last_update)
                      : 'Unknown'
                  }
                >
                  <span>
                    {data.last_update
                      ? useDateHelper().getMinutesSince(data.last_update)
                      : 'Unknown'}
                  </span>
                </Tooltip>
              </Cell>
              <Cell className='cursor-default'>
                <Tooltip
                  hasArrow
                  type='light'
                  content={
                    data.last_logon
                      ? useDateHelper().getLocalDateString(data.last_logon)
                      : 'Unknown'
                  }
                >
                  <span>
                    {data.last_logon
                      ? useDateHelper().getMinutesSince(data.last_logon)
                      : 'Unknown'}
                  </span>
                </Tooltip>
              </Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </div>
  );
};

export default AgentTable;
