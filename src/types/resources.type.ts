export type RawResource = {
  resource_id: string;
  inode_path: { path: string };
  inode_type: "directory" | "file";
  updated_at: string;
};

export type Resource = {
  resource_id: string;
  path: string;
  type: "folder" | "file";
  updated_at: string;
};
