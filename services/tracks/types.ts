export type UiTrack = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  duration: number;
  plays: number;
  genre: string;
};

export type UiPlaylist = {
  id: string;
  title: string;
  cover: string;
  tracksCount: number;
  likes: number;
  genre: string;
};

export type UiUser = {
  id: string;
  handle: string;
  avatar: string;
  name: string;
  followers: number;
  following: number;
};

export interface AudiusTrack {
  id: string;
  artist: string;
  cover: string;
  title: string;
  description: string;
  user: {
    name: string;
  };
  artwork: {
    "480x480": string;
  };
}

export interface AudiusPlaylist {
  id: string;
  name: string;
  artwork: {
    "480x480"?: string;
    "150x150"?: string;
  };
}