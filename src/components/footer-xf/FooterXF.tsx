import ExperienceFragment from "@/components/experienceFragment/ExperienceFragment";
import styles from "./FooterXF.module.css";

export default function FooterXF({ html }: { html: string }) {
  return (
    <footer className={styles.siteFooter}>
      <ExperienceFragment html={html} label="Site footer" />
    </footer>
  );
}
