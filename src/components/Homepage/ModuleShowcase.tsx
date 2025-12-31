import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { CheckCircle2, Lightbulb, Gauge, Code2, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeInVariants, staggerContainerVariants, springTransition } from '../../theme/motion';

import styles from '../../pages/index.module.css';

interface ModuleShowcaseProps {
  interactive?: boolean;
}

function ModuleShowcase({ interactive = true }: ModuleShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const modules = [
    {
      name: "Tasks",
      icon: <CheckCircle2 size={24} />,
      description: "Eisenhower Matrix for urgent/important prioritization. Recurring tasks with context linking. AI-powered suggestion engine.",
      cta: "Learn More"
    },
    {
      name: "Knowledge",
      icon: <Lightbulb size={24} />,
      description: "Hierarchical markdown-based notes. Lightning-fast semantic search. Bidirectional linking. Your personal Wikipedia.",
      cta: "Learn More"
    },
    {
      name: "Routines",
      icon: <Gauge size={24} />,
      description: "Habit tracking with flexible metrics. Streak protection. Visual progress tracking. Build the life you want.",
      cta: "Learn More"
    },
    {
      name: "Your Module",
      icon: <Code2 size={24} />,
      description: "Build it in TypeScript. Integrates with DB, API, UI, and AI tools. Deploy in minutes. No permissions debates.",
      cta: "Build Now"
    }
  ];

  return (
    <section className={styles.moduleSection}>
      <motion.div 
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div variants={fadeInVariants}>
          <Heading as="h2" className={styles.sectionTitle}>Growing Number of Modules</Heading>
        </motion.div>
        <motion.p className={styles.sectionSubtitle} variants={fadeInVariants}>
          Start with core modules. Extend with custom ones. No limits.
        </motion.p>
        
        <motion.div className={styles.moduleGrid} variants={staggerContainerVariants}>
          {modules.map((module, idx) => (
            <motion.div
              key={idx}
              className={clsx(styles.moduleCard, { [styles.buildYourOwn]: idx === 3 })}
              variants={fadeInVariants}
              whileHover={interactive && !shouldReduceMotion ? {
                scale: 1.03,
                y: -8,
                transition: springTransition
              } : {}}
            >
              <motion.div
                className={styles.moduleIconWrapper}
                whileHover={interactive && !shouldReduceMotion ? { rotate: 15, scale: 1.1 } : {}}
                transition={springTransition}
              >
                {module.icon}
              </motion.div>
              <h3>{module.name}</h3>
              <p>{module.description}</p>
              <Link to={idx === 3 ? "/docs/module-development" : "/docs/getting-started"} className={styles.moduleLink}>
                {module.cta} <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default ModuleShowcase;
