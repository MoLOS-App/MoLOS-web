import React from 'react';
import Heading from '@theme/Heading';
import { Brain, Lightbulb, Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeInVariants, staggerContainerVariants, springTransition } from '../../theme/motion';

import styles from '../../pages/index.module.css';

interface WorkflowStoriesProps {
  interactive?: boolean;
}

function WorkflowStories({ interactive = true }: WorkflowStoriesProps) {
  const shouldReduceMotion = useReducedMotion();
  const workflows = [
    {
      icon: <Brain size={32} />,
      title: "Organize Your Thoughts",
      description: "Capture ideas in your Knowledge base with hierarchical folders and tags. Search through months of notes instantly. Link related ideas together for deeper insights.",
      benefit: "Your thoughts become searchable, organized, and actionable"
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Master Your Priorities",
      description: "Use the Eisenhower Matrix to instantly see what's urgent and important. Link tasks to knowledge and routines. Never lose context on what matters.",
      benefit: "Focus on what actually moves the needle"
    },
    {
      icon: <Zap size={32} />,
      title: "Build Lasting Habits",
      description: "Track routines with flexible metrics. Watch your streaks grow. Visual progress calendars keep you motivated. All data stays local and private.",
      benefit: "Compound improvements into permanent change"
    }
  ];

  return (
    <section className={styles.workflowSection}>
      <motion.div 
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div variants={fadeInVariants}>
          <Heading as="h2" className={styles.sectionTitle}>Real Workflows</Heading>
        </motion.div>
        <motion.p className={styles.sectionSubtitle} variants={fadeInVariants}>
          Here's what you can actually do with MoLOS today.
        </motion.p>
        
        <motion.div className={styles.workflowGrid} variants={staggerContainerVariants}>
          {workflows.map((workflow, idx) => (
            <motion.div
              key={idx}
              className={styles.workflowCard}
              variants={fadeInVariants}
              whileHover={interactive && !shouldReduceMotion ? {
                y: -8,
                backgroundColor: "rgba(var(--ifm-color-primary-rgb), 0.08)",
                transition: springTransition
              } : {}}
            >
              <motion.div
                className={styles.workflowIcon}
                whileHover={interactive && !shouldReduceMotion ? {
                  scale: 1.1,
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.5 }
                } : {}}
              >
                {workflow.icon}
              </motion.div>
              <h3>{workflow.title}</h3>
              <p className={styles.workflowDesc}>{workflow.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default WorkflowStories;
