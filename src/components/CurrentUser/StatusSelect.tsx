import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useAppsettingsContext } from '../../context';

interface Props {
  userID: number;
  selected?: string;
  updateStatus: any;
}

const StatusSelect = (props: Props) => {
  const appSettings = useAppsettingsContext();
  const [selectedStatus, setSelectedStatus] = useState(props.selected);
  const [statusList, setStatusList] = useState<string[]>(['chat', 'email']);

  useEffect(() => {
    if (
      appSettings &&
      appSettings.settings &&
      appSettings.settings.statusList
    ) {
      setDefaultValues();
    }
  }, [appSettings]);

  const setDefaultValues = () => {
    const defaultStatusList = appSettings.settings.statusList;
    const statusArray: string[] = defaultStatusList
      .split(',')
      .map((item: string) => item.trim());
    if (
      props.selected &&
      !statusArray.some((status) => status === props.selected)
    ) {
      statusArray.push(props.selected);
    }
    setStatusList(() => statusArray);
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
        {statusList.map((status, index) => (
          <MenuItem value={status} key={status + index.toString()}>
            {status}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StatusSelect;
