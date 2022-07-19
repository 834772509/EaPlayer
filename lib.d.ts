export declare type PlayMode = "all" | "once" | "shuffle";

export declare interface Song {
  name: string;
  artist: string;
  src: string;
  image: string;
  lrc: string;
}

export declare type Playlist = Song[];
export declare type PlaylistMap = Record<T, Playlist>;

export declare interface PlayerConfig {
  title?: string;
  open?: boolean;
  color?: string;
  autoplay?: boolean;
  volume?: number;
  playmode?: PlayMode;
  playlist?: PlaylistMap;
  defaultPlayList?: string;
}

export declare class EaPlayer {
  constructor(config?: PlayMode);
}

export default EaPlayer;
