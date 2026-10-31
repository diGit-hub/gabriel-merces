import { useState } from 'react';
import { Button, Collapse, Modal, Space, Tabs, Tooltip, Typography } from 'antd';
import { ExportOutlined, GithubOutlined } from '@ant-design/icons';
import type { Copy, Locale } from '../data/content';
import { technology } from '../data/projects';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
  locale: Locale;
  text: Copy;
  onClose: () => void;
}

export default function ProjectModal({ project, locale, text, onClose }: Props) {
  const [tab, setTab] = useState('case');
  const content = project[locale];
  const sections = [
    [text.problem, content.problem],
    [text.roleLabel, content.role],
    [text.choices, content.choices],
    [text.result, content.result],
    [text.next, content.next],
  ];

  return (
    <Modal
      open onCancel={onClose} title={`${project.name} — ${content.type}`} width={900}
      footer={
        <div className="flex flex-col items-start justify-between gap-6 text-left min-[801px]:flex-row min-[801px]:items-center">
          <Typography.Text type="secondary" className="max-w-80 !text-[11px]">{content.status}</Typography.Text>
          <Space wrap>
            {project.privateRepository ? (
              <Tooltip title={text.privateRepoHelp}>
                <span><Button disabled icon={<GithubOutlined />}>{text.privateRepo}</Button></span>
              </Tooltip>
            ) : (
              <Button href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" icon={<GithubOutlined />}>{text.repo}</Button>
            )}
            <Button type="primary" href={project.siteUrl} target="_blank" rel="noopener noreferrer" icon={<ExportOutlined />}>{text.site}</Button>
            <Button onClick={onClose}>{text.close}</Button>
          </Space>
        </div>
      }
    >
      <img src={project.preview} alt={`${project.name} — ${content.type}`} className="mt-4 block w-full rounded-md" />
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
