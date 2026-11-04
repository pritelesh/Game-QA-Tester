import fs from "fs";
import path from "path";

/**
 * Gallery manifest builder
 * ------------------------
 * Reads /public/Gallery at build/prerender time. Every subfolder is treated
 * as one project; the screenshots inside become its image list. Sorted A-Z,
 * so dropping a new folder into /public/Gallery is enough to add a project —
 * no code changes required.
 */

export interface GalleryProject {
  /** Folder name, used as stable key/slug. */
  slug: string;
  /** Human-readable title derived from the folder name. */
  title: string;
  /** Public, URL-encoded image paths for every screenshot found. */
  images: string[];
}

const IMAGE_EXTENSIONS = /\.(png|jpe?g|webp|avif|gif)$/i;

function toTitle(slug: string): string {
  /* "Bellyfull" -> "Bellyfull", "kebabworld" -> "Kebabworld" */
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export function getGalleryProjects(): GalleryProject[] {
  const galleryDir = path.join(process.cwd(), "public", "Gallery");

  let folderNames: string[] = [];
  try {
    folderNames = fs
      .readdirSync(galleryDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    console.warn("[gallery] /public/Gallery not found — returning empty list");
    return [];
  }

  return folderNames.map((slug) => {
    const projectDir = path.join(galleryDir, slug);
    const images = fs
      .readdirSync(projectDir)
      .filter((file) => IMAGE_EXTENSIONS.test(file))
      .sort()
      .map(
        (file) =>
          `/Gallery/${encodeURIComponent(slug)}/${encodeURIComponent(file)}`,
      );

    return { slug, title: toTitle(slug), images };
  });
}
