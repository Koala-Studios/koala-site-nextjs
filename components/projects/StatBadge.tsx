import React, { ReactElement } from "react";
import styles from "../../styles/ProjectSections.module.css";

interface Props {
  LargeText: string;
  SmallText: string;
  UnderText?: ReactElement;
  dataLag?: number;
}

const StatBadge: React.FC<Props> = ({
  LargeText,
  SmallText,
  UnderText,
  dataLag,
}) => {
  const data_lag = dataLag ? dataLag : 0;
  return (
    <div data-lag={data_lag}>
      <div className={styles.stat_badge}>
        <div>
          <span style={{ fontSize: 35 }}>{LargeText}</span>
          {SmallText}
        </div>
      </div>
      {UnderText ? UnderText : <div style={{ height: 16 }}></div>}
    </div>
  );
};

export default StatBadge;
