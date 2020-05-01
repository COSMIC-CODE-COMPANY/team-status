import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { statusListMock } from '../../mock/data';

interface Props {
  userID: number;
  selected?: string;
  updateStatus: any;
}

const StatusSelect = (props: Props) => {
  const [selectedStatus, setSelectedStatus] = useState(props.selected);

  const statusList = (): { id: number; name: string }[] => {
    const statusList = statusListMock;
    const inList = statusList.some((status) => status.name === props.selected);
    if (!inList && props.selected) {
      statusList.push({ id: 1234567891, name: props.selected });
    }
    return statusList;
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newStatus = event.target.value as string;
    setSelectedStatus(newStatus);
    props.updateStatus(props.userID, newStatus);
  };

  return (
    <FormControl color='primary' fullWidth>
      <Select
        value={selectedStatus}
        onChange={handleChange}
        autoWidth
        variant='outlined'
      >
        {statusList().map((status) => (
          <MenuItem value={status.name} key={status.id}>
            {status.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatusSelect;
