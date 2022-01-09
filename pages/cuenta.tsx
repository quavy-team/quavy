import * as next from "@nextui-org/react";
import Layout from "src/layout";

var string = "primary";
var number = 15000;
var fn = (pmeter) => pmeter;
JSON.parse(string);
fn(number);

export default function Cuenta(props) {
  const something = {
    name: "joaquin",
    age: 17,
    dev: true,
  };
  console.log(something, props.something);
  var string = "primary";
  JSON.parse(string);
  return (
    <Layout>
      <next.Text h1 color={string}>
        Quavy Cuenta
      </next.Text>
    </Layout>
  );
}
