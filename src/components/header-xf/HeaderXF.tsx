import ExperienceFragment from "@/components/experienceFragment/ExperienceFragment";
import styles from "./HeaderXF.module.css";

export default function HeaderXF({ html }: { html: string }) {
  return (
    <header className={styles.siteHeader}>
      <ExperienceFragment html={html} label="Site header" />
    </header>
  );
}