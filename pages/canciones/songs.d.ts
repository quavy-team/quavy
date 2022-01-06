interface Props {
  name: string;
  data: Data;
}

interface Data {
  band: string[];
  contents: Content[];
}

interface Content {
  title: string;
  role: string;
  strum: string;
  text: string;
}
