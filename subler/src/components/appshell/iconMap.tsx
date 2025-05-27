import {
  IconMusic,
  IconPhoto,
  IconFolder,
  IconVideo,
  IconFile,
  IconBook,
  IconSettings,
  IconCloud,
  IconDatabase,
  IconCode,
  IconDownload,
  IconHttpPost,
} from "@tabler/icons-react";

type IconMap = {
  keywords: string[];
  icon: JSX.Element;
};

const folderTypeIcons: IconMap[] = [
  {
    keywords: ["music", "audio", "songs", "tunes"],
    icon: <IconMusic size={16} />,
  },
  {
    keywords: ["photo", "image", "picture", "img"],
    icon: <IconPhoto size={16} />,
  },
  {
    keywords: ["video", "movie", "clip", "media"],
    icon: <IconVideo size={16} />,
  },
  {
    keywords: ["book", "read", "ebook", "novel"],
    icon: <IconBook size={16} />,
  },
  {
    keywords: ["post", "http", "request", "server", "api"],
    icon: <IconHttpPost size={16} />,
  },
  { keywords: ["code", "project", "src", "app"], icon: <IconCode size={16} /> },
  { keywords: ["cloud", "drive", "sync"], icon: <IconCloud size={16} /> },
  { keywords: ["database", "db", "data"], icon: <IconDatabase size={16} /> },
  {
    keywords: ["setting", "config", "preferences"],
    icon: <IconSettings size={16} />,
  },
  { keywords: ["download", "dl"], icon: <IconDownload size={16} /> },
];

export function getFolderIcon(name: string, isDir: boolean): JSX.Element {
  if (!isDir) return <IconFile size={16} />;

  const lower = name.toLowerCase();

  for (const entry of folderTypeIcons) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.icon;
    }
  }

  return <IconFolder size={16} />;
}
