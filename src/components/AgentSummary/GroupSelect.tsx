import React from 'react';
import {
  Dropdown,
  Menu,
  Item,
  Field,
  Select,
} from '@zendeskgarden/react-dropdowns';
import { useSelectedGroupContext } from '../../context';
import { Group } from '../../Types';
interface Props {
  selected?: string | number;
  filter: any;
  groups: Group[];
}
export interface State {
  groupList: { id: number; name: string }[];
}

const GroupSelect = (props: Props) => {
  const selectedGroup = useSelectedGroupContext();

  const handleChange = (event: string) => {
    selectedGroup.updateSelectedGroup(event);
    props.filter(event);
  };

  const addAllGroup = (groups: Group[]): Group[] => {
    const all: Group = {
      id: 0,
      url: '',
      name: 'All Groups',
      description: '',
      default: false,
      deleted: false,
      created_at: '',
      updated_at: '',
      user_ids: [],
    };
    return [all, ...groups];
  };

  return (
    <Dropdown
      selectedItem={selectedGroup.selectedGroup || 'All Groups'}
      onSelect={(value) => handleChange(value)}
    >
      <Field>
        <Select isCompact>{selectedGroup.selectedGroup || 'All Groups'}</Select>
      </Field>
      <Menu>
        {addAllGroup(props.groups).map((group) => (
          <Item value={group.name} key={group.id}>
            {group.name}
          </Item>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default GroupSelect;
