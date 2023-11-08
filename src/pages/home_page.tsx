import { Button, Carousel, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const images = [
  {
    alt: "Football",
    title: "Football",
    description:
      "Football is the world's most popular sport and Smarkets offers markets on all of the major leagues and competitions.",
    button: "View Latest Football Odds",
    link: "/football",
    src: "https://images.unsplash.com/photo-1599204606395-ede983387d21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    alt: "Horse Racing",
    title: "Horse Racing",
    description:
      "Smarkets offers markets on all UK, Irish and international horse racing events.",
    button: "View Latest Horse Racing Odds",
    link: "/horse_racing",
    src: "https://images.unsplash.com/photo-1516673699707-4f2a243fafaf?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    alt: "TV",
    title: "TV",
    description:
      "Smarkets offers markets on all major TV events, including the Oscars, Eurovision and Strictly Come Dancing.",
    button: "View Latest TV Odds",
    link: "/tv_and_entertainment",
    src: "https://images.unsplash.com/photo-1648538874920-5deefcb65673?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const HomePage = () => {
  return (
    <Row justify="center" align="middle" gutter={16}>
      <Col
        span={16}
        style={{
          gap: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Title level={2}>Welcome to Smarkets</Title>
        <Text type="secondary">(Take Home Assigment)</Text>
        <Carousel autoplay dots>
          {images.map((image) => (
            <div key={image.alt}>
              <div
                style={{
                  backgroundImage: `url('${image.src}')`,
                  padding: "320px 15px 80px 15px",
                  backgroundSize: "cover",
                }}
              >
                <Title level={4}>{image.title}</Title>
                <Paragraph>{image.description}</Paragraph>
                <Link to={image.link}>
                  <Button type="primary">{image.button}</Button>
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
      </Col>
      <Col span={8}>
        <Title level={4}>What is Smarkets?</Title>
        <Paragraph>
          Smarkets is an online betting exchange that offers the best odds on
          the widest range of markets. We're proud to be different, and we want
          you to understand why.
        </Paragraph>
        <Button type="primary">Learn more</Button>
      </Col>
    </Row>
  );
};
