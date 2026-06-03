import type { AppId } from "@/store/os";

export type FSNode = {
  name: string;
  type: "folder" | "file";
  // for files: which app opens it and an optional content key/payload
  opens?: AppId;
  payload?: string;
  // textual content for .txt files shown in a simple viewer
  content?: string;
  ext?: string;
  children?: FSNode[];
};

export const filesystem: FSNode = {
  name: "C:",
  type: "folder",
  children: [
    {
      name: "Users",
      type: "folder",
      children: [
        {
          name: "Sarthak",
          type: "folder",
          children: [
            {
              name: "About",
              type: "folder",
              children: [
                {
                  name: "readme.txt",
                  type: "file",
                  ext: "txt",
                  opens: "about",
                },
                {
                  name: "whoami.exe",
                  type: "file",
                  ext: "exe",
                  opens: "ai",
                },
              ],
            },
            {
              name: "Projects",
              type: "folder",
              opens: "projects",
              children: [
                {
                  name: "data-analysis-cli.ipynb",
                  type: "file",
                  ext: "ipynb",
                  opens: "projects",
                  payload: "data-cli",
                },
                {
                  name: "prompt-engineering.ipynb",
                  type: "file",
                  ext: "ipynb",
                  opens: "projects",
                  payload: "prompt-eng",
                },
                {
                  name: "student-predictor.ipynb",
                  type: "file",
                  ext: "ipynb",
                  opens: "projects",
                  payload: "student-predictor",
                },
              ],
            },
            {
              name: "Skills",
              type: "folder",
              opens: "skills",
              children: [
                { name: "stack.json", type: "file", ext: "json", opens: "skills" },
              ],
            },
            {
              name: "Certifications",
              type: "folder",
              opens: "certs",
              children: [
                { name: "aws.png", type: "file", ext: "png", opens: "certs" },
                { name: "google-cloud.png", type: "file", ext: "png", opens: "certs" },
              ],
            },
            {
              name: "Experiments",
              type: "folder",
              children: [
                { name: "hello.slang", type: "file", ext: "slang", opens: "slang" },
              ],
            },
            {
              name: "Games",
              type: "folder",
              children: [
                { name: "bug-hunter.exe", type: "file", ext: "exe", opens: "game" },
              ],
            },
            {
              name: "Resume.pdf",
              type: "file",
              ext: "pdf",
              opens: "resume",
            },
            {
              name: "guestbook.exe",
              type: "file",
              ext: "exe",
              opens: "guestbook",
            },
            {
              name: "secrets.txt",
              type: "file",
              ext: "txt",
              content:
                "TOP SECRET // SarthakOS kernel notes\n\n- Coffee is a non-negotiable dependency.\n- Sleep is deprecated, scheduled for removal.\n- Try the terminal command: sudo hire sarthak\n- Ask the Neural Core (SarthakAI) anything.\n- Konami of this OS: type 'matrix' in the terminal.\n\n// end of file",
            },
          ],
        },
      ],
    },
  ],
};

export function resolvePath(path: string[]): FSNode | null {
  let node: FSNode = filesystem;
  for (const part of path) {
    if (!node.children) return null;
    const next = node.children.find((c) => c.name === part);
    if (!next) return null;
    node = next;
  }
  return node;
}
