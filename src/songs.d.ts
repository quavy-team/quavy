export interface Props {
  name: string;
  data: Data;
}

export interface Data {
  band: string[];
  contents: Content[];
}

export interface Content {
  title: string;
  role: string;
  strum: string;
  text: string;
}
