import insideLaptop from '~/assets/insideLaptop.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const [visibleSections, setVisibleSections] = useState([projectOne]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);

  useEffect(() => {
    // Only include refs that are actually rendered
    const sections = [intro, projectOne, projectTwo, projectThree, projectFour];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      if (section.current instanceof Element) {
        sectionObserver.observe(section.current);
      }
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={true}
        index={1}
        title="Phorn Leangchheng - Writing Assignment1 - E3.5"
        description="Click the button below to view my writing assignment PDF."
        buttonText="View PDF"
        buttonLink="/Phorn%20Leangchheng%20-%20Writing%20Assignment1%20-%20E3.5.pdf"
        model={{
          type: 'laptop',
          alt: 'Portfolio PDF preview',
          textures: [
            {
              srcSet: `${insideLaptop}`,
              placeholder: insideLaptop,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        sectionRef={projectTwo}
        visible={true}
        index={2}
        title="Phorn Leangchheng - Writing Assignment2 - E3.5"
        description="Click the button below to view my writing assignment PDF."
        buttonText="View PDF"
        buttonLink="/Phorn%20Leangchheng%20-%20Writing%20Assignment%202%20-%20E3.5.pdf"
        model={{
          type: 'laptop',
          alt: 'Portfolio PDF preview',
          textures: [
            {
              srcSet: `${insideLaptop}`,
              placeholder: insideLaptop,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={true}
        index={3}
        title="Phorn Leangchheng - Writing Assignment3 - E3.5"
        description="Click the button below to view my writing assignment PDF."
        buttonText="View PDF"
        buttonLink="/Phorn%20Leangchheng%20-%20Writing%20Assignment%203%20-%20E3.5.pdf"
        model={{
          type: 'laptop',
          alt: 'Portfolio PDF preview',
          textures: [
            {
              srcSet: `${insideLaptop}`,
              placeholder: insideLaptop,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        sectionRef={projectFour}
        visible={true}
        index={4}
        title="Phorn Leangchheng - Writing Assignment4 - E3.5"
        description="Click the button below to view my writing assignment PDF."
        buttonText="View PDF"
        buttonLink="/Phorn%20Leangchheng%20-%20Writing%20Assignment%204%20-%20E3.5.pdf"
        model={{
          type: 'laptop',
          alt: 'Portfolio PDF preview',
          textures: [
            {
              srcSet: `${insideLaptop}`,
              placeholder: insideLaptop,
            },
          ],
        }}
      />
      <Footer />
    </div>
  );
};
