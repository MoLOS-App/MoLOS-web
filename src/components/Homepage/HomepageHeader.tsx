import React, { useMemo, useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import { Shield, Bot, Layers, Home as HomeIcon, CheckCircle2 } from 'lucide-react';
import { motion, useSpring, useMotionValue, AnimatePresence, useReducedMotion } from 'framer-motion';
import { fadeInVariants, staggerContainerVariants, scaleUpVariants } from '../../theme/motion';

import styles from '../../pages/index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const shouldReduceMotion = useReducedMotion();
  
  const secret = useMemo(() => {
    if (typeof window !== 'undefined' && window.crypto) {
      return Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => byte.toString(16).padStart(2, '0')).join('');
    }
    return 'development_secret_key_here';
  }, []);

  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    const command = `docker run -d \\
  --name molos \\
  -e BETTER_AUTH_SECRET=${secret} \\ # YOU WILL NEED TO GENERATE YOUR OWN SECRET
  -p 4173:4173 \\
  -v molos_data:/app/data \\
  ghcr.io/eduardez/molos:latest`;
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const [meteorites, setMeteorites] = useState<{ id: number; x: number; y: number; angle: number }[]>([]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const id = Date.now();
        setMeteorites(prev => [...prev, {
          id,
          x: Math.random() * 100,
          y: Math.random() * 50,
          angle: 135 + (Math.random() * 20 - 10)
        }]);
        setTimeout(() => {
          setMeteorites(prev => prev.filter(m => m.id !== id));
        }, 1000);
      }
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [shouldReduceMotion, mouseX, mouseY]);

  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroBackground}>
        {!shouldReduceMotion && (
          <>
            <motion.div
              className={styles.mouseFollower}
              style={{ x: springX, y: springY }}
            />
            <div className={styles.floatingShape1}></div>
            <div className={styles.floatingShape2}></div>
            <div className={styles.floatingShape3}></div>
            
            {/* Satellites */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`sat-${i}`}
                className={styles.satellite}
                animate={{
                  x: [
                    Math.cos(i) * 200,
                    Math.cos(i + Math.PI) * 200,
                    Math.cos(i + 2 * Math.PI) * 200
                  ],
                  y: [
                    Math.sin(i) * 100,
                    Math.sin(i + Math.PI) * 100,
                    Math.sin(i + 2 * Math.PI) * 100
                  ],
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  left: '50%',
                  top: '40%',
                }}
              />
            ))}

            {/* Meteorites */}
            <AnimatePresence>
              {meteorites.map(m => (
                <motion.div
                  key={m.id}
                  className={styles.meteorite}
                  initial={{ x: `${m.x}%`, y: `${m.y}%`, opacity: 0, width: 0 }}
                  animate={{
                    x: `${m.x + 20}%`,
                    y: `${m.y + 20}%`,
                    opacity: [0, 1, 0],
                    width: [0, 150, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ rotate: m.angle }}
                />
              ))}
            </AnimatePresence>
          </>
        )}
      </div>
      <motion.div 
        className="container"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src="img/brand/logo_1024-removebg-preview.png"
          alt="MoLOS Logo"
          className={styles.heroLogo}
          variants={scaleUpVariants}
        />
        <motion.div variants={fadeInVariants}>
          <Heading as="h1" className={styles.heroTitle} style={{ paddingBottom: "12px" }}>
            The lazy way <br /> to stay organized
          </Heading>
        </motion.div>
        <motion.p className={styles.heroSubtitle} variants={fadeInVariants}>
          Because you've got better things to do than spend hours optimizing your notes.
        </motion.p>

        <motion.div className={styles.heroFeatures} variants={staggerContainerVariants}>
          {[
            { icon: Shield, text: 'Privacy-First' },
            { icon: Layers, text: 'Modular' },
            { icon: Bot, text: 'AI-Native' },
            { icon: HomeIcon, text: 'Self-hostable' }
          ].map((feature, i) => (
            <motion.div key={i} className={styles.heroFeature} variants={fadeInVariants}>
              <feature.icon size={18} className="margin-right--xs" />
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className={styles.buttons} variants={fadeInVariants}>
          <Link
            className={styles.primaryButton}
            to="/docs/getting-started">
            Quick Start
          </Link>
          <Link
            className={styles.secondaryButton}
            to="/docs/module-development">
            Live Demo
          </Link>
        </motion.div>

        <motion.p className={styles.heroSubtext} variants={fadeInVariants}>
          No credit card required. Runs on your laptop or server.
        </motion.p>

        <motion.div className={styles.heroDockerContainer} variants={fadeInVariants}>
          <div className={styles.heroDockerHeader}>
            <div className={styles.terminalLeft}>
              <span style={{ color: '#aaa', fontSize: '0.75rem', marginLeft: '0.5rem', fontFamily: 'var(--ifm-font-family-monospace)' }}>Quick Install</span>
            </div>
            <button onClick={copyCommand} className={styles.copyButton}>
              {copied ? <><CheckCircle2 size={14} /> Copied</> : <>📋 Copy</>}
            </button>
          </div>
          <pre className={styles.heroDockerCode}>
            <code>
              {`docker run -d \\
  --name molos \\
  -e BETTER_AUTH_SECRET=${secret.substring(0, 8)}... \\ # GENERATE YOUR OWN SECRET!
  -p 4173:4173 \\
  -v molos_data:/app/data \\
  ghcr.io/eduardez/molos:latest`}
            </code>
          </pre>
        </motion.div>
      </motion.div>
    </header>
  );
}

export default HomepageHeader;
