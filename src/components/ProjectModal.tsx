import { useState } from 'react';
import { Button, Collapse, Modal, Space, Tabs, Tooltip, Typography } from 'antd';
import { ExportOutlined, GithubOutlined } from '@ant-design/icons';
import type { Copy, Locale } from '../data/content';
import { previews, technology } from '../data/projects';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
  index: number;
  locale: Locale;
  text: Copy;
  onClose: () => void;
}

export default function ProjectModal({ project, index, locale, text, onClose }: Props) {
  const [tab, setTab] = useState('case');
  const content = project[locale];
  const sections = [
    [text.problem, content.problem],
    [text.roleLabel, text.roleText],
    [text.choices, content.choices],
    [text.result, content.result],
    [text.next, text.nextText],
  ];

  return (
    <Modal
      open onCancel={onClose} title={`${project.name} — ${content.type}`} width={900}
      footer={
        <div className="flex flex-col items-start justify-between gap-6 text-left min-[801px]:flex-row min-[801px]:items-center">
          <Typography.Text type="secondary" className="max-w-80 !text-[11px]">{text.mock}</Typography.Text>
          <Space wrap>
            <Tooltip title={text.mock}><Button disabled icon={<GithubOutlined />}>{text.repo}</Button></Tooltip>
            <Tooltip title={text.mock}><Button type="primary" disabled icon={<ExportOutlined />}>{text.site}</Button></Tooltip>
            <Button onClick={onClose}>{text.close}</Button>
          </Space>
        </div>
      }
    >
      <img src={previews[index]} alt={project.name} className="mt-4 block w-full rounded-md" />
      <Tabs activeKey={tab} onChange={setTab} items={[
        {
          key: 'case', label: text.case,
          children: <div className="max-w-[680px]">{sections.map(([title, paragraph]) => (
            <section key={title} className="mb-6">
              <Typography.Title level={5}>{title}</Typography.Title>
              <Typography.Paragraph className="!leading-[1.8]">{paragraph}</Typography.Paragraph>
            </section>
          ))}</div>,
        },
        {
          key: 'tech', label: text.tech,
          children: <>
            <Typography.Paragraph type="secondary">{text.techHelp}</Typography.Paragraph>
            <Collapse items={project.stack.map(tag => ({ key: tag, label: tag, children: <Typography.Paragraph>{technology(tag, locale)}</Typography.Paragraph> }))} />
          </>,
        },
      ]} />
    </Modal>
  );
}
