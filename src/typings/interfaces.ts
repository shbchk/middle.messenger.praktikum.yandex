export interface ISignupData {
  [key: string]: string;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ISigninData {
  [key: string]: string;
  login: string;
  password: string;
}

export interface IUser {
  [key: string]: string | number | null;
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export interface IMsg {
  content: string;
  type: string;
  time: string;
  user_id: number;
  id: number;
  chat_id?: number;
  is_read?: boolean;
  file?: string | null;
}

export interface IChat {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    } | null;
    time: string;
    content: string;
  };
}

export interface IState {
  user?: {
    data?: IUser;
    hasError?: boolean;
    errorReason?: string | null;
  };
  chat: {
    messages: IMsg[];
    currentChatToken?: string;
    currentChatId?: number;
    currentChatCreatedBy?: number;
    users: IUser[];
    api?: any;
  };
  chats: {
    data: IChat[];
  };
  addUsers?: {
    found: IUser[];
    usersToAdd: IUser[];
    hasError?: boolean;
  };
}
