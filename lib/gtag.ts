export const GA_TRACKING_ID: string | undefined = "G-3BWBGYMGHR";

export const pageview = (url: string) => {
  (window as any).gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
