import { RawResource, RawKBResource, Resource } from "@/types/resources.type";

// Map a RawResource (from connections) to our normalized Resource
export function mapRawResource(raw: RawResource): Resource {
  return {
    resource_id: raw.resource_id,
    path: raw.inode_path?.path,
    type: raw.inode_type === "directory" ? "folder" : "file",
    updated_at: raw.updated_at || new Date().toISOString(),
    status: "notIndexed", // default for resources in Drive
  };
}

// Map a RawKBResource (from knowledge bases) to our normalized Resource
export function mapRawKBResource(raw: RawKBResource): Resource {
  let status: Resource["status"] = "notIndexed";
  if (raw.status === "pending") status = "indexing";
  if (raw.status === "indexed") status = "indexed";

  return {
    resource_id: raw.resource_id,
    path: raw.inode_path?.path,
    type: raw.inode_type === "directory" ? "folder" : "file",
    updated_at: raw.updated_at || new Date().toISOString(),
    status,
  };
}
