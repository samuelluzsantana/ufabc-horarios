/**
 * Remove elementos duplicados de um array
 * @param lista Array de qualquer tipo
 * @returns Novo array sem elementos duplicados
 */
export function removeDuplicatas<T>(lista: T[]): T[] {
  return Array.from(new Set(lista));
}

/**
 * Remove elementos duplicados de um array baseado em uma propriedade específica
 * @param lista Array de objetos
 * @param chave Nome da propriedade para comparação
 * @returns Novo array sem elementos duplicados
 */
export function removeDuplicatasPorChave<T extends object>(
  lista: T[],
  chave: keyof T
): T[] {
  const seen = new Set();
  return lista.filter((item) => {
    const valor = item[chave];
    if (seen.has(valor)) {
      return false;
    }
    seen.add(valor);
    return true;
  });
}
