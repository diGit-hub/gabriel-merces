import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Segmented, Typography } from 'antd';
import { GlobalOutlined, MailOutlined } from '@ant-design/icons';
import enUS from 'antd/locale/en_US';
import ptBR from 'antd/locale/pt_BR';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import ProjectModal from './components/ProjectModal';
import ConstellationBackground from './components/ConstellationBackground';
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
      <div className="page-container">
        <header className="section-inset flex min-h-20 items-center justify-between gap-4 border-b border-[#f0f0f0] py-4">
          <Typography.Text strong className="text-xl! min-[601px]:text-2xl!">Gabriel Mercês</Typography.Text>
          <div className="flex shrink-0 items-center gap-2">
            <GlobalOutlined aria-hidden="true" className="text-base text-neutral-500" />
            <div
              role="button"
              tabIndex={0}
              aria-label={locale === 'pt' ? 'Idioma: português. Alternar para inglês.' : 'Language: English. Switch to Portuguese.'}
              className="cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff]"
              onClick={() => setLocale(current => current === 'pt' ? 'en' : 'pt')}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  if (!event.repeat) setLocale(current => current === 'pt' ? 'en' : 'pt');
                }
              }}
            >
              <div inert aria-hidden="true" className="pointer-events-none">
                <Segmented<Locale>
                  options={[{ label: 'PT', value: 'pt' }, { label: 'EN', value: 'en' }]}
                  value={locale}
                />
              </div>
            </div>
          </div>
        </header>
        <main>
          <Hero text={text} />
          <ProjectsSection text={text} locale={locale} onSelect={setSelectedProject} />
          <section id="contato" className="constellation-section section-inset contact-section flex flex-col items-start justify-between gap-6 border-t border-[#f0f0f0] min-[801px]:flex-row min-[801px]:items-center">
            <ConstellationBackground />
            <div>
              <Typography.Title level={3} className="m-0!">{text.cta}</Typography.Title>
              <Typography.Paragraph type="secondary" className="mb-0! mt-2!">{text.ctaText}</Typography.Paragraph>
            </div>
            <Button type="primary" href="mailto:gabriel.merces.dev@gmail.com" icon={<MailOutlined />}>{text.contact}</Button>
          </section>
        </main>
        <footer className="section-inset flex flex-col justify-between gap-2 border-t border-[#f0f0f0] py-6 min-[601px]:flex-row min-[601px]:gap-4">
          <Typography.Text type="secondary" className="text-xs!">© 2026 Gabriel Mercês</Typography.Text>
          <Typography.Text type="secondary" className="text-xs!">{text.footer}</Typography.Text>
        </footer>
      </div>
      {selectedProject !== null && (
        <ProjectModal key={projects[selectedProject].name} project={projects[selectedProject]} locale={locale} text={text} onClose={() => setSelectedProject(null)} />
      )}
    </ConfigProvider>
  );
}
