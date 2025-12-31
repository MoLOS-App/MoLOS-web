import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import { CheckCircle2, XCircle, Wrench, DollarSign } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeInVariants, staggerContainerVariants, springTransition } from '../../theme/motion';

import styles from '../../pages/index.module.css';

interface ComparisonTableProps {
  interactive?: boolean;
}

function ComparisonTable({ interactive = true }: ComparisonTableProps) {
  const shouldReduceMotion = useReducedMotion();
  const comparisonData = [
    {
      feature: "Your Data Stays Local",
      desc: "No cloud sync unless you choose",
      molos: { status: <CheckCircle2 size={42} color="green" />, text: "Native" },
      notion: { status: <XCircle size={18} color="red" />, text: "Cloud Only" },
      obsidian: { status: <CheckCircle2 size={18} color="green" />, text: "Local" },
      logseq: { status: <CheckCircle2 size={18} color="green" />, text: "Local" }
    },
    {
      feature: "AI Agents Can Execute",
      desc: "Not just query, but actually manipulate data",
      molos: { status: <CheckCircle2 size={42} color="green" />, text: "Built-In" },
      notion: { status: <Wrench size={18} color="orange" />, text: "API Only" },
      obsidian: { status: <XCircle size={18} color="red" />, text: "No" },
      logseq: { status: <XCircle size={18} color="red" />, text: "No" }
    },
    {
      feature: "Modular + Extensible",
      desc: "Build custom modules with full integration",
      molos: { status: <CheckCircle2 size={42} color="green" />, text: "Full Stack" },
      notion: { status: <Wrench size={18} color="orange" />, text: "Limited" },
      obsidian: { status: <CheckCircle2 size={18} color="green" />, text: "Plugins" },
      logseq: { status: <CheckCircle2 size={18} color="green" />, text: "Plugins" }
    },
    {
      feature: "Integrated Modules",
      desc: "Deep cross-module intelligence (Tasks + Knowledge + Routines)",
      molos: { status: <CheckCircle2 size={42} color="green" />, text: "By Design" },
      notion: { status: <CheckCircle2 size={18} color="green" />, text: "Via DB" },
      obsidian: { status: <XCircle size={18} color="red" />, text: "Separate" },
      logseq: { status: <XCircle size={18} color="red" />, text: "Separate" }
    },
    {
      feature: "No Cost or Lock-In",
      desc: "Open source, Apache license 2.0",
      molos: { status: <CheckCircle2 size={42} color="green" />, text: "Free" },
      notion: { status: <DollarSign size={18} color="red" />, text: "$10+/mo" },
      obsidian: { status: <CheckCircle2 size={18} color="green" />, text: "Free" },
      logseq: { status: <CheckCircle2 size={18} color="green" />, text: "Free" }
    },
    {
      feature: "Offline-First by Default",
      desc: "Works without internet connection",
      molos: { status: <CheckCircle2 size={42} color="green" />, text: "Native" },
      notion: { status: <XCircle size={18} color="red" />, text: "No" },
      obsidian: { status: <CheckCircle2 size={18} color="green" />, text: "Yes" },
      logseq: { status: <CheckCircle2 size={18} color="green" />, text: "Yes" }
    }
  ];

  return (
    <div className="container padding-vert--xl">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainerVariants}
      >
        <motion.div variants={fadeInVariants}>
          <Heading as="h2" className={styles.sectionTitle}>Why Should I Use MoLOS?</Heading>
        </motion.div>
        <motion.p className={styles.sectionSubtitle} variants={fadeInVariants}>
          Just take a look to the comparison table below.
        </motion.p>
        
        <motion.div className={styles.comparisonGrid} variants={staggerContainerVariants}>
          <div className={styles.comparisonRow}>
            <div className={styles.featureColumn}></div>
            <div className={clsx(styles.comparisonCell, styles.molosCell)}><h4>MoLOS</h4></div>
            <div className={clsx(styles.comparisonCell, styles.molosCell)}><h4>Notion</h4></div>
            <div className={clsx(styles.comparisonCell, styles.molosCell)}><h4>Obsidian</h4></div>
            <div className={clsx(styles.comparisonCell, styles.molosCell)}><h4>Logseq</h4></div>
          </div>
          
          {comparisonData.map((row, idx) => (
            <motion.div
              key={idx}
              className={styles.comparisonRow}
              variants={fadeInVariants}
              whileHover={interactive && !shouldReduceMotion ? {
                scale: 1.01,
                transition: springTransition
              } : {}}
            >
              <div className={styles.featureColumn}>
                <h4>{row.feature}</h4>
                <p>{row.desc}</p>
              </div>
              <div className={clsx(styles.comparisonCell, styles.molosCell)}>
                <div className={styles.cellStatus}>{row.molos.status}</div>
                <div className={styles.cellText}>{row.molos.text}</div>
              </div>
              <div className={styles.comparisonCell}>
                <div className={styles.cellStatus}>{row.notion.status}</div>
                <div className={styles.cellText}>{row.notion.text}</div>
              </div>
              <div className={styles.comparisonCell}>
                <div className={styles.cellStatus}>{row.obsidian.status}</div>
                <div className={styles.cellText}>{row.obsidian.text}</div>
              </div>
              <div className={styles.comparisonCell}>
                <div className={styles.cellStatus}>{row.logseq.status}</div>
                <div className={styles.cellText}>{row.logseq.text}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ComparisonTable;
