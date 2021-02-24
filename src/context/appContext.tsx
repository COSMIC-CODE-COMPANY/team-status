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
}
interface Props {
  children: ReactNode;
}

export const AppSettingsContext = createContext<IAppSettings | null>(null);

export const AppSettingsProvider = ({ children }: Props) => {
  const [color, setColor] = useState('blue');
  const zendeskSettings = useZendeskContext().appSettings;

  const changeActiveColor = (newColor: string): void => {
    console.log(zendeskSettings);
    if (colors.includes(newColor.toLowerCase())) {
      console.log(`the color is ${newColor}`);
      setColor(() => newColor);
    } else {
      setColor(() => 'blue');
    }
  };

  useEffect(() => {
    console.log(zendeskSettings);
    if (zendeskSettings?.settings?.Active_Color) {
      const newColor = zendeskSettings.settings.Active_Color;
      if (colors.includes(newColor)) {
        console.log(`the color is ${newColor}`);
        setColor(() => newColor);
      } else {
        setColor(() => 'blue');
      }
    }
  }, [zendeskSettings]);

  return (
    <AppSettingsContext.Provider
      value={{ color: color, setColor: changeActiveColor }}
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
