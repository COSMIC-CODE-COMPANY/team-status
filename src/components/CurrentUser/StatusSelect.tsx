import React, { useState, useEffect } from 'react';
import { useAppsettingsContext } from '../../context';
import {
  Dropdown,
  Menu,
  Item,
  Trigger,
  Field,
  Label,
  Select,
  Hint,
} from '@zendeskgarden/react-dropdowns';
import { Button } from '@zendeskgarden/react-buttons';
interface Props {
  userID: number;
  selected?: string;
  updateStatus: any;
}

const StatusSelect = (props: Props) => {
  const appSettings = useAppsettingsContext();
  const [selectedStatus, setSelectedStatus] = useState(props.selected);
  const [statusList, setStatusList] = useState<string[]>([
    'Phone',
    'Email',
    'Chat',
    'Lunch',
    'Break',
  ]);

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
    statusArray.sort();
    setStatusList(() => statusArray);
  };

  const handleChange = (event: string) => {
    // const newStatus = event.target.value as string;
    setSelectedStatus(event);
    props.updateStatus(props.userID, event);
  };

  return (
    // <Dropdown onSelect={(status) => handleChange(status)}>
    //   <Trigger>
    //     <Button isPrimary>{selectedStatus}</Button>
    //   </Trigger>
    //   <Menu>
    //     {statusList.map((status, index) => (
    //       <Item value={status} key={status + index.toString()}>
    //         {status}
    //       </Item>
    //     ))}
    //   </Menu>
    // </Dropdown>

    <Dropdown
      selectedItem={selectedStatus}
      onSelect={(status) => handleChange(status)}
    >
      <Field>
        <Select>{selectedStatus}</Select>
      </Field>
      <Menu>
        {statusList.map((status, index) => (
          <Item value={status} key={status + index.toString()}>
            {status}
          </Item>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default StatusSelect;
