### **Checklist para o PM**

1. [x] Corrigir esquema de URL
2. [x] Salvar predefinições de filtragem no cookie
3. [ ] Design para mostrar disciplinas selecionadas
4. [x] Conflict filtering option for discipline selection - IAAAAAAAAA revisa isso aqui slk
5. [ ] Filtragem por cursos (obrigatoriedade)
6. [ ] Exibição do total de créditos disponíveis
7. [ ] Página "Sobre"
8. [ ] Página de Change-log
9. [ ] Exibir disciplinas do curso
10. [ ] Suporte a temas
11. [ ] Exibição para mobile
12. [ ] Baixar disciplinas em PNG
13. [ ] Baixar formato calendário
14. [ ] Separar função de filtragem
15. [ ] Google Analytics

### **Tarefas para Desenvolvimento**

#### 1. **Corrigir Esquema de URL** [Concluído]

- Revisar e corrigir o esquema de URL utilizado para navegação e carregamento de dados.
- Garantir que os parâmetros sejam manipulados corretamente, eliminando problemas de codificação ou falhas de carregamento.

---

#### 2. **Salvar Predefinições de Filtragem no Cookie**

- Implementar um mecanismo para armazenar filtros aplicados pelo usuário em cookies do navegador.
- Os filtros devem ser automaticamente reaplicados na próxima visita.
- Garantir a conformidade com as normas de privacidade (ex: LGPD).

---

#### 3. **Design para Mostrar Disciplinas Selecionadas**

- Criar um componente visual para listar as disciplinas escolhidas pelo usuário.
- Incluir informações como nome, horário, créditos e botão para remoção.
- Garantir que o layout seja responsivo.

---

#### 4. **Filtragem por Cursos (Obrigatoriedade)**

- Adicionar um filtro que permita ao usuário selecionar disciplinas com base na obrigatoriedade do curso.
- Incluir opções como "Obrigatório", "Limitada" e "Optativa".
- Garantir que a interface seja intuitiva para seleção de filtros.

---

#### 5. **Exibição do Total de Créditos Disponíveis**

- Calcular e exibir o total de créditos que o usuário pode cursar com base nas disciplinas selecionadas.
- Atualizar dinamicamente à medida que o usuário seleciona/deseleciona disciplinas.

---

#### 6. **Página "Sobre" (About Page)**

- Criar uma página informativa explicando o objetivo do projeto, tecnologias utilizadas e os desenvolvedores envolvidos.
- Garantir design coeso com o restante da aplicação.

---

#### 7. **Página de Change-log**

- Implementar uma página para exibir o histórico de atualizações do sistema.
- Adicionar informações como data da atualização, melhorias realizadas e bugs corrigidos.

---

#### 8. **Exibir Disciplinas do Curso**

- Implementar uma funcionalidade que permite ao usuário colar uma lista de disciplinas de um curso e exibi-las organizadas.
- Garantir que a lista seja renderizada corretamente e que haja feedback caso haja erros no formato.

---

#### 9. **Suporte a Temas**

- Adicionar funcionalidade para alternar entre diferentes temas (ex: claro/escuro).
- Garantir persistência da configuração selecionada.

---

#### 10. **Exibição para Mobile**

- Para dispositivos móveis, ajustar a interface para mostrar apenas:
  - Disciplinas do dia atual.
  - Disciplinas dos próximos 3 dias.
  - Garantir que a navegação seja clara e responsiva.

---

#### 11. **Baixar Disciplinas em PNG**

- Adicionar funcionalidade para exportar o planejamento de duas semanas em formato PNG.
- Garantir alta qualidade da imagem gerada e que os dados estejam organizados.

---

#### 12. **Baixar Formato Calendário**

- Implementar exportação do planejamento para formatos de calendário, como `.ics`.
- Garantir compatibilidade com ferramentas como Google Calendar e Outlook.

---

#### 13. **Separar Função de Filtragem**

- Refatorar a lógica de filtragem para um serviço ou função separada.
- Garantir que o componente de renderização apenas receba os resultados da filtragem, tornando-o mais simples e reutilizável.

---

#### 14. **Google Analytics**

- Integrar Google Analytics para monitorar o comportamento do usuário no sistema.
- Adicionar rastreamento para eventos-chave, como seleção de filtros e download de arquivos.

---

### **Visão Ampla sobre o Desenvolvimento**

O objetivo das tarefas é melhorar a experiência do usuário, aumentar a funcionalidade do sistema e garantir a escalabilidade e reutilização do código. As tarefas estão organizadas em três pilares principais: **funcionalidade**, **design/UX** e **infraestrutura técnica**.

---

### **Detalhamento por Tópicos**

#### **Funcionalidade**

- Salvar predefinições de filtragem no cookie.
- Filtragem por cursos com base em obrigatoriedade.
- Exibir total de créditos disponíveis dinamicamente.
- Adicionar exportação para PNG e formato de calendário.

#### **Design e UX**

- Design para mostrar disciplinas selecionadas.
- Página "Sobre" e página de Change-log.
- Exibição para mobile com foco em disciplinas do dia ou próximos 3 dias.
- Suporte a temas para personalização.

#### **Infraestrutura Técnica**

- Separar função de filtragem para modularidade.
- Integrar Google Analytics para monitoramento de uso.

Esse planejamento garante uma abordagem clara e orientada a resultados, com foco em priorizar entregas de maior impacto para o usuário.

- tab para proximas materias tipó isso https://dribbble.com/shots/23693492-Edtech-App-Concept em "upcomming testes"
