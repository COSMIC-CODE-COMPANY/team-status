export interface Group {
  url: string;
  id: number;
  name: string;
  description: string;
  default: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;
  user_ids: number[];
}

export interface User {
  id: number;
  name: string;
  status?: string;
  last_update?: Date | string | null;
  last_logon?: Date | string | null;
  user_fields?: {
    ccc_agent_status?: string;
  }
}

export type ThemeType = 'light' | 'dark' | undefined;
export interface ThemeState {
  type: ThemeType;
}
