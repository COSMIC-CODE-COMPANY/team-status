import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import { User } from '../../Types';

import {
  Table,
  Caption,
  Head,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@zendeskgarden/react-tables';

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
//   container: {
//     // height: 214,
//   },
// });

interface Props {
  data: User[];
}

const AgentTable = (props: Props) => {
  // const classes = useStyles();
  return (
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
    // <Paper className={classes.root}>
    //   <TableContainer className={classes.container}>
    //     <Table stickyHeader aria-label='Agents Table' size='small'>
    //       <TableHead>
    //         <TableRow>
    //           <TableCell>Name</TableCell>
    //           <TableCell>Status</TableCell>
    //           <TableCell>Last Update</TableCell>
    //           <TableCell>Last Logon</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {props.data.map((data) => (
    //           <TableRow key={data.id} hover>
    //             <TableCell>{data.name}</TableCell>
    //             <TableCell>{data.status}</TableCell>
    //             <TableCell>{data.last_update}</TableCell>
    //             <TableCell>{data.last_logon}</TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </Paper>
  );
};

export default AgentTable;
