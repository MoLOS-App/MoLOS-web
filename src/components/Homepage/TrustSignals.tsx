import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { ArrowRight, GitPullRequestCreateArrow, LucideHardDriveUpload, PersonStanding, TrendingUpIcon, UsersIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeInVariants, staggerContainerVariants, springTransition } from '../../theme/motion';

import styles from '../../pages/index.module.css';
import Home from '@site/src/pages';

interface TrustSignalsProps {
  interactive?: boolean;
}

function TrustSignals({ interactive = true }: TrustSignalsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={styles.trustSection}>
      <motion.div 
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div variants={fadeInVariants}>
          <Heading as="h2" className={styles.sectionTitle}>Built By the Community</Heading>
        </motion.div>
        <motion.p className={styles.sectionSubtitle} variants={fadeInVariants}>
          This project is made for the community and by the community.
        </motion.p>
        
        <motion.div className={styles.trustGrid} variants={staggerContainerVariants}>
          {[
            { icon: <GitPullRequestCreateArrow size={32} />, title: "GitHub Stars", text: "Come and give us a star! Or better, develop your own modules." },
            { icon: <LucideHardDriveUpload size={32} />, title: "Docker Deployments", text: "Easy install, easy delete. I know MoLOS is not for everyone so if you don't like it, just remove it." },
            { icon: <UsersIcon size={32} />, title: "Contributors", text: "I am always happy to see new contributors join the project. And I always have time for them." },
            { icon: <TrendingUpIcon size={32} />, title: "Growing Daily", text: "At least a new module is developed everyday (or maintainers are working on them)." }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              className={styles.trustCard}
              variants={fadeInVariants}
              whileHover={interactive && !shouldReduceMotion ? {
                scale: 1.02,
                y: -5,
                transition: springTransition
              } : {}}
            >
              <motion.div
                className={styles.trustNumber}
                animate={interactive && !shouldReduceMotion ? {
                  y: [0, -5, 0],
                  transition: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: idx * 0.2 }
                } : {}}
              >
                {card.icon}
              </motion.div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div className={styles.trustCTA} variants={fadeInVariants}>
          <Link to="https://github.com/eduardez/MoLOS" className={styles.primaryButton}>
            See Our GitHub <ArrowRight size={20} className="margin-left--xs" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default TrustSignals;
