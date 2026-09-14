"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactForm } from "./elements/ContactForm/ContactForm";

import styles from "./ContactSection.module.css";
import { ContactFormData, validationSchema } from "./elements/ContactForm/validationSchema";
import { Toast } from "@/shared/components/Toast";
import { getDirectionalVars, isReducedMotion } from "@/shared/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingLabelRef = useRef<HTMLDivElement>(null);
  const headingTitleRef = useRef<HTMLHeadingElement>(null);
  const headingAsideRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);
  const cardHeadingRef = useRef<HTMLDivElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      // 1. Heading label: LEFT -> FINAL
      if (headingLabelRef.current) {
        const labelVars = getDirectionalVars("left", {
          distance: 50,
          duration: 0.85,
        });
        tl.fromTo(headingLabelRef.current, labelVars.from, labelVars.to, 0);
      }

      // 2. Main Title: TOP-LEFT -> FINAL (deliberate diagonal entrance from outside composition)
      if (headingTitleRef.current) {
        const titleVars = getDirectionalVars("topLeft", {
          distance: 70,
          duration: 0.95,
        });
        tl.fromTo(headingTitleRef.current, titleVars.from, titleVars.to, 0.1);
      }

      // 3. Supporting text: LEFT -> FINAL (creates visual balance)
      if (headingAsideRef.current) {
        const asideVars = getDirectionalVars("left", {
          subtle: true,
          duration: 0.85,
        });
        tl.fromTo(headingAsideRef.current, asideVars.from, asideVars.to, 0.22);
      }

      // 4. Contact Card inner heading: TOP-LEFT -> FINAL
      if (cardHeadingRef.current) {
        const h3 = cardHeadingRef.current.querySelector("h3");
        const p = cardHeadingRef.current.querySelector("p");

        if (h3) {
          const h3Vars = getDirectionalVars("topLeft", {
            distance: 50,
            duration: 0.9,
          });
          tl.fromTo(h3, h3Vars.from, h3Vars.to, 0.28);
        }

        if (p) {
          const pVars = getDirectionalVars("left", {
            subtle: true,
            duration: 0.85,
          });
          tl.fromTo(p, pVars.from, pVars.to, 0.38);
        }
      }

      // 5. Form container: RIGHT -> FINAL POSITION
      if (formWrapperRef.current) {
        const formVars = getDirectionalVars("right", {
          distance: 60,
          duration: 0.95,
        });
        tl.fromTo(formWrapperRef.current, formVars.from, formVars.to, 0.32);

        // 6. Form fields appear progressively with controlled alternating directions
        const reduced = isReducedMotion();
        if (!reduced) {
          const formRows = formWrapperRef.current.querySelectorAll(`[class*="formRow"]`);
          let fieldDelay = 0.44;

          formRows.forEach((row) => {
            const firstChild = row.children[0] as HTMLElement | undefined;
            const secondChild = row.children[1] as HTMLElement | undefined;

            if (firstChild) {
              const leftVars = getDirectionalVars("left", {
                distance: 22,
                duration: 0.75,
              });
              tl.fromTo(firstChild, leftVars.from, leftVars.to, fieldDelay);
            }

            if (secondChild) {
              const rightVars = getDirectionalVars("right", {
                distance: 22,
                duration: 0.75,
              });
              tl.fromTo(secondChild, rightVars.from, rightVars.to, fieldDelay + 0.05);
            }

            fieldDelay += 0.1;
          });

          // Textarea (Message field): RIGHT -> FINAL
          const textareaWrapper = formWrapperRef.current.querySelector(
            `form > [class*="textarea"], form > [class*="root"]:not([class*="formRow"])`,
          );
          if (textareaWrapper) {
            const areaVars = getDirectionalVars("right", {
              distance: 22,
              duration: 0.75,
            });
            tl.fromTo(textareaWrapper, areaVars.from, areaVars.to, fieldDelay);
            fieldDelay += 0.08;
          }

          // Submit button: slight upward movement (BOTTOM -> FINAL)
          const submitBtn = formWrapperRef.current.querySelector(`button[type="submit"]`);
          if (submitBtn) {
            const btnVars = getDirectionalVars("bottom", {
              distance: 18,
              duration: 0.75,
            });
            tl.fromTo(submitBtn, btnVars.from, btnVars.to, fieldDelay);
          }
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const methods = useForm<ContactFormData>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      workEmail: "",
      companyName: "",
      designation: "",
      businessOverview: "",
      consultationDate: "",
    },
  });

  const handleSubmit = async (values: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to submit form");
      }
      Toast.success("Thank you! We’ll get back to you shortly.");
      methods.reset();
    } catch {
      Toast.error("We couldn’t send your message. Please try again later.");
    }
  };

  return (
    <section ref={sectionRef} id="contact" className={styles.section}>
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        <div ref={headingLabelRef} className={styles.headingLabel}>
          <span className={styles.headingLine} />
          <span>LET&apos;S CONNECT</span>
        </div>

        <div className={styles.headingRow}>
          <h2 ref={headingTitleRef} className={styles.title}>
            Let&apos;s make
            <br />
            <span>something</span>
            <br />
            unmissable.
          </h2>

          <div ref={headingAsideRef} className={styles.headingAside}>
            <p className={styles.description}>
              Tell us about your business, your goals, and where you want to go next. Let&apos;s
              explore how we can help you grow.
            </p>
          </div>
        </div>

        <div ref={contactCardRef} className={styles.contactCard}>
          <div className={styles.cardContent}>
            <div ref={cardHeadingRef} className={styles.cardHeading}>
              <h3>
                Ready when
                <br />
                <span>you are.</span>
              </h3>

              <p>
                Share a few details about your business and preferred consultation date. Our team
                will get back to you to discuss your goals.
              </p>
            </div>

            <div ref={formWrapperRef}>
              <ContactForm methods={methods} onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
