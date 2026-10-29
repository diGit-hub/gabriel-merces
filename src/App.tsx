import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Segmented, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import enUS from 'antd/locale/en_US';
import ptBR from 'antd/locale/pt_BR';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import ProjectModal from './components/ProjectModal';
import { copy } from './data/content';
import type { Locale } from './data/content';
import { projects } from './data/projects';

export default function App() {
  const [locale, setLocale] = useState<Locale>(() => {
    try { return localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'pt'; }
    catch { return 'pt'; }
  });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const text = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
    document.title = 'Gabriel Mercês — Frontend Developer';
    try { localStorage.setItem('portfolio-language', locale); }
    catch { /* Language selection still works when browser storage is unavailable. */ }
  }, [locale]);

  return (
    <ConfigProvider locale={locale === 'pt' ? ptBR : enUS}>
      <div className="mx-auto max-w-[1200px] px-5 min-[601px]:px-6 min-[801px]:px-10">
        <header className="flex h-[72px] items-center justify-between border-b border-[#f0f0f0] min-[601px]:h-20">
          <Typography.Text strong>Gabriel Mercês</Typography.Text>
          <nav aria-label={locale === 'pt' ? 'Navegação principal' : 'Main navigation'} className="flex items-center gap-1 min-[601px]:gap-4">
            <Button type="text" href="#projetos">{text.nav}</Button>
            <Segmented<Locale> options={[{ label: 'PT', value: 'pt' }, { label: 'EN', value: 'en' }]} value={locale} onChange={setLocale} aria-label={locale === 'pt' ? 'Idioma' : 'Language'} />
          </nav>
        </header>
        <main>
          <Hero text={text} />
          <ProjectsSection text={text} locale={locale} onSelect={setSelectedProject} />
          <section className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[#f0f0f0] py-8 min-[801px]:flex-row min-[801px]:items-center">
            <div>
              <Typography.Title level={3} className="!m-0">{text.cta}</Typography.Title>
              <Typography.Paragraph type="secondary" className="!mb-0 !mt-2">{text.ctaText}</Typography.Paragraph>
            </div>
            <Button type="primary" href="mailto:gabriel.merces.dev@gmail.com" icon={<MailOutlined />}>{text.contact}</Button>
          </section>
        </main>
        <footer className="flex flex-col justify-between gap-2 border-t border-[#f0f0f0] py-6 min-[601px]:flex-row min-[601px]:gap-4">
          <Typography.Text type="secondary" className="!text-xs">© 2026 Gabriel Mercês</Typography.Text>
          <Typography.Text type="secondary" className="!text-xs">{text.footer}</Typography.Text>
        </footer>
      </div>
      {selectedProject !== null && (
        <ProjectModal key={projects[selectedProject].name} project={projects[selectedProject]} index={selectedProject} locale={locale} text={text} onClose={() => setSelectedProject(null)} />
      )}
    </ConfigProvider>
  );
}
