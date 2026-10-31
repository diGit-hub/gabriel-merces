import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import type { Copy, Locale } from '../data/content';
import { previews, projects } from '../data/projects';

interface Props {
  text: Copy;
  locale: Locale;
  onSelect: (index: number) => void;
}

export default function ProjectsSection({ text, locale, onSelect }: Props) {
  return (
    <section id="projetos">
      <div className="section-inset mb-8">
        <Typography.Title level={3} className="!mb-2 !mt-0">{text.projects}</Typography.Title>
        <Typography.Text type="secondary">{text.projectsSub}</Typography.Text>
      </div>
      <Row gutter={[24, 24]}>
        {projects.map((project, index) => (
          <Col xs={24} md={12} lg={8} key={project.name}>
            <Card
              className="flex h-full flex-col overflow-hidden [&>.ant-card-body]:flex-1"
              cover={
                <button type="button" className="block w-full cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1677ff]" onClick={() => onSelect(index)} aria-label={`${text.view} ${project.name}`}>
                  <img className="block h-auto w-full" src={previews[index]} alt={`${project.name} — ${project[locale].type}`} />
                </button>
              }
              actions={[
                <Button key="case-study" type="link" icon={<ArrowRightOutlined />} onClick={() => onSelect(index)}>{text.view}</Button>,
              ]}
            >
              <Card.Meta title={project.name} description={project[locale].type} />
              <Typography.Paragraph type="secondary" className="!mt-4">{project[locale].summary}</Typography.Paragraph>
              <Space size={[0, 8]} wrap>{project.stack.map(tag => <Tag key={tag}>{tag}</Tag>)}</Space>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
