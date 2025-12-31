import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInVariants, staggerContainerVariants, slideInRightVariants, slideInLeftVariants } from '../../theme/motion';

import styles from '../../pages/index.module.css';

function LiveDemo() {
  return (
    <div className="container padding-vert--xl">
      <motion.div 
        className={styles.splitSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className={styles.splitContent} variants={slideInLeftVariants}>
          <Heading as="h2">Modular by Design</Heading>
          <p style={{ fontSize: '1.2rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '2rem' }}>
            Every MoLOS module works independently but integrates seamlessly.
            <strong> Add new modules</strong> without touching existing code.
          </p>
          <motion.ul 
            style={{ lineHeight: '2.5', listStyle: 'none', padding: 0 }}
            variants={staggerContainerVariants}
          >
            {[
              { label: "TypeScript + SvelteKit:", text: "Modern stack, fast builds." },
              { label: "Local SQLite Database:", text: "Your data stored locally, queryable instantly." },
              { label: "Full Integration:", text: "DB, API endpoints, UI routes, all included." }
            ].map((item, i) => (
              <motion.li 
                key={i} 
                style={{ display: 'flex', alignItems: 'center' }}
                variants={fadeInVariants}
              >
                <CheckCircle2 size={18} color="var(--ifm-color-primary)" className="margin-right--sm" /> 
                <b style={{ marginRight: "4px" }}>{item.label}</b> {item.text}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeInVariants}>
            <Link className={clsx(styles.primaryButton, "margin-top--lg")} style={{ display: 'inline-block' }} to="/docs/reference/architecture">
              Learn Architecture →
            </Link>
          </motion.div>
        </motion.div>
        <motion.div className={styles.splitVisual} variants={slideInRightVariants}>
          <div className={styles.visualPlaceholder}>
            {/* Placeholder for dashboard visual */}
            <div className={styles.visualPulse}></div>
            <span>MoLOS Dashboard</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LiveDemo;
