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
  last_update?: string | null;
  last_logon?: string | null;
  user_fields?: {
    ccc_agent_status?: string;
  };
}

export interface Zendesk {
  appSettings: any | null;
  currentUser: User | null;
  groups: Group[] | null;
  allUsers: any | null;
  update: any | null;
}
