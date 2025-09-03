import Image from "next/image";
import { SidenavButton } from "./SidenavButton";
import { Integration } from "@/app/models/Integration.model";

const integrations: Integration[] = [
  {
    name: "Files",
    icon: "/assets/icon_files.svg",
    qty: 0,
  },
  {
    name: "Slack",
    icon: "/assets/icon_slack.svg",
    qty: 0,
  },
  {
    name: "Google Drive",
    icon: "/assets/icon_drive.svg",
    qty: 0,
  },
  {
    name: "Dropbox",
    icon: "/assets/icon_dropbox.svg",
    qty: 0,
  },
  {
    name: "Notion",
    icon: "/assets/icon_notion.svg",
    qty: 0,
  },
  {
    name: "Office 365",
    icon: "/assets/icon_office.svg",
    qty: 0,
  },
];

export function Sidenav() {
  return (
    <nav className="flex h-screen w-60 flex-col border-r border-gray-200 bg-gray-100">
      <div className="start flex h-15 w-full flex-none content-center items-center justify-between gap-1 border-b border-gray-200 px-5">
        <Image
          className="h-auto w-full max-w-22 object-contain"
          src="/assets/stack_ai_brand.svg"
          width={1}
          height={1}
          priority
          alt={"Stack AI"}
        />
      </div>

      <div className="w-full overflow-y-auto">
        <ul className="gap- flex flex-col p-2 pt-4">
          {integrations.map((integration: Integration) => (
            <SidenavButton
              key={integration.name}
              icon={integration.icon}
              name={integration.name}
              qty={integration.qty}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}
