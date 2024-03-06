export default function Footer() {
    const version = '0.0.1';
  
    return (
      <>
        <footer className="w-full flex items-center justify-end fixed bottom-2 pr-2 ">
          <span className="text-default-400 text-[10px]">versão {version}</span>
        </footer>
      </>
    );
  }
  