export type TChatMessageDetail = {
  text: string;
  created_at: Date;
  owner_id: string;
  owner_name: string;
};

export type TChatMessage = {
  owner_id: string;
  owner_name: string;
  messages: TChatMessageDetail[];
};
