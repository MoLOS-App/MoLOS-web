import React from "react";
import Heading from "@theme/Heading";
import { motion } from "framer-motion";
import { fadeInVariants, scaleUpVariants } from "../../theme/motion";

import styles from "../../pages/index.module.css";

function VideoSection() {
  return (
    <section className={styles.videoSection}>
      <motion.div
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeInVariants}>
          <Heading as="h2" className={styles.sectionTitle}>
            See It In Action
          </Heading>
        </motion.div>
        <motion.div className={styles.videoWrapper} variants={scaleUpVariants}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="MoLOS Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%", borderRadius: "8px" }}
          ></iframe>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default VideoSection;
