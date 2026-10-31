import { Avatar, Button, Space, Tooltip, Typography } from 'antd';
import { DownloadOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import type { Copy } from '../data/content';
import ConstellationBackground from './ConstellationBackground';
import photo from '../assets/gabriel.jpg';
import resume from '../assets/curriculo-gabriel-merces.pdf';

export default function Hero({ text }: { text: Copy }) {
  return (
    <section className="constellation-section hero-layout grid items-center gap-6 min-[601px]:grid-cols-[160px_minmax(0,1fr)] min-[601px]:gap-8 min-[801px]:grid-cols-[192px_minmax(0,1fr)] min-[801px]:gap-12">
      <ConstellationBackground />
      <div className="flex justify-start min-[601px]:justify-center">
        <div className="relative isolate size-28 min-[601px]:size-40 min-[801px]:size-48">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-0.5 translate-y-0.5 brightness-[0.45]">
            <Avatar src={photo} alt="" className="size-full!" />
          </div>
          <Avatar src={photo} alt={text.photo} className="relative size-full!" />
        </div>
      </div>
      <div>
        <Typography.Text type="secondary">{text.role}</Typography.Text>
        <Typography.Title level={1} className="!mt-3 max-[800px]:!text-[30px]">
          {text.headline}<br />{text.second}
        </Typography.Title>
        <Typography.Paragraph type="secondary" className="max-w-[680px] !text-[15px] !leading-7 min-[601px]:!text-base">
          {text.intro}
        </Typography.Paragraph>
        <Space size={[10, 12]} wrap>
          <Tooltip title={text.cvNote}>
            <Button type="primary" size="large" href={resume} download="Gabriel-Merces-Resume.pdf" icon={<DownloadOutlined />}>
              {text.cv}
            </Button>
          </Tooltip>
          <Button size="large" href="https://www.linkedin.com/in/gabriel-merc%C3%AAs/" target="_blank" rel="noreferrer" icon={<LinkedinOutlined />}>LinkedIn</Button>
          <Button size="large" href="https://github.com/diGit-hub" target="_blank" rel="noreferrer" icon={<GithubOutlined />}>GitHub</Button>
        </Space>
      </div>
    </section>
  );
}
