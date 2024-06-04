export interface FetchPhotosConfig {
  photos: {
    photo_id: number;
    file_name: string;
    width: number;
    height: number;
    description: string;
    blurred: string;
    localization: string;
    position: number;
    tags?: string[];
  }[];
}

export interface PhotoConfig {
  photo_id: number;
  file_name: string;
  width: number;
  height: number;
  description: string;
  blurred: string;
  localization: string;
  position: number;
  tags?: string[];
}
