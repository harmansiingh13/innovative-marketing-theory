"use client";

import React, { forwardRef } from "react";
import styles from "./MobileEmulator.module.css";

export interface MobileEmulatorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Status bar time, default: "9:41" */
  time?: string;
  /** Battery / network content or preset ("text" for "5G 100%", "battery" for icon + 5G) */
  networkAndBattery?: "text" | "battery" | React.ReactNode;
  /**
   * "solid" (default) takes status bar height (42px) in normal flow above children.
   * "overlay" floats status bar transparently above full-bleed media (reels/video).
   */
  statusBarVariant?: "solid" | "overlay";
  /** Dynamic Island right indicator: "amber" (default), "wave", or "none" */
  islandIndicator?: "amber" | "wave" | "none";
  /** Whether to show status bar (Dynamic Island + Time + Battery), default: true */
  showStatusBar?: boolean;
  /** Whether to show the bottom home indicator pill bar, default: true */
  showHomeBar?: boolean;
  /** Enable hover lift animation, default: true */
  interactiveHover?: boolean;
  /** Optional custom width */
  width?: number | string;
  /** Optional custom height */
  height?: number | string;
  /** Optional custom class for screen viewport container */
  screenClassName?: string;
  /** Optional screen container style */
  screenStyle?: React.CSSProperties;
}

export const MobileEmulator = forwardRef<HTMLDivElement, MobileEmulatorProps>(
  (
    {
      children,
      className,
      style,
      time = "9:41",
      networkAndBattery = "text",
      statusBarVariant = "solid",
      islandIndicator = "amber",
      showStatusBar = true,
      showHomeBar = true,
      interactiveHover = true,
      width,
      height,
      screenClassName,
      screenStyle,
      ...restProps
    },
    ref,
  ) => {
    const frameStyle: React.CSSProperties = {
      ...(width !== undefined ? { width } : {}),
      ...(height !== undefined ? { height } : {}),
      ...style,
    };

    const isOverlay = statusBarVariant === "overlay";

    return (
      <div
        ref={ref}
        className={`${styles.phoneFrame} ${
          interactiveHover ? styles.interactiveHover : ""
        } ${className || ""}`}
        style={frameStyle}
        {...restProps}
      >
        {/* Dynamic Island */}
        {showStatusBar && (
          <div className={styles.dynamicIsland} aria-hidden="true">
            <span className={styles.islandDot} />
            {islandIndicator === "amber" && <span className={styles.islandPill} />}
            {islandIndicator === "wave" && <span className={styles.islandWave} />}
          </div>
        )}

        {/* Native Status Bar */}
        {showStatusBar && (
          <div
            className={`${styles.statusBar} ${isOverlay ? styles.statusBarOverlay : ""}`}
            aria-hidden="true"
          >
            <span className={styles.statusTime}>{time}</span>
            <div className={styles.statusNetworkBattery}>
              {networkAndBattery === "text" && <span>5G 100%</span>}
              {networkAndBattery === "battery" && (
                <>
                  <span>5G</span>
                  <span className={styles.batteryIcon}>
                    <span className={styles.batteryLevel} />
                  </span>
                </>
              )}
              {networkAndBattery !== "text" && networkAndBattery !== "battery" && networkAndBattery}
            </div>
          </div>
        )}

        {/* Screen Viewport Container */}
        <div
          className={`${
            isOverlay ? styles.screenContainerOverlay : styles.screenContainer
          } ${screenClassName || ""}`}
          style={screenStyle}
        >
          {children}
        </div>

        {/* Home Indicator Bar */}
        {showHomeBar && <div className={styles.phoneHomeBar} aria-hidden="true" />}
      </div>
    );
  },
);

MobileEmulator.displayName = "MobileEmulator";
export default MobileEmulator;
