import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { useZendeskContext } from './ZDContext';
interface IAppSettings {
  color: string;
  setColor: (color: string) => void;
  isAdmin: boolean;
  statusList: string[];
}
interface Props {
  children: ReactNode;
}

const defaultList = ['Phone', 'Email', 'Chat', 'Lunch', 'Break', 'Offline'];

export const AppSettingsContext = createContext<IAppSettings | null>(null);

export const AppSettingsProvider = ({ children }: Props) => {
  const [color, setColor] = useState('blue');
  const [isAdmin, setIsAdmin] = useState(false);
  const [statusList, setStatusList] = useState(defaultList);
  const zendeskSettings = useZendeskContext().appSettings;
  const currentUser = useZendeskContext().currentUser;

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      setIsAdmin(() => true);
    } else {
      setIsAdmin(() => false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (zendeskSettings?.settings?.Active_Color) {
      const newColor = zendeskSettings.settings.Active_Color;
      if (colors.includes(newColor)) {
        setColor(() => newColor);
      } else {
        setColor(() => 'blue');
      }
    }
    if (zendeskSettings?.settings?.Status_List) {
      setList();
    }
  }, [zendeskSettings]);

  const changeActiveColor = (newColor: string): void => {
    if (colors.includes(newColor.toLowerCase())) {
      console.log(`the color is ${newColor}`);
      setColor(() => newColor);
    } else {
      setColor(() => 'blue');
    }
  };

  const setList = () => {
    const defaultStatusList = zendeskSettings.settings.Status_List;
    const statusArray: string[] = defaultStatusList
      .split(',')
      .map((item: string) => item.trim());
    // if (
    //   props.selected &&
    //   !statusArray.some((status) => status === props.selected)
    // ) {
    //   statusArray.push(props.selected);
    // }
    statusArray.sort();
    setStatusList(() => statusArray);
  };

  return (
    <AppSettingsContext.Provider
      value={{ color: color, setColor: changeActiveColor, isAdmin, statusList }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppsettings = () => useContext(AppSettingsContext);

const colors = [
  'grey',
  'blue',
  'kale',
  'red',
  'green',
  'yellow',
  'fuschia',
  'pink',
  'crimson',
  'lemon',
  'lime',
  'mint',
  'teal',
  'azure',
  'royal',
  'purple',
];
