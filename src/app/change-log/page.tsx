"use client";

import { useState } from "react";
import { Button, Card, Progress } from "@heroui/react";
import { useRouter } from "next/navigation";
import Header from "@/components/PageComponets/Header";
import Footer from "@/components/PageComponets/Footer";
import { ClipboardText, Cup, Hierarchy } from "iconsax-react";
import { version } from "@/app/config";
import GitHubButton from "react-github-btn";

interface ChangelogSectionProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}

const ChangelogSection: React.FC<ChangelogSectionProps> = ({
  title,
  children,
  icon,
  className = "",
}) => (
  <div className={`w-full max-w-4xl mx-auto mb-8 ${className}`}>
    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
      <div className="flex gap-2 items-center">
        {icon}
        {title}
      </div>
    </h2>
    {children}
  </div>
);

export default function Changelog() {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const progresso = 67;

  const completedFeatures = [
    "Corrigir esquema de URL",
    "Salvar predefinições de filtragem no cookie",
    "Design para mostrar disciplinas selecionadas",
    "Opção de filtragem para conflitos de seleção de disciplinas",
  ];

  const upcomingFeatures = [
    "Filtragem por cursos (obrigatoriedade)",
    "Exibição do total de créditos disponíveis",
    "Exibir disciplinas do curso",
    "Suporte a temas (claro/escuro)",
    "Exibição otimizada para mobile",
    "Exportar disciplinas em PNG",
    "Exportar planejamento no formato de calendário (.ics)",
    "Refatorar função de filtragem para modularidade",
    "Integração com Google Analytics",
    "App Mobile?",
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <Header isLogoHover={isHover}>
        <Button
          className="text-white bg-[#18181b] dark:bg-[#27272a] hover:bg-[#00007c] dark:hover:bg-[#00007c]"
          radius="sm"
          aria-label="Go to Home"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={() => router.back()}
        >
          Voltar
        </Button>
      </Header>

      <div className="w-full flex-grow flex flex-col items-center p-6">
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-justify mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              UFABC-Horários - Nota de Atualização
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Olá, aqui é o{" "}
              <a
                href="https://instagram.com/sxwuell"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                @sxwuell
              </a>
              . Atualmente, o UFABC-Horários está em versão beta ฅ^•ﻌ•^ฅ e em
              período de testes. Sinta-se à vontade para sugerir melhorias ou
              funcionalidades!
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Meu objetivo é finalizar todas as melhorias até o 2º quadrimestre
              deste ano, com foco em ajudar ingressantes (^_^)/. Considere
              colaborar no{" "}
              <a
                href="https://github.com/samuelluzsantana"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>{" "}
              e deixe sua estrela para apoiar o desenvolvimento!
            </p>
            <div className="w-full flex justify-start mt-4">
              <GitHubButton
                href="https://github.com/samuelluzsantana/ufabc-horarios"
                data-color-scheme="no-preference: light; light: light; dark: dark;"
                data-icon="octicon-star"
                data-size="large"
                aria-label="Star samuelluzsantana/ufabc-horarios on GitHub"
              >
                Star
              </GitHubButton>
            </div>
          </div>

          <div className=" rounded-lg mb-8">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              versão ── .✦ {version} ──────
            </h1>

            <div className="flex gap-2 items-center">
              <Cup size="32" variant="Bold" />
              <p className="text-lg font-bold">
                Progresso Atual: {progresso}% concluído ..
              </p>
            </div>
            <Progress
              value={progresso}
              size="lg"
              color="primary"
              className="mt-2"
            />
          </div>

          <ChangelogSection
            title="Funcionalidades Implementadas"
            icon={<ClipboardText size="32" variant="Bold" />}
          >
            <ul className="list-disc pl-6">
              {completedFeatures.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </ChangelogSection>

          <ChangelogSection
            title="Melhorias Futuras"
            icon={<Hierarchy size="32" variant="Bold" />}
          >
            <ul className="list-disc pl-6">
              {upcomingFeatures.map((item, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </ChangelogSection>

          <div className="text-center">
            <Card className="p-4">
              <p className="text-gray-600 dark:text-gray-400">
                Sua opinião é muito importante! Envie suas ideias e feedbacks.
              </p>

              <div className="w-full">
                <Button
                  className="mt-8 text-white bg-[#18181b] dark:bg-[#27272a] hover:bg-[#00007c] dark:hover:bg-[#00007c]"
                  onClick={() =>
                    window.open("mailto:slsamuelluz@gmail.com", "_blank")
                  }
                >
                  Entre em Contato
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
