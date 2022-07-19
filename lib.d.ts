export type PlayMode = "all" | "once" | "shuffle";

export interface Song {
  name: string;
  artist: string;
  src: string;
  image: string;
  lrc: string;
}

export type Playlist = Song[];
export type PlaylistMap = Record<T, Playlist>;

export interface PlayerConfig {
  title?: string;
  open?: boolean;
  color?: string;
  autoplay?: boolean;
  volume?: number;
  playmode?: PlayMode;
  playlist?: PlaylistMap;
  defaultPlayList?: string;
}

export class EaPlayer {
  constructor(config?: PlayerConfig);
}

export default EaPlayer;
