import type { AppId } from "@/store/os";

export type FSNode = {
  name: string;
  type: "folder" | "file";
  opens?: AppId;
  payload?: string;
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
                { name: "readme.txt", type: "file", ext: "txt", opens: "about" },
                { name: "contact.vcf", type: "file", ext: "vcf", opens: "about" },
              ],
            },
            {
              name: "Experience",
              type: "folder",
              opens: "experience",
              children: [
                {
                  name: "VECV-internship.ipynb",
                  type: "file",
                  ext: "ipynb",
                  opens: "experience",
                },
              ],
            },
            {
              name: "Projects",
              type: "folder",
              opens: "projects",
              children: [
                {
                  name: "damage-vision.ipynb",
                  type: "file",
                  ext: "ipynb",
                  opens: "projects",
                  payload: "damage-vision",
                },
                {
                  name: "demand-forecasting.ipynb",
                  type: "file",
                  ext: "ipynb",
                  opens: "projects",
                  payload: "demand-forecasting",
                },
                {
                  name: "csvpi.ipynb",
                  type: "file",
                  ext: "ipynb",
                  opens: "projects",
                  payload: "csvpi",
                },
                {
                  name: "student-sphere.ipynb",
                  type: "file",
                  ext: "ipynb",
                  opens: "projects",
                  payload: "student-sphere",
                },
              ],
            },
            {
              name: "Skills",
              type: "folder",
              opens: "skills",
              children: [{ name: "stack.json", type: "file", ext: "json", opens: "skills" }],
            },
            {
              name: "Certifications",
              type: "folder",
              opens: "certs",
              children: [
                { name: "aws.png", type: "file", ext: "png", opens: "certs" },
                { name: "ibm-cisco.png", type: "file", ext: "png", opens: "certs" },
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
              children: [{ name: "bug-hunter.exe", type: "file", ext: "exe", opens: "game" }],
            },
            { name: "Resume.pdf", type: "file", ext: "pdf", opens: "resume" },
            { name: "guestbook.exe", type: "file", ext: "exe", opens: "guestbook" },
            {
              name: "secrets.txt",
              type: "file",
              ext: "txt",
              content:
                "TOP SECRET // SarthakOS kernel notes\n\n- Coffee is a non-negotiable dependency.\n- Sleep is deprecated, scheduled for removal.\n- Try the terminal command: sudo hire sarthak\n- Ask the Neural Core (SarthakAI) anything.\n- Type 'matrix' in the terminal for a themed experience.\n\n// end of file",
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
