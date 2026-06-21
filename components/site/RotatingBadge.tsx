import { ArrowIcon } from "./ArrowIcon";
import styles from "./RotatingBadge.module.css";

type RotatingBadgeProps = {
  text?: string;
  className?: string;
};

/** Slow-spinning circular text badge with an arrow at its center. */
export function RotatingBadge({
  text = "Let's work together · Koala Studios · ",
  className,
}: RotatingBadgeProps) {
  return (
    <span aria-hidden="true" className={`${styles.badge} ${className ?? ""}`}>
      <svg className={styles.ring} viewBox="0 0 100 100">
        <defs>
          <path
            id="koala-badge-circle"
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          />
        </defs>
        <text className={styles.text}>
          <textPath href="#koala-badge-circle">
            {text.repeat(2)}
          </textPath>
        </text>
      </svg>
      <span className={styles.center}>
        <ArrowIcon />
      </span>
    </span>
  );
}
