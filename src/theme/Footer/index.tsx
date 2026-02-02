import React, { type ReactNode } from "react";
import Footer from "@theme-original/Footer";
import type FooterType from "@theme/Footer";
import type { WrapperProps } from "@docusaurus/types";
import Link from "@docusaurus/Link";
import { Github, Twitter, Mail, ArrowRight } from "lucide-react";
import styles from "./styles.module.css";

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): ReactNode {
  return <Footer className={styles.footerMain} {...props} />;
}
