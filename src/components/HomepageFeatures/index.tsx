import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { Zap, Puzzle, Shield, Home, Bot, Smartphone, Database, Cog } from 'lucide-react';

type FeatureItem = {
  title: string;
  icon: ReactNode;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Don't spend time searching",
    icon: <Database size={40} strokeWidth={1.5} />,
    description: (
      <>
        Successful people don't go on scavenger hunts for their own files. MoLOS is structured for intelligence, your data is always exactly where you need it.
      </>
    ),
  },
  {
    title: 'Set It and Forget It',
    icon: <Cog size={40} strokeWidth={1.5} />,
    description: (
      <>
        Don't spend your time managing your tools. MoLOS is pre-configured so you can skip the setup labor.
      </>
    ),
  },
  {
    title: 'Stop Planning, Start Doing',
    icon: <Zap size={40} strokeWidth={1.5} />,
    description: (
      <>
        Stop wasting weeks designing your "perfect" workspace only to tell others how great it is. MoLOS works from day one with a system designed to be better than others.
      </>
    ),
  },
  // {
  //   title: 'Built for Real Life',
  //   icon: <Home size={40} strokeWidth={1.5} />,
  //   description: (
  //     <>
  //       Average tools fail the moment the Wi-Fi drops. MoLOS is local-first and unshakable. Stay in deep flow and keep your momentum, whether you're online or off.
  //     </>
  //   ),
  // },
  // {
  //   title: 'Own Your Data Forever',
  //   icon: <Shield size={40} strokeWidth={1.5} />,
  //   description: (
  //     <>
  //       Stop Renting Your Intellect. Own your data in a private vault that grows without recurring fees or monthly bills.
  //     </>
  //   ),
  // },
  // {
  //   title: 'Total Privacy by Default',
  //   icon: <Shield size={40} strokeWidth={1.5} />,
  //   description: (
  //     <>
  //       The cloud turns your private thoughts into data points for others. MoLOS provides a place where your ideas live offline.
  //     </>
  //   ),
  // },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4 margin-bottom--lg')}>
      <motion.div
        className={styles.featureCard}
        whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className={styles.featureIconWrapper}>
          {icon}
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
