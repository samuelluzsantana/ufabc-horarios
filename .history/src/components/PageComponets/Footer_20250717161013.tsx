// react
import React from "react";
import { useTheme } from "next-themes";
// assests - icons

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { version } from "@/app/config";

export default function Footer() {
  const { theme, setTheme } = useTheme();

  const iconSize = 18;

  const AboutProjectFooter = () => {
    return (
      <div className="flex justify-center items-center gap-[0.9em] py-4">
        <a
          href="https://github.com/samuelluzsantana/ufabc-horarios"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300"
        >
          <FaGithub size={iconSize} className="hover:text-gray-600" />
        </a>

        <a
          href="https://www.linkedin.com/posts/samuelluzsantana_ufabc-projetopessoal-activity-7295079176628244483-RFCC?utm_source=share&utm_medium=member_desktop"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300"
        >
          <FaLinkedin size={iconSize} className="hover:text-blue-600" />
        </a>

        <a
          href="mailto:slsamuelluz@gmail.com"
          className="hover:scale-110 transition-transform duration-300"
        >
          <MdEmail size={iconSize + 2} className="hover:text-green-600" />
        </a>
      </div>
    );
  };

  const pages = [
    {
      title: "início",
      href: "/lista-disciplinas",
    },
    {
      title: "sobre",
      href: "/sobre",
      target: "_self",
    },
    {
      title: "versão",
      href: "/change-log",
      target: "_self",
    },
    {
      title: "????",
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      target: "_blank",
    },
  ];

  return (
    <>
      <footer className="w-full px-2 text-default-400 text-[10px]">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="about-this-project">
            <AboutProjectFooter />
          </div>

          <div className="flex w-full  items-center justify-between">
            <p>
              Desenvolvido por{" "}
              <a
                href="https://www.instagram.com/sxwuell/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @sxwuell
              </a>
            </p>

            <div className="flex gap-4">
              {pages.map((page) => (
                <a
                  key={page.href}
                  href={page.href}
                  target={page.target}
                  className="hover:underline text-default-600"
                >
                  {page.title}
                </a>
              ))}
            </div>

            <span
              onClick={() => {
                setTheme(theme === "light" ? "dark" : "light");
              }}
            >
              versão {version}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
