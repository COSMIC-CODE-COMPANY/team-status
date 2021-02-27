import React, { useState, useEffect } from 'react';
import {
  Dropdown,
  Menu,
  Item,
  Field,
  Select,
} from '@zendeskgarden/react-dropdowns';
import { useZendeskContext } from '../../context';
import { useAppsettings } from '../../context';
interface Props {
  userID: number;
  selected?: string;
  updateStatus: any;
}

const StatusSelect = (props: Props) => {
  const zd = useZendeskContext();
  const appSettings = useAppsettings();
  const [selectedStatus, setSelectedStatus] = useState(props.selected);
  const [statusList, setStatusList] = useState<string[]>();

  useEffect(() => {
    setSelectedStatus(() => props.selected);
  }, [props.selected]);

  useEffect(() => {
    if (appSettings?.statusList) {
      setStatusList(appSettings.statusList);
    }
  }, [appSettings]);

  const handleChange = (event: string) => {
    setSelectedStatus(event);
    zd.update(event);
  };

  return (
    <Dropdown
      onSelect={(newStatus) => handleChange(newStatus)}
      selectedItem={selectedStatus}
    >
      <Field>
        <Select isCompact>{selectedStatus}</Select>
      </Field>
      <Menu placement='auto' hasArrow isCompact>
        {statusList &&
          statusList.map((status, index) => (
            <Item value={status} key={status + index.toString()}>
              {status}
            </Item>
          ))}
      </Menu>
    </Dropdown>
  );
};

export default StatusSelect;
