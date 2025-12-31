import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from '../../pages/index.module.css';

function TrustMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const items = [
    [
      "Privacy Advocates",
      "AI Researchers",
      "Open Source Community",
      "Self-Hosters",
      "Productivity Hackers",
      "Modular Architects",
      "Local-First Devs",
      "Autonomous Agents"
    ],
    [
      "Sovereign Individuals",
      "Interoperability Purists",
      "Digital Humanists",
      "Permacomputing Enthusiasts",
      "Encryption Evangelists",
      "Full-Stack Generalists",
      "Functional Purists",
      "Distributed Systems Engineers",
      "Protocol Designers",
      "Model Optimizers",
      "Prompt Engineers",
      "Synthetic Data Scientists",
      "Algorithmic Auditors",
      "AI Ethicists",
      "Hardware Hackers",
      "Cyber-Pluralists",
      "The Homelab Crowd",
      "Data Minimalists",
      "Web3 Critics"
    ],
    [
      "Seriously, why are you still here",
      "scrolling through all these words",
      "don't you have anything better to do with your day?",
      "Go build something cool with MoLOS",
      "or at least star the repo on GitHub",
      "your support means a lot!",
      "now stop wasting time",
      "no, seriously, go do something else",
      "like take a walk",
      "read a book",
      "learn a new skill",
      "call a friend",
      "watch a movie",
      "or just relax",
      "but please, stop scrolling",
      "ok, you are still here?",
      "Nice, here is the complete Shrek 1 script",
    ],
    [
      "Once upon a time there was a lovely",
      "princess. But she had an enchantment",
      "upon her of a fearful sort which could",
      "only be broken by love's first kiss.",
      "She was locked away in a castle guarded",
      "by a terrible fire-breathing dragon.",
      "Many brave knights had attempted to",
      "free her from this dreadful prison,",
      "but non prevailed. She waited in the",
      "dragon's keep in the highest room of",
      "the tallest tower for her true love",
      "and true love's first kiss. (laughs)",
      "Like that's ever gonna happen. What",
      "a load of - (toilet flush)",
      "Allstar - by Smashmouth begins to play. Shrek goes about his",
      "day. While in a nearby town, the villagers get together to go",
      "after the ogre.",
      "NIGHT - NEAR SHREK'S HOME",
      "MAN1",
      "Think it's in there?",
      "MAN2",
      "All right. Let's get it!",
      "MAN1",
      "Whoa. Hold on. Do you know what that ",
      "thing can do to you?",
      "MAN3",
      "Yeah, it'll grind your bones for it's ",
      "bread.",
      "Shrek sneaks up behind them and laughs.",
      "SHREK",
      "Yes, well, actually, that would be a ",
      "giant. Now, ogres, oh they're much worse. ",
      "They'll make a suit from your freshly ",
      "peeled skin.",
      "MEN",
      "No!",
      "SHREK",
      "They'll shave your liver. Squeeze the ",
      "jelly from your eyes! Actually, it's ",
      "quite good on toast.",
      "MAN1",
      "Back! Back, beast! Back! I warn ya! ",
      "(waves the torch at Shrek.)",
      "Shrek calmly licks his fingers and extinguishes the torch. The ",
      "men shrink back away from him. Shrek roars very loudly and long ",
      "and his breath extinguishes all the remaining torches until the ",
      "men are in the dark.",
      "SHREK",
      "This is the part where you run away. ",
    ]
  ].flat();

  return (
    <div className={styles.marqueeContainer}>
      <motion.div
        className={styles.marqueeContent}
        initial={{ x: 0 }}
        animate={shouldReduceMotion ? {} : {
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className={styles.marqueeItem}>
            <span style={{ color: 'var(--ifm-color-primary)' }}>✦</span> {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default TrustMarquee;
