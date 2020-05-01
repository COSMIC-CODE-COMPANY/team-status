import React, { useState, useContext } from 'react';
import { Group } from '../../Types';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelectedGroupContext } from '../../context';

interface Props {
  selected?: string | number;
  filter: any;
  groups: Group[];
}

export interface State {
  groupList: { id: number; name: string }[];
}

function getGroupNames(groups: Group[]): { id: number; name: string }[] {
  const gs: { id: number; name: string }[] = [];
  gs.push({ id: 123455819, name: 'All Groups' });
  groups.map((group) => {
    gs.push({ id: group.id, name: group.name });
  });
  return gs;
}

const GroupSelect = (props: Props) => {
  const [selectedGroup, updateSelectedGroup] = useState('All Groups');

  const selected = useSelectedGroupContext();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    console.log(selected);
    selected.updateSelectedGroup(value);
    console.log(selected);
    console.log('hello');
    // updateSelectedGroup(value);
    props.filter(value);
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
    <FormControl fullWidth size='small'>
      <Select
        value={selected.selectedGroup || 'All Groups'}
        onChange={handleChange}
      >
        {addAllGroup(props.groups).map((group) => (
          <MenuItem value={group.name} key={group.id}>
            {group.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GroupSelect;
