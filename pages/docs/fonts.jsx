import { Col, Container, Row, Text } from "@nextui-org/react"

export default function Fonts() {
  const sizes = [48, 36, 24, 20, 16, 14, 12]
  return (
    <Container fluid>
      <Text h1>Fonts</Text>
      <Row gap={1}>
        <Col>
          <Text h2>Desktop</Text>
          {[...Array(6).keys()].map((key) => {
            const fontSize = Math.round(sizes[key] * 1.618033)
            return (
              <Text h3 key={key} style={{ fontSize }}>
                Metropolis {fontSize}px
              </Text>
            )
          })}
        </Col>
        <Col>
          <Text h2>Mobile</Text>
          {[...Array(6).keys()].map((key) => (
            <Text h3 key={key} style={{ fontSize: sizes[key] }}>
              Metropolis {sizes[key]}px
            </Text>
          ))}
        </Col>
      </Row>
      <Row gap={1}>
        <Col>
          <Text h2>Desktop</Text>
          <Text css={{ fontSize: Math.round(16 * 1.618033) }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            veritatis accusamus necessitatibus tempora dignissimos explicabo
            aliquam neque fugiat, ab ex eaque omnis eos sit repellendus in
            assumenda! Repellendus, doloribus illo?
          </Text>
        </Col>
        <Col>
          <Text h2>Mobile</Text>
          <Text css={{ fontSize: 16 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            veritatis accusamus necessitatibus tempora dignissimos explicabo
            aliquam neque fugiat, ab ex eaque omnis eos sit repellendus in
            assumenda! Repellendus, doloribus illo?
          </Text>
        </Col>
      </Row>
    </Container>
  )
}
