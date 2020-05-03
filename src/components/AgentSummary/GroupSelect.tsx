import React from 'react';
import { Group } from '../../Types';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import { useSelectedGroupContext } from '../../context';
import { Button } from '@zendeskgarden/react-buttons';
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
  const selectedGroup = useSelectedGroupContext();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // console.log(event);
    // const value = event.target.value as string;
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
    // <form>
    //   <Field>
    //     <Dropdown onSelect={(value) => handleChange(value)}>
    //       <Trigger>
    //         <Button>{selectedGroup.selectedGroup || 'All Groups'}</Button>
    //       </Trigger>
    //       <Menu>
    //         {addAllGroup(props.groups).map((group) => (
    //           <Item value={group.name} key={group.id}>
    //             {group.name}
    //           </Item>
    //         ))}
    //       </Menu>
    //     </Dropdown>
    //   </Field>
    // </form>

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

    // <div>

    //   {/* <FormControl fullWidth size='small'>
    //     <Select
    //       value={selectedGroup.selectedGroup || 'All Groups'}
    //       onChange={handleChange}
    //     >
    //       {addAllGroup(props.groups).map((group) => (
    //         <MenuItem value={group.name} key={group.id}>
    //           {group.name}
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl> */}
    // </div>
  );
};

export default GroupSelect;
