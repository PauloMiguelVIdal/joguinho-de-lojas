export const FORMULAS_EDIFICIOS = [
  // ═══════════════════════════════════════════════════════
  // AGRICULTURA
  // Custo edifício: R$120k → teto por ciclo: ~R$480k
  // Duração realista: ciclos agrícolas reais
  // Receita por ciclo (1 run): milho = 20×250 - 5×100 = R$4.500
  // Cap 100 → R$450k por ciclo → OK dentro do teto
  // ═══════════════════════════════════════════════════════
  {
    edificioId: "plantaçãoGrãos",
    nomeEdificio: "Plantação De Grãos",
    setor: "agricultura",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "plantação_milho",
        nome: "Plantação De Milho",
        capacidadePorEdificio: 100, // 100 runs × R$4.500 lucro = R$450k/ciclo
        duracao: 90,               // Milho: ~90 dias (realista)
        input:  { sementeMilho: 10, fertilizantePlantação: 1 },
        output: { milho: 20, sementeMilho: 5 },
      },
      {
        id: "plantação_trigo",
        nome: "Plantação De Trigo",
        capacidadePorEdificio: 100,
        duracao: 100,              // Trigo: ~100 dias
        input:  { sementeTrigo: 10, fertilizantePlantação: 1 },
        output: { trigo: 20, sementeTrigo: 5 },
      },
      {
        id: "plantação_soja",
        nome: "Plantação De Soja",
        capacidadePorEdificio: 100,
        duracao: 120,              // Soja: 90-150 dias
        input:  { sementeSoja: 10, fertilizantePlantação: 1 },
        output: { soja: 20, sementeSoja: 5 },
      },
      {
        id: "plantação_algodão",
        nome: "Plantação De Algodão",
        capacidadePorEdificio: 100,
        duracao: 150,              // Algodão: 150-180 dias
        input:  { sementeAlgodão: 10, fertilizantePlantação: 1 },
        output: { algodão: 20, sementeAlgodão: 5 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // Fazenda De Vacas — R$400k → teto ~R$1.6M/ciclo
  // ═══════════════════════════════════════════════════════
  {
    edificioId: "fazendaVacas",
    nomeEdificio: "Fazenda De Vacas",
    setor: "agricultura",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "reproducao_vacas",
        nome: "Reprodução",
        capacidadePorEdificio: 20,  // Rebanho pequeno — biologicamente limitado
        duracao: 270,               // Gestação bovina ~9 meses
        input:  { vaca: 2, racaoDeVacas: 5 },
        output: { vaca: 3, esterco: 10 },
      },
      {
        id: "abate_vacas",
        nome: "Abate",
        capacidadePorEdificio: 80,  // 80 runs × (6×400 + 10×250) = ~R$392k
        duracao: 30,
        input:  { vaca: 1 },
        output: { couro: 6, carneBovina: 10 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // Granja De Aves — R$200k → teto ~R$800k/ciclo
  // ═══════════════════════════════════════════════════════
  {
    edificioId: "granjaAves",
    nomeEdificio: "Granja De Aves",
    setor: "agricultura",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "reproducao_aves",
        nome: "Reprodução",
        capacidadePorEdificio: 50,
        duracao: 45,               // ~45 dias para frango de corte
        input:  { galinha: 10, racaoDeAves: 5 },
        output: { galinha: 30 },
      },
      {
        id: "abate_aves",
        nome: "Abate",
        capacidadePorEdificio: 500, // 500 × 8 × 120 = R$480k → dentro do teto
        duracao: 14,
        input:  { galinha: 1 },
        output: { frango: 8 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // Criação De Ovinos — R$180k → teto ~R$720k/ciclo
  // ═══════════════════════════════════════════════════════
  {
    edificioId: "criaçãoOvinos",
    nomeEdificio: "Criação De Ovinos",
    setor: "agricultura",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "reproducao_ovinos",
        nome: "Reprodução",
        capacidadePorEdificio: 30,
        duracao: 150,              // Gestação ovina ~150 dias
        input:  { ovelha: 2, racaoDeOvinos: 5 },
        output: { ovelha: 3, esterco: 10 },
      },
      {
        id: "abate_ovinos",
        nome: "Abate",
        capacidadePorEdificio: 80, // 80 × 15 × 180 = R$216k
        duracao: 21,
        input:  { ovelha: 1 },
        output: { carneOvino: 15 },
      },
      {
        id: "lã_ovinos",
        nome: "Lã",
        capacidadePorEdificio: 150, // 150 × 5 × 400 = R$300k
        duracao: 90,               // Tosquia 1-2x ao ano
        input:  { ovelha: 1 },
        output: { ovelha: 1, lã: 5 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // Plantação De Eucalipto — R$140k → teto ~R$560k/ciclo
  // ═══════════════════════════════════════════════════════
  {
    edificioId: "plantaçãoEucalipto",
    nomeEdificio: "Plantação De Eucalipto",
    setor: "agricultura",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "reproducao_eucalipto",
        nome: "Crescimento Eucalipto",
        capacidadePorEdificio: 20,
        duracao: 365,              // Eucalipto cresce em ~5-7 anos, simplificado 1 ano/ciclo
        input:  { arvoreEucalipto: 4, fertilizanteFlorestal: 10 },
        output: { arvoreEucalipto: 20 },
      },
      {
        id: "derrubar_eucalipto",
        nome: "Explorar Nativa",
        capacidadePorEdificio: 60,
        duracao: 30,
        input:  { arvoreNativa: 1 },
        output: { toraNativa: 5 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // Serraria — (parte da madeireira R$400k) → teto ~R$1.6M/ciclo
  // ═══════════════════════════════════════════════════════
  {
    edificioId: "serraria",
    nomeEdificio: "Serraria",
    setor: "agricultura",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "cortar_eucalipto",
        nome: "Serrar Nativa",
        capacidadePorEdificio: 80,
        duracao: 20,
        input:  { toraNativa: 4 },
        output: { cavacoMadeiraNativa: 20, serragem: 10 },
      },
      {
        id: "cortar_nativo",
        nome: "Cortar Eucalipto em Toras",
        capacidadePorEdificio: 80,
        duracao: 15,
        input:  { arvoreEucalipto: 1 },
        output: { toraEucalipto: 5, serragem: 10 },
      },
      {
        id: "descascar_eucalipto",
        nome: "Serrar Nativa (Toras)",
        capacidadePorEdificio: 80,
        duracao: 20,
        input:  { arvoreNativa: 1 },
        output: { toraNativa: 4, serragem: 10 },
      },
      {
        id: "descascar_nativo",
        nome: "Cavaco De Eucalipto",
        capacidadePorEdificio: 80,
        duracao: 15,
        input:  { toraEucalipto: 4 },
        output: { cavacoEucalipto: 20, serragem: 10 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // INDÚSTRIA LEVE
  // ═══════════════════════════════════════════════════════

  // Fábrica De Rações — R$180k → teto ~R$720k/ciclo
  // 1 run ração ovinos: 100 × 180 = R$18k → cap 40 = R$720k ✓
  {
    edificioId: "FábricaRações",
    nomeEdificio: "Fábrica De Rações",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "ração_ovinos",
        nome: "Produção Ração Ovinos",
        capacidadePorEdificio: 40,
        duracao: 15,
        input:  { milho: 25, trigo: 25 },
        output: { racaoDeOvinos: 100 },
      },
      {
        id: "ração_porco",
        nome: "Produção Ração Porco",
        capacidadePorEdificio: 40,
        duracao: 15,
        input:  { milho: 35, trigo: 15 },
        output: { racaoDePorco: 100 },
      },
      {
        id: "ração_vacas",
        nome: "Produção Ração Vacas",
        capacidadePorEdificio: 40,
        duracao: 15,
        input:  { milho: 22, trigo: 28 },
        output: { racaoDeVacas: 100 },
      },
      {
        id: "ração_aves",
        nome: "Produção Ração Aves",
        capacidadePorEdificio: 40,
        duracao: 15,
        input:  { milho: 30, trigo: 20 },
        output: { racaoDeAves: 100 },
      },
    ],
  },

  // Fábrica De Fertilizantes — custo baixo → teto conservador
  // 1 run: 2 × 2000 = R$4k → cap 50 = R$200k
  {
    edificioId: "fábricaFertilizante",
    nomeEdificio: "Fábrica De Fertilizantes",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "fertilizante_plantação",
        nome: "Produção Fertilizante De Plantação",
        capacidadePorEdificio: 50,
        duracao: 20,
        input:  { esterco: 20 },
        output: { fertilizantePlantação: 2 },
      },
      {
        id: "fertilizante_florestal",
        nome: "Produção Fertilizante Florestal",
        capacidadePorEdificio: 50,
        duracao: 20,
        input:  { esterco: 20 },
        output: { fertilizanteFlorestal: 2 },
      },
    ],
  },

  // Fábrica De Celulose — R$600k → teto ~R$2.4M/ciclo
  // 1 run eucalipto: 25×4200 + 5×4000 = R$125k → cap 19 = R$2.37M ✓
  {
    edificioId: "fábricaCelulose",
    nomeEdificio: "Fábrica De Celulose",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "celulose_eucalipto",
        nome: "Produção Celulose Por Eucalipto",
        capacidadePorEdificio: 19,
        duracao: 45,
        input:  { cavacoEucalipto: 40, sodaCáustica: 5, ácidoSulfúrico: 2 },
        output: { fardoCelulose: 25, biomassaLíquida: 5 },
      },
      {
        id: "celulose_Nativa",
        nome: "Produção Celulose Por Madeira Nativa",
        capacidadePorEdificio: 15,
        duracao: 45,
        input:  { cavacoMadeiraNativa: 60, sodaCáustica: 10, ácidoSulfúrico: 5 },
        output: { fardoCelulose: 15, biomassaLíquida: 25 },
      },
    ],
  },

  // Fábrica De Papel — R$500k → teto ~R$2M/ciclo
  // Kraft: 60×4200 = R$252k → cap 7 = R$1.76M ✓
  {
    edificioId: "fábricaPapel",
    nomeEdificio: "Fábrica De Papel",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "papel_kraft",
        nome: "Produção De Papel Kraft",
        capacidadePorEdificio: 7,
        duracao: 30,
        input:  { fardoCelulose: 20 },
        output: { bobinaKraft: 60 },
      },
      {
        id: "papel_branco",
        nome: "Produção De Papel Branco",
        capacidadePorEdificio: 6,
        duracao: 30,
        input:  { fardoCelulose: 20, cloro: 10 },
        output: { bobinaBranco: 45 },
      },
    ],
  },

  // Fábrica De Livros — R$450k → teto ~R$1.8M/ciclo
  // Livro Comum: 200×150 = R$30k → cap 60 = R$1.8M ✓
  {
    edificioId: "fábricaLivros",
    nomeEdificio: "Fábrica De Livros",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "livro_comum",
        nome: "Produção De Livro Comum",
        capacidadePorEdificio: 60,
        duracao: 20,
        input:  { bobinaBranco: 1, tintaIndustrial: 1 },
        output: { livroComum: 200 },
      },
      {
        id: "livro_premium",
        nome: "Produção De Livro Premium",
        capacidadePorEdificio: 30,
        duracao: 25,
        input:  { bobinaBranco: 1, tintaIndustrial: 1, couro: 1 },
        output: { livroPremium: 55 },
      },
    ],
  },

  // Fábrica Têxtil — R$500k → teto ~R$2M/ciclo
  // Fiação algodão: 28×1200 = R$33.6k → cap 59 = R$1.98M ✓
  {
    edificioId: "fábricaTêxtil",
    nomeEdificio: "Fábrica Têxtil",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "fiação_algodão",
        nome: "Produção De Fiação De Algodão",
        capacidadePorEdificio: 59,
        duracao: 20,
        input:  { algodão: 40, sodaCáustica: 1 },
        output: { fioAlgodão: 28 },
      },
      {
        id: "fiação_Lã",
        nome: "Produção De Fiação De Lã",
        capacidadePorEdificio: 40,
        duracao: 20,
        input:  { lã: 10, sodaCáustica: 1 },
        output: { fioLã: 9 },
      },
      {
        id: "tecido_tecnico",
        nome: "Produção De Tecido Técnico (Dry-Fit)",
        capacidadePorEdificio: 35,
        duracao: 25,
        input:  { polímero: 5, aditivoDeNylon: 3 },
        output: { tecidoTecnico: 11 },
      },
      {
        id: "tratamento_couro",
        nome: "Produção De Couro Premium",
        capacidadePorEdificio: 25,
        duracao: 30,
        input:  { couro: 10, tintaIndustrial: 2, saisDeCromo: 2 },
        output: { couroPremium: 25 },
      },
    ],
  },

  // Fábrica De Calçados — R$350k → teto ~R$1.4M/ciclo
  // Tênis Corrida: 50×800 = R$40k → cap 35 = R$1.4M ✓
  {
    edificioId: "fábricaDeCalçados",
    nomeEdificio: "Fábrica De Calçados",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "tenis_corrida",
        nome: "Produção De Tênis De Corrida",
        capacidadePorEdificio: 35,
        duracao: 25,
        input:  { tecidoTecnico: 2, polímero: 4, caixaPequenaPapelão: 10 },
        output: { tenisCorrida: 50 },
      },
      {
        id: "sapato_casual",
        nome: "Produção De Tênis Casual",
        capacidadePorEdificio: 35,
        duracao: 25,
        input:  { fioAlgodão: 10, polímero: 15, caixaPequenaPapelão: 10 },
        output: { tenisCorrida: 45 },
      },
      {
        id: "sapato_luxo",
        nome: "Produção De Sapato De Luxo",
        capacidadePorEdificio: 25,
        duracao: 30,
        input:  { couroPremium: 5, polímero: 2, caixaPequenaPapelão: 10 },
        output: { sapatoLuxo: 55 },
      },
    ],
  },

  // Fábrica De Roupas — R$300k → teto ~R$1.2M/ciclo
  // Camiseta: 350×80 = R$28k → cap 42 = R$1.17M ✓
  {
    edificioId: "fábricaDeRoupas",
    nomeEdificio: "Fábrica De Roupas",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "confecção_casual",
        nome: "Produção De Confecção Casual",
        capacidadePorEdificio: 42,
        duracao: 20,
        input:  { fioAlgodão: 3, tintaIndustrial: 1, sacolaPapelão: 5 },
        output: { camisetaAlgodão: 350 },
      },
      {
        id: "casaco_de_grife",
        nome: "Produção De Casaco De Grife",
        capacidadePorEdificio: 26,
        duracao: 25,
        input:  { fioLã: 4, tintaIndustrial: 1, sacolaPapelão: 10 },
        output: { casacoLã: 130 },
      },
      {
        id: "roupas_dryfit",
        nome: "Produção De Roupas DryFit",
        capacidadePorEdificio: 22,
        duracao: 25,
        input:  { tecidoTecnico: 3, tintaIndustrial: 1, sacolaPapelão: 10 },
        output: { roupasDryFit: 150 },
      },
    ],
  },

  // Fábrica De Embalagens — R$220k → teto ~R$880k/ciclo
  // Caixa papelão: 85×250 = R$21.25k → cap 41 = R$871k ✓
  {
    edificioId: "fábricaDeEmbalagens",
    nomeEdificio: "Fábrica De Embalagens",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "caixa_papelão_kraft",
        nome: "Produção De Caixa Papelão",
        capacidadePorEdificio: 41,
        duracao: 20,
        input:  { bobinaKraft: 1, colaIndustrial: 2 },
        output: { caixaPapelão: 85 },
      },
      {
        id: "sacola_papelão",
        nome: "Produção De Sacolas De Varejo",
        capacidadePorEdificio: 30,
        duracao: 20,
        input:  { bobinaBranco: 2, tintaIndustrial: 1 },
        output: { sacolaPapelão: 90 },
      },
      {
        id: "caixa_pequena_papelão",
        nome: "Produção De Caixa Pequena De Varejo",
        capacidadePorEdificio: 10,
        duracao: 30,
        input:  { bobinaBranco: 30, tintaIndustrial: 15, polímero: 10 },
        output: { caixaPequenaPapelão: 40 },
      },
      {
        id: "sacas_industriais",
        nome: "Produção De Sacas Industriais",
        capacidadePorEdificio: 30,
        duracao: 20,
        input:  { polímero: 3, fioIndustrial: 2 },
        output: { sacaIndustrial: 85 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // QUÍMICA / REFINO — R$3.5M → teto ~R$28M/ciclo
  // ═══════════════════════════════════════════════════════
  {
    edificioId: "FábricaQuímicosEspecializados",
    nomeEdificio: "Fábrica De Químicos Especializados",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "síntese_acidos",
        nome: "Síntese De Ácidos",
        capacidadePorEdificio: 30, // 30 × 7×5500 = R$1.155M
        duracao: 30,
        input:  { enxofreBruto: 10 },
        output: { ácidoSulfúrico: 7 },
      },
      {
        id: "eletrólise_sal",
        nome: "Eletrólise De Sal",
        capacidadePorEdificio: 25,
        duracao: 30,
        input:  { sal: 10 },
        output: { sodaCáustica: 5, cloro: 4 },
      },
      {
        id: "aditivos_Nylon",
        nome: "Produção De Aditivos De Nylon",
        capacidadePorEdificio: 20,
        duracao: 30,
        input:  { ácidoSulfúrico: 2, benzeno: 5 },
        output: { aditivoDeNylon: 8 },
      },
      {
        id: "linha_pigmentação",
        nome: "Produção De Linha De Pigmentação",
        capacidadePorEdificio: 20,
        duracao: 30,
        input:  { benzeno: 5, pigmento: 5 },
        output: { tintaIndustrial: 6 },
      },
      {
        id: "linha_adesivos",
        nome: "Produção De Linha de Adesivos",
        capacidadePorEdificio: 20,
        duracao: 30,
        input:  { benzeno: 5, polímero: 2 },
        output: { colaIndustrial: 13 },
      },
      {
        id: "silício_puro",
        nome: "Refino De Silício De Alta Pureza",
        capacidadePorEdificio: 12, // 12 × 2×35000 = R$840k (produto caro)
        duracao: 45,
        input:  { silícioMetalúgico: 10, cloro: 5 },
        output: { silícioPuro: 2 },
      },
      {
        id: "carbono_ativado",
        nome: "Produção De Carbono Ativado",
        capacidadePorEdificio: 10,
        duracao: 45,
        input:  { carvãoRefinado: 20, ácidoSulfúrico: 2 },
        output: { nanotuboCarbono: 1 },
      },
      {
        id: "purificação_arsênio",
        nome: "Purificação De Arsênio",
        capacidadePorEdificio: 15,
        duracao: 35,
        input:  { arsênioBruto: 8, cloro: 2 },
        output: { arsênioPuro: 1 },
      },
      {
        id: "purificaçãoLítio",
        nome: "Purificação De Lítio",
        capacidadePorEdificio: 10,
        duracao: 40,
        input:  { minérioDeLítio: 5, ácidoSulfúrico: 2 },
        output: { lítioPuro: 2 },
      },
      {
        id: "sintetizaçãoGrafite",
        nome: "Sintetização De Grafite",
        capacidadePorEdificio: 20,
        duracao: 30,
        input:  { carvãoRefinado: 30 },
        output: { grafiteIndustrial: 4 },
      },
    ],
  },

  // Refinaria — R$10M → teto ~R$80M/ciclo
  // Destilação leve: 100×(30×8000 + 15×3000) = R$285k → cap 280 = R$79.8M ✓
  {
    edificioId: "refinaria",
    nomeEdificio: "Refinaria",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "destilação_leve",
        nome: "Destilação Leve",
        capacidadePorEdificio: 80,
        duracao: 20,
        input:  { petróleoBruto: 100 },
        output: { nafta: 30, benzeno: 15 },
      },
      {
        id: "destilação_média",
        nome: "Destilação Média",
        capacidadePorEdificio: 80,
        duracao: 20,
        input:  { petróleoBruto: 100 },
        output: { diesel: 35, solvente: 10 },
      },
      {
        id: "cracker_gás",
        nome: "Cracker De Nafta (Polímero)",
        capacidadePorEdificio: 50,
        duracao: 25,
        input:  { nafta: 20 },
        output: { polímero: 45 },
      },
      {
        id: "tratamento_enxofre",
        nome: "Tratamento De Enxofre",
        capacidadePorEdificio: 60,
        duracao: 20,
        input:  { petróleoBruto: 20 },
        output: { enxofreBruto: 20 },
      },
      {
        id: "destilaçãoÓleos",
        nome: "Destilação De Óleos",
        capacidadePorEdificio: 80,
        duracao: 20,
        input:  { petróleoBruto: 10 },
        output: { óleoBase: 20 },
      },
    ],
  },

  // Fábrica De Plásticos — R$3M → teto ~R$24M/ciclo
  {
    edificioId: "fábrica_plásticos",
    nomeEdificio: "Fábrica De Plásticos",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "plásticos_engenharia",
        nome: "Plásticos De Engenharia",
        capacidadePorEdificio: 15, // 15×10×25000 = R$3.75M
        duracao: 35,
        input:  { polímero: 20, aditivoDeNylon: 10 },
        output: { polímeroReforçado: 10 },
      },
      {
        id: "resinaEpóxi",
        nome: "Resina Epóxi",
        capacidadePorEdificio: 30,
        duracao: 30,
        input:  { nafta: 10, benzeno: 10 },
        output: { resinaIndustrial: 30 },
      },
      {
        id: "moldagemABS",
        nome: "Moldagem De ABS",
        capacidadePorEdificio: 20,
        duracao: 30,
        input:  { polímero: 20, aditivoDeNylon: 15 },
        output: { termoplásticoRígido: 23 },
      },
      {
        id: "soproPET",
        nome: "Sopro De PET",
        capacidadePorEdificio: 20,
        duracao: 30,
        input:  { polímero: 30, solvente: 10 },
        output: { resinaEmbalagem: 47 },
      },
      {
        id: "extrusãoPVC",
        nome: "Extrusão De PVC",
        capacidadePorEdificio: 20,
        duracao: 30,
        input:  { polímero: 30, cloro: 10 },
        output: { plásticoIsolante: 24 },
      },
    ],
  },

  // Lab Farmacêutico — R$2M → teto ~R$12M/ciclo
  {
    edificioId: "laboratório_farmacêutico",
    nomeEdificio: "Laboratório Farmacêutico",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "extração_alcaloides",
        nome: "Extração De Alcaloides",
        capacidadePorEdificio: 10, // 10×2×18000 = R$360k
        duracao: 45,
        input:  { ervaAnalgésica: 20, solvente: 2 },
        output: { extratoAlívio: 2 },
      },
      {
        id: "destilação_terpenos",
        nome: "Destilação De Terpenos",
        capacidadePorEdificio: 10,
        duracao: 45,
        input:  { plantaAntissépticas: 20, solvente: 2 },
        output: { óleoAntimicrobiano: 3 },
      },
      {
        id: "síntese_p.a.",
        nome: "Síntese De P.A.",
        capacidadePorEdificio: 15,
        duracao: 40,
        input:  { benzeno: 5, ácidoSulfúrico: 2 },
        output: { pASintético: 2 },
      },
      {
        id: "processamento_amido",
        nome: "Processamento De Amido",
        capacidadePorEdificio: 8,
        duracao: 35,
        input:  { milho: 40 },
        output: { excipienteFarmacêutico: 1 },
      },
    ],
  },

  // Fábrica De Medicamentos — R$1.5M → teto ~R$9M/ciclo
  {
    edificioId: "fábrica_de_medicamentos",
    nomeEdificio: "Fábrica De Medicamentos",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "remédios_genéricos",
        nome: "Produção De Remédios Genéricos",
        capacidadePorEdificio: 8, // 8×5000×150 = R$6M
        duracao: 30,
        input:  { pASintético: 15, excipienteFarmacêutico: 20 },
        output: { comprimidosGenéricos: 5000 },
      },
      {
        id: "suplementos_vitamínicos",
        nome: "Suplementos Vitamínicos",
        capacidadePorEdificio: 8,
        duracao: 30,
        input:  { extratoAlívio: 20, excipienteFarmacêutico: 10 },
        output: { frascoVitamina: 1750 },
      },
      {
        id: "produçãoPomadasMedicinais",
        nome: "Produção De Pomadas Medicinais",
        capacidadePorEdificio: 10,
        duracao: 30,
        input:  { óleoAntimicrobiano: 10, solvente: 5 },
        output: { bisnagaTratamento: 600 },
      },
      {
        id: "teste_laboratorial",
        nome: "Produção De Teste Laboratorial",
        capacidadePorEdificio: 5,
        duracao: 45,
        input:  { enzima: 1, cloro: 10 },
        output: { testeLaboratorial: 2 },
      },
    ],
  },

  // Biofábrica — R$4M → teto ~R$32M/ciclo
  {
    edificioId: "bio_fábrica",
    nomeEdificio: "Biofábrica",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "culturaFermentação",
        nome: "Produção De Cultura De Fermentação",
        capacidadePorEdificio: 12, // 12×1×45000 = R$540k (enzima rara)
        duracao: 60,
        input:  { milho: 40 },
        output: { enzimaIndustrial: 1 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // METALURGIA PESADA
  // ═══════════════════════════════════════════════════════

  // Alto-Forno — R$3M → teto ~R$24M/ciclo
  // Fusão ferro: 120×1800 = R$216k → cap 111 = R$23.9M ✓
  {
    edificioId: "altoForno",
    nomeEdificio: "Alto-Forno",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "prodCoque",
        nome: "Produção De Coque",
        capacidadePorEdificio: 60,
        duracao: 20,
        input:  { carvão: 40 },
        output: { carvãoRefinado: 35 },
      },
      {
        id: "fusãoFerro",
        nome: "Fusão De Ferro",
        capacidadePorEdificio: 50,
        duracao: 30,
        input:  { minérioFerro: 60, carvãoRefinado: 25 },
        output: { ferroGusa: 120 },
      },
      {
        id: "refinoAçoBásico",
        nome: "Refino De Aço Básico",
        capacidadePorEdificio: 40,
        duracao: 30,
        input:  { ferroGusa: 40, ácidoSulfúrico: 10 },
        output: { lingoteAço: 75 },
      },
      {
        id: "ProdSilícioMetalúgico",
        nome: "Produção De Silício Metalúrgico",
        capacidadePorEdificio: 30,
        duracao: 35,
        input:  { minérioDeQuartzo: 40, carvãoRefinado: 20 },
        output: { silícioMetalúgico: 25 },
      },
    ],
  },

  // Usina Siderúrgica — R$5M → teto ~R$40M/ciclo
  {
    edificioId: "usinaSiderúrgica",
    nomeEdificio: "Usina Siderúrgica",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "reciclagemAço",
        nome: "Reciclagem De Aço",
        capacidadePorEdificio: 80,
        duracao: 20,
        input:  { resíduosMetálicos: 40 },
        output: { lingoteAço: 8 },
      },
      {
        id: "açoAltaPureza",
        nome: "Produção De Aço De Alta Pureza",
        capacidadePorEdificio: 30,
        duracao: 35,
        input:  { lingoteAço: 40, cloro: 10 },
        output: { açoRefinado: 22 },
      },
      {
        id: "refinoCobre",
        nome: "Refino De Cobre",
        capacidadePorEdificio: 30,
        duracao: 35,
        input:  { minérioDeCobre: 40, ácidoSulfúrico: 10 },
        output: { lingoteDeCobre: 23, arsênioBruto: 5 },
      },
      {
        id: "fundiçãoChumbo",
        nome: "Fundição De Chumbo",
        capacidadePorEdificio: 40,
        duracao: 30,
        input:  { minérioDeChumbo: 40, carvãoRefinado: 10 },
        output: { lingoteChumbo: 15 },
      },
    ],
  },

  // Fundição De Alumínio — R$4M → teto ~R$32M/ciclo
  {
    edificioId: "fundiçãoAlumínio",
    nomeEdificio: "Fundição De Alumínio",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "criandoLingoteA",
        nome: "Produção de Alumínio (Bauxita)",
        capacidadePorEdificio: 80,
        duracao: 30,
        input:  { bauxita: 60 },
        output: { lingoteAlumínio: 10 },
      },
      {
        id: "bronzeIndustrial",
        nome: "Produção De Bronze Industrial",
        capacidadePorEdificio: 40,
        duracao: 35,
        input:  { lingoteDeCobre: 20, minérioDeEstanho: 10 },
        output: { ligaDeBronze: 18 },
      },
    ],
  },

  // Fábrica De Ligas Metálicas — R$4.5M → teto ~R$36M/ciclo
  {
    edificioId: "fábricaLigasMetálicas",
    nomeEdificio: "Fábrica De Ligas Metálicas",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "bronzeIndustrial",
        nome: "Produção De Bronze Industrial",
        capacidadePorEdificio: 40,
        duracao: 30,
        input:  { lingoteDeCobre: 20, minérioDeEstanho: 10 },
        output: { ligaDeBronze: 25 },
      },
      {
        id: "latãoElétrico",
        nome: "Produção De Latão Elétrico",
        capacidadePorEdificio: 40,
        duracao: 30,
        input:  { lingoteDeCobre: 20, minérioDeZinco: 10 },
        output: { ligaDeLatão: 18 },
      },
      {
        id: "superligasTérmicas",
        nome: "Produção De Superligas Térmicas",
        capacidadePorEdificio: 10,
        duracao: 45,
        input:  { minérioDeCobalto: 15, minérioDeNiquel: 10, açoRefinado: 5 },
        output: { superligaTérmica: 9 },
      },
      {
        id: "contatosPrata",
        nome: "Produção De Contatos De Prata",
        capacidadePorEdificio: 20,
        duracao: 35,
        input:  { minérioDePrata: 20, lingoteDeCobre: 10 },
        output: { contatoDePrata: 31 },
      },
      {
        id: "titânioRefinado",
        nome: "Produção De Titânio Refinado",
        capacidadePorEdificio: 12,
        duracao: 40,
        input:  { minérioDeTitânio: 30, cloro: 10 },
        output: { lingoteTitânio: 32 },
      },
      {
        id: "soldaEletrônica",
        nome: "Produção De Solda Eletrônica",
        capacidadePorEdificio: 40,
        duracao: 30,
        input:  { minérioDeEstanho: 20, minérioDePrata: 10 },
        output: { ligaDeSolda: 28 },
      },
      {
        id: "açoManganês",
        nome: "Produção De Aço Manganês",
        capacidadePorEdificio: 8,
        duracao: 40,
        input:  { lingoteAço: 30, minérioDeManganês: 10, carvãoRefinado: 5 },
        output: { açoBalistico: 35 },
      },
      {
        id: "ÍmãsNeodímio",
        nome: "Produção De Bloco Magnético",
        capacidadePorEdificio: 15,
        duracao: 35,
        input:  { ferroGusa: 10, minérioNeodímio: 15 },
        output: { blocoMagnético: 20 },
      },
      {
        id: "prodLigaDeOuro",
        nome: "Produção De Liga De Ouro",
        capacidadePorEdificio: 3, // Produto raro e caro — baixo volume
        duracao: 60,
        input:  { minérioDeOuro: 10, minérioDeNiquel: 5, minérioDeCobalto: 5 },
        output: { ligaDeOuro: 3 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // COMPONENTES INDUSTRIAIS
  // ═══════════════════════════════════════════════════════

  // Ind. Componentes Mecânicos — R$2M → teto ~R$12M/ciclo
  {
    edificioId: "indústriaComponentesMecânicos",
    nomeEdificio: "Indústria De Componentes Mecânicos",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "usinagemTransmissão",
        nome: "Usinagem de Transmissão",
        capacidadePorEdificio: 25,
        duracao: 30,
        input:  { lingoteAço: 15, óleoBase: 5 },
        output: { engrenagem: 8 },
      },
      {
        id: "válvulasControle",
        nome: "Válvulas de Controle",
        capacidadePorEdificio: 25,
        duracao: 25,
        input:  { lingoteAço: 5, ligaDeLatão: 5 },
        output: { pistãoHidráulico: 55 },
      },
      {
        id: "sistemaRotação",
        nome: "Sistema de Rotação",
        capacidadePorEdificio: 25,
        duracao: 30,
        input:  { lingoteAço: 10, óleoBase: 5 },
        output: { rolamento: 6 },
      },
      {
        id: "engrenagensTorque",
        nome: "Engrenagens De Torque",
        capacidadePorEdificio: 15,
        duracao: 35,
        input:  { lingoteAço: 15, minérioDeManganês: 5 },
        output: { redutorCarga: 10 },
      },
    ],
  },

  // Fábrica Chapas Metálicas — R$2.2M → teto ~R$13.2M/ciclo
  {
    edificioId: "fábricaChapasMetálicas",
    nomeEdificio: "Fábrica De Chapas Metálicas",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "laminaçãoAço",
        nome: "Laminação de Aço",
        capacidadePorEdificio: 50,
        duracao: 25,
        input:  { lingoteAço: 20 },
        output: { açoRefinado: 5 },
      },
      {
        id: "extrusãoAlumínio",
        nome: "Extrusão De Alumínio",
        capacidadePorEdificio: 50,
        duracao: 25,
        input:  { lingoteAlumínio: 20 },
        output: { vigaH: 7 },
      },
      {
        id: "painélAeroespacial",
        nome: "Painél Aeroespacial",
        capacidadePorEdificio: 8,
        duracao: 40,
        input:  { superligaTérmica: 15, lingoteTitânio: 5 },
        output: { chapaAltaTensão: 16 },
      },
      {
        id: "blindagemBalística",
        nome: "Blindagem Balística",
        capacidadePorEdificio: 10,
        duracao: 35,
        input:  { açoBalistico: 10, lingoteChumbo: 5 },
        output: { açoInox: 50 },
      },
    ],
  },

  // Fábrica Estruturas Metálicas — R$2.5M → teto ~R$15M/ciclo
  {
    edificioId: "fábricaEstruturasMetálicas",
    nomeEdificio: "Fábrica De Estruturas Metálicas",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "vigasEstruturais",
        nome: "Vigas Estruturais",
        capacidadePorEdificio: 30,
        duracao: 25,
        input:  { açoRefinado: 10 },
        output: { vigaH: 18 },
      },
      {
        id: "kitHidráulico",
        nome: "Kit Hidráulico",
        capacidadePorEdificio: 8,
        duracao: 40,
        input:  { lingoteAço: 10, polímeroReforçado: 5 },
        output: { braçoHidráulico: 1 },
      },
      {
        id: "estruturaAeroNaval",
        nome: "Estrutura Aero/Naval",
        capacidadePorEdificio: 3,  // 3 × 1.2M = R$3.6M
        duracao: 60,
        input:  { chapaAltaTensão: 20, resinaIndustrial: 5 },
        output: { célulaFuselagem: 1 },
      },
      {
        id: "suportePainéis",
        nome: "Suportes de Painéis",
        capacidadePorEdificio: 30,
        duracao: 25,
        input:  { lingoteAlumínio: 10, polímeroReforçado: 5 },
        output: { treliçaLeve: 20 },
      },
    ],
  },

  // Fábrica Peças Automotivas — R$3M → teto ~R$24M/ciclo
  {
    edificioId: "fábricaPeçasAutomotivas",
    nomeEdificio: "Fábrica De Peças Automotivas",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "kitCarroceria",
        nome: "Kit de Carroceria",
        capacidadePorEdificio: 30, // 30×10×15000 = R$4.5M
        duracao: 30,
        input:  { chapaAço: 15, termoplásticoRígido: 5 },
        output: { chassiStandard: 10 },
      },
      {
        id: "kitAltaPerformance",
        nome: "Kit De Alta Performance",
        capacidadePorEdificio: 10,
        duracao: 40,
        input:  { chapaAlumínio: 15, polímeroReforçado: 5 },
        output: { chassiLuxo: 5 },
      },
      {
        id: "móduloCabine",
        nome: "Módulo De Cabine",
        capacidadePorEdificio: 15,
        duracao: 30,
        input:  { painélDeControle: 5, plásticoIsolante: 5 },
        output: { cockpit: 12 },
      },
      {
        id: "conjuntoSuspensão",
        nome: "Conjunto de Suspensão",
        capacidadePorEdificio: 40,
        duracao: 25,
        input:  { chapaAço: 10, pistãoHidráulico: 5 },
        output: { amortecedor: 10 },
      },
      {
        id: "mecanismoArticulação",
        nome: "Mecanismo de Articulação",
        capacidadePorEdificio: 5,
        duracao: 45,
        input:  { válvulaHidráulica: 5, pistãoHidráulico: 10 },
        output: { braçoHidráulico: 1 },
      },
      {
        id: "prodSeçãoCasco",
        nome: "Produção Seção Casco",
        capacidadePorEdificio: 8,
        duracao: 45,
        input:  { placaReforçada: 3, ligaDeBronze: 10 },
        output: { SeçãoCasco: 1 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // MOTORES — R$10M → teto ~R$80M/ciclo
  // ═══════════════════════════════════════════════════════
  {
    edificioId: "fábricaMotores",
    nomeEdificio: "Fábrica De Motores",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "motorStandard",
        nome: "Produção De Motor A Combustão",
        capacidadePorEdificio: 25, // 25×4×45000 = R$4.5M
        duracao: 30,
        input:  { lingoteAço: 20, lingoteAlumínio: 10, engrenagem: 5 },
        output: { motorCombustão: 4 },
      },
      {
        id: "produzirMotorElétrico",
        nome: "Produção De Motor Elétrico",
        capacidadePorEdificio: 20,
        duracao: 35,
        input:  { fioCobre: 20, lingoteAlumínio: 10, blocoMagnético: 10 },
        output: { motorElétrico: 11 },
      },
      {
        id: "produzirMotorAvião",
        nome: "Produção De Motor De Avião",
        capacidadePorEdificio: 2,  // 2×1×8.5M = R$17M
        duracao: 90,               // Meses de fabricação
        input:  { superligaTérmica: 20, lingoteTitânio: 10, açoBalistico: 10 },
        output: { motorAvião: 1 },
      },
      {
        id: "propulsorCriogênico",
        nome: "Produção De Motor De Foguete",
        capacidadePorEdificio: 1,
        duracao: 180,              // Semestral — produto ultra raro
        input:  { superligaTérmica: 15, lingoteTitânio: 30, polímeroReforçado: 10 },
        output: { motorFoguete: 1 },
      },
      {
        id: "prodMotorNavio",
        nome: "Produção De Motor Naval",
        capacidadePorEdificio: 2,
        duracao: 90,
        input:  { lingoteAço: 50, engrenagem: 30, ligaDeBronze: 15 },
        output: { motorNaval: 1 },
      },
      {
        id: "motorPulso",
        nome: "Produção de Motor de Míssil",
        capacidadePorEdificio: 1,
        duracao: 120,
        input:  { superligaTérmica: 20, açoRefinado: 10, lingoteTitânio: 5 },
        output: { motorMíssil: 1 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // SEMICONDUTORES — R$35M → teto ~R$420M/ciclo
  // ═══════════════════════════════════════════════════════
  {
    edificioId: "fábricaSemicondutores",
    nomeEdificio: "Fábrica De Semicondutores",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "prodWaferSilício",
        nome: "Produção de Wafer de Silício",
        capacidadePorEdificio: 80, // 80×32×90000 = R$230M → dentro do teto
        duracao: 45,               // Processo longo
        input:  { silícioPuro: 40, nitrogênio: 10 },
        output: { waferSilício: 32 },
      },
      {
        id: "prodWaferPotência",
        nome: "Produção de Wafer De Potência",
        capacidadePorEdificio: 60,
        duracao: 45,
        input:  { silícioPuro: 20, carbonoEletrônico: 10 },
        output: { waferPotência: 22 },
      },
      {
        id: "arsenetoGálio",
        nome: "Produção de Wafer RF",
        capacidadePorEdificio: 50,
        duracao: 50,
        input:  { compostoSemicondutor: 10, arsênioPuro: 10 },
        output: { waferRF: 12 },
      },
      {
        id: "célulaFotovoltaica",
        nome: "Produção de Célula Solar",
        capacidadePorEdificio: 60,
        duracao: 40,
        input:  { silícioPuro: 20, contatoDePrata: 5 },
        output: { celulaSolar: 13 },
      },
    ],
  },

  // Fábrica De Chips — R$15M → teto ~R$120M/ciclo
  {
    edificioId: "fábricaChips",
    nomeEdificio: "Fábrica De Chips",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "chipAutomação",
        nome: "Chip De Automação",
        capacidadePorEdificio: 40, // 40×22×95000 = R$83.6M
        duracao: 30,
        input:  { waferSilício: 10, ligaDeSolda: 5 },
        output: { controladorLógico: 22 },
      },
      {
        id: "cpuAltaPerformance",
        nome: "CPU Alta Performance",
        capacidadePorEdificio: 25,
        duracao: 35,
        input:  { waferSilício: 15, ligaDeSolda: 5 },
        output: { processadorAltaPerformance: 20 },
      },
      {
        id: "unidadeNeuralIA",
        nome: "Unidade Neural (IA)",
        capacidadePorEdificio: 20,
        duracao: 40,
        input:  { waferSilício: 15, nanotuboCarbono: 5 },
        output: { chipIA: 21 },
      },
      {
        id: "prodControladorCarga",
        nome: "Produção De Controlador De Carga",
        capacidadePorEdificio: 35,
        duracao: 30,
        input:  { waferPotência: 10, ligaDeLatão: 5 },
        output: { ControladorCarga: 36 },
      },
      {
        id: "prodChipRF",
        nome: "Produção De Chip RF E Sinal",
        capacidadePorEdificio: 30,
        duracao: 35,
        input:  { waferRF: 10, componenteConexão: 10 },
        output: { módulo5G: 9 },
      },
      {
        id: "sensoresBio",
        nome: "Produção De Sensores Bio-Químicos",
        capacidadePorEdificio: 2,  // Produto ultra-raro
        duracao: 60,
        input:  { waferSilício: 10, contatoDePrata: 5 },
        output: { bioChip: 1 },
      },
      {
        id: "prodUnidadesNavegação",
        nome: "Produção De Unidades De Navegação",
        capacidadePorEdificio: 5,
        duracao: 50,
        input:  { waferRF: 10, ligaDeOuro: 5, minérioDePrata: 5 },
        output: { sistemaGuia: 7 },
      },
      {
        id: "chipGeoMineradores",
        nome: "Produção De Chips Geo-Mineradores",
        capacidadePorEdificio: 5,
        duracao: 50,
        input:  { waferSilício: 15, açoRefinado: 10 },
        output: { processadorSísmico: 1 },
      },
      {
        id: "prodMicroControladores",
        nome: "Produção De Micro-Controladores",
        capacidadePorEdificio: 80,
        duracao: 25,
        input:  { waferSilício: 5, lingoteAlumínio: 5 },
        output: { microControlador: 40 },
      },
      {
        id: "núcleosNucleares",
        nome: "Produção De Núcleos Nucleares",
        capacidadePorEdificio: 10,
        duracao: 45,
        input:  { waferPotência: 20, minérioDeChumbo: 10 },
        output: { processadorBlindado: 12 },
      },
      {
        id: "prodMemoriaFlash",
        nome: "Produção De Memória Flash",
        capacidadePorEdificio: 30,
        duracao: 30,
        input:  { waferSilício: 15, minérioDeEstanho: 5 },
        output: { chipMemória: 115 },
      },
    ],
  },

  // Fábrica De Placas Eletrônicas — R$2.5M → teto ~R$20M/ciclo
  {
    edificioId: "fábricaPlacasEletrônicas",
    nomeEdificio: "Fábrica De Placas Eletrônicas",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "placaControleIndustrial",
        nome: "Placa De Controle Industrial",
        capacidadePorEdificio: 8,  // 8×15×350000 = R$42M → atenção, mas produto tier alto
        duracao: 40,
        input:  { controladorLógico: 10, fioCobre: 10, resinaIndustrial: 5 },
        output: { unidadeComando: 15 },
      },
      {
        id: "placaMãeAltaDensidade",
        nome: "Placa-Mãe De Alta Densidade",
        capacidadePorEdificio: 3,  // 3×15×350000 = R$15.75M ✓
        duracao: 50,
        input:  { processadorAltaPerformance: 5, carbonoEletrônico: 10 },
        output: { placaMãe: 15 },
      },
      {
        id: "ProdPlacaGestãoEnergia",
        nome: "Placa De Gestão De Energia",
        capacidadePorEdificio: 12,
        duracao: 35,
        input:  { processadorAltaPerformance: 5, ControladorCarga: 10, resinaIndustrial: 5 },
        output: { placaGestãoEnergia: 12 },
      },
      {
        id: "prodPlacaTelecomSatélite",
        nome: "Placa De Telecom E Satélite",
        capacidadePorEdificio: 5,
        duracao: 45,
        input:  { módulo5G: 10, ligaDeOuro: 5, ligaDeSolda: 5 },
        output: { placaFrequência: 25 },
      },
      {
        id: "prodComputadorVoo",
        nome: "Produção de Computador de Voo",
        capacidadePorEdificio: 3,
        duracao: 60,
        input:  { sistemaGuia: 5, processadorBlindado: 5 },
        output: { computadorVoo: 3 },
      },
      {
        id: "prodPlacaIndustrial",
        nome: "Produção De Placa Industrial",
        capacidadePorEdificio: 15,
        duracao: 30,
        input:  { controladorLógico: 10, fioCobre: 5, resinaIndustrial: 5, ligaDeSolda: 5 },
        output: { placaIndustrial: 120 },
      },
      {
        id: "prodMicroControladores",
        nome: "Micro-Controladores",
        capacidadePorEdificio: 25,
        duracao: 25,
        input:  { controladorLógico: 5, ControladorCarga: 2 },
        output: { microControlador: 55 },
      },
    ],
  },

  // Fábrica De Eletrônicos — R$3M → teto ~R$24M/ciclo
  {
    edificioId: "fábricaEletrônicos",
    nomeEdificio: "Fábrica De Eletrônicos",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "módulosInterface",
        nome: "Módulos de Interface",
        capacidadePorEdificio: 10,
        duracao: 35,
        input:  { chipWearables: 10, polímeroReforçado: 10, vidroTécnico: 5 },
        output: { painélDeControle: 50 },
      },
      {
        id: "sistemaVisãoDigital",
        nome: "Sistemas De Visão Digital",
        capacidadePorEdificio: 3,
        duracao: 50,
        input:  { bioChip: 1, ligaDeOuro: 1, lentePrecisão: 5 },
        output: { câmeraPrecisão: 15 },
      },
      {
        id: "sistemaSondaTerreno",
        nome: "Sistemas de Sonda de Terreno",
        capacidadePorEdificio: 5,
        duracao: 45,
        input:  { processadorSísmico: 1, polímeroReforçado: 5, lingoteChumbo: 5 },
        output: { sondaTerreno: 4 },
      },
      {
        id: "dispositivosDiagnóstico",
        nome: "Dispositivos De Diagnóstico",
        capacidadePorEdificio: 4,
        duracao: 45,
        input:  { bioChip: 1, polímeroReforçado: 10, contatoDePrata: 5 },
        output: { scannerMédico: 3 },
      },
      {
        id: "kitPeriféricos",
        nome: "Kits De Periféricos",
        capacidadePorEdificio: 20,
        duracao: 30,
        input:  { chipWearables: 5, polímeroReforçado: 10, fioCobre: 10 },
        output: { consoleJogos: 200 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // ENERGIA
  // ═══════════════════════════════════════════════════════

  // Fábrica De Baterias — R$600k → teto ~R$3.6M/ciclo
  // Célula lítio: 150×8000 = R$1.2M → cap 3 = R$3.6M ✓
  {
    edificioId: "fábricaDeBaterias",
    nomeEdificio: "Fábrica De Baterias",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "célulaLítio",
        nome: "Célula De Lítio",
        capacidadePorEdificio: 3,
        duracao: 45,
        input:  { lítioPuro: 10, grafiteIndustrial: 5, minérioDeCobalto: 5 },
        output: { unidadeCélula: 150 },
      },
      {
        id: "bateriaEV",
        nome: "Pack De Bateria EV",
        capacidadePorEdificio: 5,
        duracao: 40,
        input:  { unidadeCélula: 50, ControladorCarga: 2, chapaAlumínio: 10 },
        output: { bateriaTracionamento: 10 },
      },
      {
        id: "packEstacionário",
        nome: "Pack Estacionário",
        capacidadePorEdificio: 5,
        duracao: 40,
        input:  { unidadeCélula: 20, ControladorCarga: 1, chapaAço: 5 },
        output: { armazenamentoFixo: 2 },
      },
      {
        id: "bateriaSmall",
        nome: "Bateria Small",
        capacidadePorEdificio: 15,
        duracao: 30,
        input:  { unidadeCélula: 5, plásticoIsolante: 5 },
        output: { bateriaPortátil: 15 },
      },
    ],
  },

  // Fábrica Turbinas Eólicas — R$500k → teto ~R$2M/ciclo
  {
    edificioId: "fábricaTurbinasEólicas",
    nomeEdificio: "Fábrica De Turbinas Eólicas",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "geradorEólico",
        nome: "Produção De Gerador Eólico",
        capacidadePorEdificio: 3, // 3×650000 = R$1.95M ✓
        duracao: 60,
        input:  { açoRefinado: 10, rolamento: 5, fioCobre: 5 },
        output: { turbinaEólica: 1 },
      },
    ],
  },

  // Fábrica Painéis Solares — R$450k → teto ~R$1.8M/ciclo
  {
    edificioId: "fábricaPainéisSolares",
    nomeEdificio: "Fábrica De Painéis Solares",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "célulaFotovoltaica",
        nome: "Produção De Célula Fotovoltaica",
        capacidadePorEdificio: 40, // 40×80×4500 = R$14.4M → atenção, mas painéis são commodity
        duracao: 30,
        input:  { vidroTécnico: 10, silícioPuro: 5, ligaDeLatão: 2 },
        output: { painelSolar: 80 },
      },
    ],
  },

  // Centro Reciclagem Baterias — R$500k → teto ~R$2M/ciclo
  {
    edificioId: "centroReciclagemBaterias",
    nomeEdificio: "Centro De Reciclagem De Baterias",
    setor: "energia",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "reciclagemBaterias",
        nome: "Reciclagem De Baterias",
        capacidadePorEdificio: 6,  // 6×(5×80k + 3×15k) = R$2.67M
        duracao: 45,
        input:  { bateriaUsada: 10, ácidoSulfúrico: 5 },
        output: { lítioPuro: 5, minérioDeCobalto: 3 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // ROBÔS — R$30M → teto ~R$360M/ciclo
  // ═══════════════════════════════════════════════════════
  {
    edificioId: "FábricaRobôs",
    nomeEdificio: "Fábrica De Robôs",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "braçoRobóticoIndustrial",
        nome: "Braço Robótico Industrial",
        capacidadePorEdificio: 25, // 25×5×250000 = R$31.25M
        duracao: 45,
        input:  { placaIndustrial: 2, motorElétrico: 5, pistãoHidráulico: 5 },
        output: { unidadeAutomação: 5 },
      },
      {
        id: "androideServiço",
        nome: "Androide De Serviço",
        capacidadePorEdificio: 5,  // 5×1×1.5M = R$7.5M
        duracao: 60,
        input:  { placaIndustrial: 2, motorElétrico: 5, açoBalistico: 10 },
        output: { robôServiço: 1 },
      },
      {
        id: "prodDroneLogístico",
        nome: "Drone Logístico",
        capacidadePorEdificio: 10, // 10×6×850000 = R$51M
        duracao: 40,
        input:  { placaFrequência: 1, microMotor: 4, bateriaPortátil: 10 },
        output: { droneLogístico: 6 },
      },
      {
        id: "sondaExploratória",
        nome: "Sonda Exploratória",
        capacidadePorEdificio: 3,  // 3×1×2.5M = R$7.5M
        duracao: 75,
        input:  { placaFrequência: 1, microMotor: 4, chapaAlumínio: 5 },
        output: { robôMineração: 1 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // AUTOMÓVEIS — R$8M → teto ~R$64M/ciclo
  // ═══════════════════════════════════════════════════════
  {
    edificioId: "fábricaAutomóveis",
    nomeEdificio: "Fábrica De Automóveis",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "veículoPopular",
        nome: "Veículo Popular",
        capacidadePorEdificio: 10, // 10×2×90000 = R$1.8M — cap baixo, produção lenta
        duracao: 60,
        input:  { chassiStandard: 1, motorCombustão: 1, sistemaTransmissão: 1 },
        output: { carroPopular: 2 },
      },
      {
        id: "prodCarroEsportivo",
        nome: "Carro Esportivo",
        capacidadePorEdificio: 5,
        duracao: 90,
        input:  { chassiLuxo: 1, motorCombustão: 10, sistemaTransmissão: 5 },
        output: { carroEsportivo: 2 },
      },
      {
        id: "máquinaPesada",
        nome: "Máquina Pesada",
        capacidadePorEdificio: 4,
        duracao: 75,
        input:  { placaReforçada: 2, braçoHidráulico: 1, motorNaval: 1 },
        output: { Escavadeira: 4 },
      },
    ],
  },

  // Montadora Elétrica — R$10M → teto ~R$80M/ciclo
  {
    edificioId: "montadoraVeículosElétricos",
    nomeEdificio: "Montadora De Veículos Elétricos",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "veículoPopularElétrico",
        nome: "veículo Popular Elétrico",
        capacidadePorEdificio: 8,
        duracao: 60,
        input:  { chassiStandard: 1, motorElétrico: 1, bateriaTracionamento: 1 },
        output: { carroElétrico: 2 },
      },
      {
        id: "carroEsportivoElétrico",
        nome: "Carro Esportivo Elétrico",
        capacidadePorEdificio: 3,
        duracao: 90,
        input:  { chassiLuxo: 1, motorElétrico: 2, bateriaTracionamento: 1 },
        output: { hiperCarroElétrico: 1 },
      },
      {
        id: "prodCaminhãoElétrico",
        nome: "Caminhão Elétrico",
        capacidadePorEdificio: 5,
        duracao: 75,
        input:  { chassiStandard: 2, motorElétrico: 2, bateriaTracionamento: 2 },
        output: { caminhãoElétrico: 4 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // AERONAVES — R$50M → teto ~R$600M/ciclo
  // ═══════════════════════════════════════════════════════
  {
    edificioId: "fábricaAeronaves",
    nomeEdificio: "Fábrica De Aeronaves",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "produçãoJatoComercial",
        nome: "Produção De Jato Comercial",
        capacidadePorEdificio: 1,  // 1×150M = R$150M
        duracao: 365,              // 1 ano para produzir um jato (realista)
        input:  { célulaFuselagem: 4, motorAvião: 2, placaMãe: 1 },
        output: { jatoComercial: 1 },
      },
      {
        id: "prodAviãoCargueiro",
        nome: "Produção De Avião Cargueiro",
        capacidadePorEdificio: 1,
        duracao: 300,
        input:  { célulaFuselagem: 6, motorAvião: 2, chassiStandard: 5 },
        output: { aviãoCargueiro: 1 },
      },
      {
        id: "prodCaçaDefesa",
        nome: "Produção De Caça De Defesa",
        capacidadePorEdificio: 1,
        duracao: 365,
        input:  { célulaFuselagem: 20, motorAvião: 5, açoBalistico: 5 },
        output: { caçaDefesa: 1 },
      },
    ],
  },

  // Fábrica De Foguetes — R$100M → teto ~R$1.2B/ciclo
  {
    edificioId: "fábricaFoguetes",
    nomeEdificio: "Fábrica De Foguetes",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "produçãoSatéliteComunicação",
        nome: "Produção Satélite de Comunicação",
        capacidadePorEdificio: 1,
        duracao: 365,
        input:  { placaFrequência: 100, tela: 100, ligaDeOuro: 100 },
        output: { satéliteOrbital: 1 },
      },
      {
        id: "prodSondaEspacial",
        nome: "Produção De Sonda Espacial",
        capacidadePorEdificio: 1,
        duracao: 540,             // 18 meses
        input:  { açoBalistico: 5, pistãoHidráulico: 10, câmeraPrecisão: 2 },
        output: { sondaEspacial: 1 },
      },
      {
        id: "prodFogueteLançamento",
        nome: "Produção De Foguete De Lançamento",
        capacidadePorEdificio: 1,
        duracao: 365,
        input:  { chapaAltaTensão: 10, motorFoguete: 2, ControladorCarga: 10 },
        output: { fogueteLançamento: 1 },
      },
    ],
  },

  // Estaleiro — R$50M → teto ~R$600M/ciclo
  {
    edificioId: "estaleiro",
    nomeEdificio: "Estaleiro",
    setor: "industria",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "prodNavioConteineres",
        nome: "Produção De Navio De Conteineres",
        capacidadePorEdificio: 1,
        duracao: 540,             // 18 meses para navio de contêineres
        input:  { SeçãoCasco: 20, motorNaval: 2, vigaH: 10 },
        output: { navioConteineres: 1 },
      },
      {
        id: "prodNavioTanque",
        nome: "Produção De Navio Tanque",
        capacidadePorEdificio: 1,
        duracao: 480,
        input:  { SeçãoCasco: 30, motorNaval: 1, pistãoHidráulico: 10 },
        output: { navioPetroleiro: 1 },
      },
      {
        id: "prodNavioPesquisa",
        nome: "Produção De Navio De Pesquisa",
        capacidadePorEdificio: 1,
        duracao: 360,
        input:  { SeçãoCasco: 10, sondaTerreno: 2, tela: 5 },
        output: { navioPesquisa: 1 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // TECNOLOGIA — custos altos, produtos premium
  // ═══════════════════════════════════════════════════════

  // Fábrica De Smartphones — R$5M → teto ~R$40M/ciclo
  {
    edificioId: "fábricaSmartphones",
    nomeEdificio: "Fábrica De Smartphones",
    setor: "tecnologia",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "smartphoneStandard",
        nome: "Smartphone Standard",
        capacidadePorEdificio: 15, // 15×250×2000 = R$7.5M
        duracao: 30,
        input:  { placaMãe: 1, tela: 10, bateriaPortátil: 10 },
        output: { smartphoneBasico: 250 },
      },
      {
        id: "prodSmartphonePremium",
        nome: "Produção Smartphone Premium",
        capacidadePorEdificio: 8,  // 8×100×10000 = R$8M
        duracao: 35,
        input:  { microControlador: 5, câmeraPrecisão: 5, tela: 5 },
        output: { smartphonePremium: 100 },
      },
    ],
  },

  // Fábrica De Computadores — R$8M → teto ~R$64M/ciclo
  {
    edificioId: "fábricaComputadores",
    nomeEdificio: "Fábrica De Computadores",
    setor: "tecnologia",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "prodComputador",
        nome: "Produção De Computador",
        capacidadePorEdificio: 20, // 20×100×5000 = R$10M
        duracao: 30,
        input:  { placaMãe: 1, tela: 10, chapaAlumínio: 5 },
        output: { computador: 100 },
      },
      {
        id: "RacksServidor",
        nome: "Produção De Racks De Servidor",
        capacidadePorEdificio: 3,  // 3×2×2.5M = R$15M
        duracao: 45,
        input:  { microControlador: 10, placaIndustrial: 2, açoRefinado: 5 },
        output: { unidadeServidor: 2 },
      },
    ],
  },

  // Fábrica De Consoles — R$6M → teto ~R$48M/ciclo
  {
    edificioId: "fábricaConsoles",
    nomeEdificio: "Fábrica De Consoles De Jogos",
    setor: "tecnologia",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "prodConsoles",
        nome: "Produção De Console",
        capacidadePorEdificio: 15, // 15×120×4500 = R$8.1M
        duracao: 30,
        input:  { placaMãe: 1, placaFrequência: 1, polímero: 10 },
        output: { consoleJogos: 120 },
      },
      {
        id: "prodControle",
        nome: "Produção De Controle",
        capacidadePorEdificio: 50, // 50×1000×500 = R$25M
        duracao: 20,
        input:  { microControlador: 5, polímero: 10, fioCobre: 5 },
        output: { controle: 1000 },
      },
    ],
  },

  // Fábrica Dispositivos Vestíveis — R$3.5M → teto ~R$28M/ciclo
  {
    edificioId: "fábricaDispositivosVestíveis",
    nomeEdificio: "Fábrica De Dispositivos Vestíveis",
    setor: "tecnologia",
    maxAcoesSimultaneasPorNivel: { 1: 1, 2: 2, 3: 3 },
    formulas: [
      {
        id: "relogiosInteligentes",
        nome: "Produção De Relógios Inteligentes",
        capacidadePorEdificio: 50, // 50×70×1500 = R$5.25M
        duracao: 25,
        input:  { microControlador: 1, bateriaPortátil: 1, tela: 1, polímero: 2 },
        output: { smartwatch: 70 },
      },
      {
        id: "prodFonesOuvídos",
        nome: "Produção De Fones De Ouvídos",
        capacidadePorEdificio: 100, // 100×120×800 = R$9.6M
        duracao: 20,
        input:  { microControlador: 2, bateriaPortátil: 1, microMotor: 1 },
        output: { foneOuvido: 120 },
      },
    ],
  },
];