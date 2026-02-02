import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import HomepageHeader from "../components/Homepage/HomepageHeader";
import TrustMarquee from "../components/Homepage/TrustMarquee";
import VideoSection from "../components/Homepage/VideoSection";
import WorkflowStories from "../components/Homepage/WorkflowStories";
import ModuleShowcase from "../components/Homepage/ModuleShowcase";
import LiveDemo from "../components/Homepage/LiveDemo";
import ComparisonTable from "../components/Homepage/ComparisonTable";
import TrustSignals from "../components/Homepage/TrustSignals";
import BackgroundEffects from "../components/Homepage/BackgroundEffects";

import styles from "./index.module.css";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Your Personal Intelligence On Your Terms`}
      description="MoLOS is a local-first, AI-native productivity suite with complete data ownership. No cloud lock-in. Build with modules. Privacy first."
    >
      <BackgroundEffects />
      <HomepageHeader />
      <TrustMarquee />
      <main>
        <VideoSection />

        <Heading as="h2" className={styles.sectionTitle}>
          Why Choose MoLOS?
        </Heading>
        <HomepageFeatures />

        <LiveDemo />

        <WorkflowStories />

        <ModuleShowcase />

        {/* <Testimonials /> */}

        <ComparisonTable />

        <TrustSignals />
      </main>
    </Layout>
  );
}
