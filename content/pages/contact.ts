import { pageContent } from "@/lib/content";

export const contactPageContent = {
  ...pageContent.contact,
  responseWindow: "Replies usually land within two business days.",
} as const;
