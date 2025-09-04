import { Integration } from "@/models/integration.model";

export const integrations: Integration[] = [
  {
    id: "files",
    name: "Files",
    icon: "/assets/icon_files.svg",
    totalFiles: 0,
    relEmail: "mpinna@stackai.com",
    isBeta: false,
  },
  {
    id: "slack",
    name: "Slack",
    icon: "/assets/icon_slack.svg",
    totalFiles: 0,
    isBeta: true,
  },
  {
    id: "googleDrive",
    name: "Google Drive",
    icon: "/assets/icon_drive.svg",
    totalFiles: 16,
    relEmail: "mpinna@stackai.com",
    isBeta: true,
  },
  {
    id: "dropbox",
    name: "Dropbox",
    icon: "/assets/icon_dropbox.svg",
    totalFiles: 0,
    relEmail: "mpinna@stackai.com",
    isBeta: true,
  },
  {
    id: "notion",
    name: "Notion",
    icon: "/assets/icon_notion.svg",
    totalFiles: 0,
    isBeta: false,
  },
  {
    id: "office",
    name: "Office 365",
    icon: "/assets/icon_office.svg",
    totalFiles: 0,
    isBeta: true,
  },
];
