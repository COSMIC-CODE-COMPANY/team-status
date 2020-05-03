import React from 'react';
import { User } from '../../Types';

import {
  Table,
  Head,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@zendeskgarden/react-tables';

interface Props {
  data: User[];
}

const AgentTable = (props: Props) => {
  return (
    <div className='table-wrapper'>
      <Table size='small'>
        <Head>
          <HeaderRow>
            <HeaderCell width='200'>Agent</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell>Last Update</HeaderCell>
            <HeaderCell>Last Logon</HeaderCell>
          </HeaderRow>
        </Head>
        <Body>
          {props.data.map((data) => (
            <Row key={data.id}>
              <Cell>{data.name}</Cell>
              <Cell>{data.status}</Cell>
              <Cell>{data.last_update}</Cell>
              <Cell>{data.last_logon}</Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </div>
  );
};

export default AgentTable;
