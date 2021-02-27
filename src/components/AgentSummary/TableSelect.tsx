import React, { useEffect, useState } from 'react';
import {
  Dropdown,
  Menu,
  Item,
  Field,
  Select,
} from '@zendeskgarden/react-dropdowns';
import { useAppsettings } from '../../context';
import { useZendeskContext } from '../../context';

interface Props {
  userid?: number;
  status?: string;
}

export const TableSelect = ({ userid, status }: Props) => {
  const appSettings = useAppsettings();
  const zendesk = useZendeskContext();
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    if (status) {
      setCurrentStatus(() => status);
    }
  }, [status]);

  const handleChange = (val: string) => {
    setCurrentStatus(() => val);
    zendesk.update(val, userid);
  };

  return (
    <Dropdown
      selectedItem={currentStatus}
      onSelect={(val) => handleChange(val)}
      // downshiftProps={{ itemToString: (item: IItem) => item && item.label }}
    >
      <Field>
        <Select isCompact>{currentStatus}</Select>
      </Field>
      <Menu isCompact>
        {appSettings?.statusList.map((option) => (
          <Item key={option} value={option}>
            {option}
          </Item>
        ))}
      </Menu>
    </Dropdown>

    // <Dropdown onSelect={(status) => handleChange(status)}>
    //   <Trigger>
    //     <Button size='small' isStretched>
    //       {status || 'Unknown'}
    //     </Button>
    //   </Trigger>
    //   <Menu placement='auto' hasArrow>
    //     {appSettings &&
    //       appSettings.statusList.map((status, index) => (
    //         <Item value={status} key={status + index.toString()}>
    //           {status}
    //         </Item>
    //       ))}
    //   </Menu>
    // </Dropdown>
  );
};
