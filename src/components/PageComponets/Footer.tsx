// react
import React from "react";
import { useTheme } from "next-themes";
// assests - icons
import { Send2 } from "iconsax-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const version = "0.0.1";
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
          href="https://linkedin.com/in/samuelluzsantana"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300"
        >
          <FaLinkedin size={iconSize} className="hover:text-blue-600" />
        </a>

        <a
          href="mailto:your@email.com"
          className="hover:scale-110 transition-transform duration-300"
        >
          <Send2
            variant="Bold"
            size={iconSize}
            className="hover:text-green-600"
          />
        </a>
      </div>
    );
  };

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
