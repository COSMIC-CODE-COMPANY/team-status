import React, { useState, useEffect } from 'react';
import { Button } from '@zendeskgarden/react-buttons';
import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';
import { useZendeskContext } from '../../context';
interface Props {
  userID: number;
  selected?: string;
  updateStatus: any;
}

const StatusSelect = (props: Props) => {
  const zd = useZendeskContext();
  const appSettings = useZendeskContext().appSettings;
  const [selectedStatus, setSelectedStatus] = useState(props.selected);
  const [statusList, setStatusList] = useState<string[]>([
    'Phone',
    'Email',
    'Chat',
    'Lunch',
    'Break',
  ]);

  useEffect(() => {
    if (props.selected) {
      setSelectedStatus(() => props.selected);
    }
  }, [props]);

  useEffect(() => {
    if (
      appSettings &&
      appSettings.settings &&
      appSettings.settings.statusList
    ) {
      console.log('Updating user value', props);
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
    console.log('CAPTURED STATUS CHANGE', event);
    setSelectedStatus(event);
    zd.update(event);
  };

  return (
    <Dropdown onSelect={(status) => handleChange(status)}>
      <Trigger>
        <Button size='medium' isStretched>
          {selectedStatus}
        </Button>
      </Trigger>
      <Menu placement='auto' hasArrow>
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
