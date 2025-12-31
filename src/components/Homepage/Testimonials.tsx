import React from 'react';
import Heading from '@theme/Heading';
import { Quote } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeInVariants, staggerContainerVariants, springTransition } from '../../theme/motion';

import styles from '../../pages/index.module.css';

interface TestimonialsProps {
  interactive?: boolean;
}

function Testimonials({ interactive = true }: TestimonialsProps) {
  const shouldReduceMotion = useReducedMotion();
  const testimonials = [
    {
      quote: "I voice-log my ideas throughout the day. MoLOS turns them into tasks, finds relevant notes from my knowledge base, and my AI agent synthesizes insights—all without leaving my laptop. Privacy and productivity finally align.",
      author: "Alex Chen",
      role: "Research Lead at Tech Startup",
      initials: "AC",
      workflow: "Voice → Task → Knowledge Sync"
    },
    {
      quote: "Built a custom health-tracking module in an afternoon. The modularity is real. No fighting API limitations or vendor lock-in. Just TypeScript and creativity.",
      author: "Jordan Rivera",
      role: "Full-Stack Developer",
      initials: "JR",
      workflow: "Extended with Custom Module"
    },
    {
      quote: "After years of Notion and cloud tools, having my data actually stored locally feels revolutionary. My AI agent runs routines without phoning home to some company.",
      author: "Morgan Kim",
      role: "Productivity Systems Designer",
      initials: "MK",
      workflow: "Local-First + AI Workflows"
    }
  ];

  return (
    <section className={styles.testimonialSection}>
      <motion.div 
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div variants={fadeInVariants}>
          <Heading as="h2" className={styles.sectionTitle}>Built By & For Experts</Heading>
        </motion.div>
        <motion.p className={styles.sectionSubtitle} variants={fadeInVariants}>
          Real people, real workflows, real results.
        </motion.p>
        
        <motion.div className={styles.testimonialGrid} variants={staggerContainerVariants}>
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className={styles.testimonialCard}
              variants={fadeInVariants}
              whileHover={interactive && !shouldReduceMotion ? {
                scale: 1.02,
                transition: springTransition
              } : {}}
              style={{ perspective: 1000 }}
            >
              <div className={styles.workflowTag}>{t.workflow}</div>
              <Quote size={32} color="var(--ifm-color-primary)" className="margin-bottom--md" style={{ opacity: 0.2 }} />
              <p className={styles.testimonialQuote}>{t.quote}</p>
              <div className={styles.testimonialAuthor}>
                <motion.div
                  className={styles.authorAvatar}
                  whileHover={interactive && !shouldReduceMotion ? { scale: 1.1, backgroundColor: "var(--ifm-color-primary)", color: "white" } : {}}
                  transition={springTransition}
                >
                  {t.initials}
                </motion.div>
                <div className={styles.authorInfo}>
                  <h4>{t.author}</h4>
                  <p>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Testimonials;
