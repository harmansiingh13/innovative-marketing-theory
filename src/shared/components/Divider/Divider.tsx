import styles from "./Divider.module.css";

type DividerProps = {
  size?: 1 | 2 | 3;
};

export const Divider = ({ size = 2 }: DividerProps) => {
  return (
    <hr
      className={styles.root}
      style={{
        borderTopWidth: size,
      }}
    />
  );
};
