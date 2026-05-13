/**
 * Remove elementos duplicados de um array baseado em múltiplas propriedades
 * @param array Array de objetos
 * @param chaves Nome das propriedades para comparação
 * @returns Novo array sem elementos duplicados
 */
export const removeDuplicatasPorChave = (
  array: any[],
  chaves: string[]
): any[] => {
  const vistos = new Set();
  return array.filter((item) => {
    const chave = chaves.map((key) => item[key]).join("|");
    if (vistos.has(chave)) {
      return false;
    }
    vistos.add(chave);
    return true;
  });
};
