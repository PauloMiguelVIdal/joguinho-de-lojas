export const FARM_COW_FORMULAS = [
  {
    id: "reproducao",
    nome: "Reprodução",
    input: { vaca: 1, racaoDeVacas: 2 },
    output: { vaca: 2 },
    duracao: 30,
  },
  {
    id: "abate",
    nome: "Abate",
    input: { vaca: 1 },
    output: { 
      couro: 5, 
      // carneBovina: 300 
    },
    duracao: 3,
  },
];
