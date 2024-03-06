export default function Footer() {
  const version = "0.0.1";

  return (
    <>
      <footer className="w-full flex items-center justify-between  fixed bottom-2 px-2 text-default-400 text-[10px]">
        <p>
          desenvolvido por{" "}
          <a
            href="https://www.instagram.com/sxwuell/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @sxwuell
          </a>
        </p>
        <span>versão {version}</span>
      </footer>
    </>
  );
}
