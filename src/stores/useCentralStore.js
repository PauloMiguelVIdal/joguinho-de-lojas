import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { carregarSalvo } from '../components/usePersistencia'

// ─── Estado dinâmico inicial ──────────────────────────────────────────────────

export const EDIFICIOS_BASE_DINAMICOS = {
    terrenos: {
        achievements: { 5: false, 10: false, 20: false, 50: false, 100: false, 200: false, 500: false, 1000: false },
        arrayFatu: [], somaArrayFatu: "",
        quantidade: 0, preçoConstrução: 40000,
        faturamentoUnitário: 130, faturamentoUnitárioPadrão: 130,
        faturamentoTotal: 0, faturamentoMensal: 0,
        impostoFixo: 1500, valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0.02, valorImpostoSobreFaturamento: 0,
        valorImpostoMensal: 0,
    },
    lojasP: {
        achievements: { 5: false, 10: false, 20: false, 50: false, 100: false, 200: false, 500: false, 1000: false },
        arrayFatu: [], somaArrayFatu: 0,
        quantidade: 0, preçoConstrução: 50000,
        faturamentoUnitário: 850, faturamentoUnitárioPadrão: 850,
        faturamentoTotal: 0, faturamentoMensal: 0, despesas: 0,
        impostoFixo: 6000, valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0.05, valorImpostoSobreFaturamento: 0,
    },
    lojasM: {
        achievements: { 5: false, 10: false, 20: false, 50: false, 100: false, 200: false, 500: false, 1000: false },
        arrayFatu: [], somaArrayFatu: "",
        quantidade: 0, preçoConstrução: 100000,
        faturamentoUnitário: 2000, faturamentoUnitárioPadrão: 2000,
        faturamentoTotal: 0, faturamentoMensal: 0, despesas: 0,
        impostoFixo: 10000, valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0.07, valorImpostoSobreFaturamento: 0,
    },
    lojasG: {
        achievements: { 5: false, 10: false, 20: false, 50: false, 100: false, 200: false, 500: false, 1000: false },
        arrayFatu: [], somaArrayFatu: "",
        quantidade: 0, preçoConstrução: 240000,
        faturamentoUnitário: 5000, faturamentoUnitárioPadrão: 5000,
        faturamentoTotal: 0, faturamentoMensal: 0, despesas: 0,
        impostoFixo: 15000, valorImpostoFixoTotal: 0,
        impostoSobreFaturamento: 0.1, valorImpostoSobreFaturamento: 0,
    },
}

export const LICENCAS_DINAMICAS_GLOBAIS = {
    agricultura: {
        licençaGlobal: {
            comprado: true,
        },
    },
    tecnologia: {
        licençaGlobal: {
            comprado: true,
        },
    },
    industria: {
        licençaGlobal: {
            comprado: true,
        },
    },
    comercio: {
        licençaGlobal: {
            comprado: true,
        },
    },
    imobiliario: {
        licençaGlobal: {
            comprado: true,
        },
    },
    energia: {
        licençaGlobal: {
            comprado: true,
        },
    },
    grafico: {
        licençaGlobal: {
            comprado: true,
        },
    },
    carteira: {
        licençaGlobal: {
            comprado: true,
        },
    },
    gerenciamento: {
        licençaGlobal: {
            comprado: true,
        },
    },
    ecossistema: {
        licençaGlobal: {
            comprado: true,
        },
    },
    mercado: {
        licençaGlobal: {
            comprado: true,
        },
    },
}

export const EDIFICIOS_FINAIS_DINAMICOS_INICIAL = {
    agricultura: {
        edificios: [
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
        ]
    },
    tecnologia: {
        edificios: [
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
        ]
    },
    industria: {
        edificios: [
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
        ]
    },
    comercio: {

        edificios: [
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
        ]
    },
    imobiliario: {
        edificios: [
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
        ]
    },
    energia: {
        edificios: [
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
            {
                licençaLiberado: { liberado: false },
                quantidade: 0,
                powerUp: { redCustoAtual: 0, aumFatuAtual: 0 },
            },
        ]
    }
}

export const LICENCAS_STATUS_INICIAL = {
    agricultura: [
        { status: false }, // Licença Global De Agricultura
        { status: false }, // Licença De Base Agrícola
        { status: false }, // Licença De Outras Plantações
        { status: false }, // Licença De Fazendas De Animais
        { status: false }, // Licença De Madeira
        { status: false }, // Licença De Minérios Base
        { status: false }, // Licença De Comércios Agrícolas
    ],
    tecnologia: [
        { status: false }, // Licença Global De Tecnologia
        { status: false }, // Licença De Empreendimentos Tech
        { status: false }, // Licença De Plataformas Digitais
        { status: false }, // Licença Agro e Biotecnologia
        { status: false }, // Licença Eletrônica e Design
        { status: false }, // Licença De Fábricas Tecnológicas
        { status: false }, // Licença De Tecnologia Experimental
        { status: false }, // Licença De Engenharia Avançada
        { status: false }, // Licença De Pesquisa Em Robótica e IA
    ],
    industria: [
        { status: false }, // Licença Global De Indústria
        { status: false }, // Licença De Fábricas Simples
        { status: false }, // Licença De Armazenamento Indústrial
        { status: false }, // Licença De Fábrica textil
        { status: false }, // Licença De Papel E Celulose
        { status: false }, // Licença De Produtos Químicos
        { status: false }, // Licença De Base Metalúrgica
        { status: false }, // Licença De Metalúrgia Avançada
        { status: false }, // Licença Automotiva
        { status: false }, // Licença De Refinaria
        { status: false }, // Licença Microeletrônica
        { status: false }, // Licença De Eletrônica Avançada
        { status: false }, // Licença De Engenharia Mecânica Avançada
    ],
    comercio: [
        { status: false }, // Licença Global De Comércio
        { status: false }, // Licença De Comércio Local
        { status: false }, // Licença De Serviços E Saúde
        { status: false }, // Licença Global De Comércio (duplicada)
        { status: false }, // Licença De Varejo
        { status: false }, // Licença De Varejo Especializado
        { status: false }, // Licença De Comércio De Tecnologia
        { status: false }, // Licença De Logística E Transporte
        { status: false }, // Licença De Comércio Urbano
        { status: false }, // Licença De Shoppings
    ],
    imobiliario: [
        { status: false }, // Licença Global Imobiliária
        { status: false }, // Licença De Projetos e Design
        { status: false }, // Licença De Construção Imobiliária
        { status: false }, // Licença Comercial E Residencial
        { status: false }, // Licença De Grandes Infraestruturas
        { status: false }, // Licença De Mineração
        { status: false }, // Licença De Construções Energéticas
    ],
    energia: [
        { status: false }, // Licença Global De Energia
        { status: false }, // Licença De Fábricas Energéticas
        { status: false }, // Licença De Comércios Energéticos
        { status: false }, // Licença De Melhoria Energética
        { status: false }, // Licença De Energia Sustentável
        { status: false }, // Licença De Usinas
        { status: false }, // Licença De Usinas Nucleares
    ],
    grafico: [],
    carteira: [],
    gerenciamento: [],
    ecossistema: [],
    mercado: [],
};



const estadoInicial = {
    // ── UI / controle ────────────────────────────────────────────────────────
    inicioGame: { estadoModal: true, nomeEmpresa: "" },
    nomeEmpresa: "",
    setorAtivo: "agricultura",
    fimGame: false,
    dia: 1000,
    animarCicloDia: null,
    chanceNovoEvento: 0,
    economiaGlobal: "estável",
    botãoOfertas: "btnNormal",
    proximaEconomia: "",
    proximaOferta: "",
    ofertas: [],
    itensSorteados: [],

    // ── Modais ────────────────────────────────────────────────────────────────
    // ── Modais ────────────────────────────────────────────────────────────────
    modal: { estadoModal: false, head: "", content: "" },
    modalEditável: { estadoModal: false, head: "", content: "" },
    modalAlert: { estadoModal: false, head: "", content: "" },
    modalAjuda: { estadoModal: false, head: "", content: "" },
    modalObjetivos: { estadoModal: false, head: "", content: "" },
    modalDespesas: { estadoModal: false, head: "", content: "" },
    modalEconomiaGlobal: { estadoModal: false, head: "", content: "" },
    modalOfertas: { estadoModal: false },
    modalAchievements: { estadoModal: false, lojaConquistada: "", conquista: 0 },
    modalPerson: { estadoModal: false, texto: "", tipo: "pensamento" },

    // 👉 ADICIONE ESSES 3 (ESSENCIAL)
    modalInicio: { estadoModal: false },
    modalCompraTerrenos: { estadoModal: false },
    modalContinuarDias: { estadoModal: false },

    modalExcesso: {
        estadoModal: false, confirmarAvanco: false,
        head: "Armazenamento insuficiente", content: "",
        quantidadeExcesso: 0, ofertaExcesso: 0,
    },
    despesas: {
        diaPagarDespesas: false,
        despesasPagas: true,
        proximoPagamento: "",
    },

    // ── Evento ────────────────────────────────────────────────────────────────
    eventoAtual: {
        eventoAtivo: false, title: "", lojaSelecionada: "",
        situacaoSelecionada: "", porcentagemSelecionada: "",
        periodoSelecionado: "", diaInicial: "", diaFinal: "",
        departamento: "", julgamento: "",
    },

    // ── Financeiro ────────────────────────────────────────────────────────────
    faturamento: { faturamentoDiário: 0, faturamentoMensal: 0, arrayFatuDiário: [] },
    relatóriosFaturamento: {},
    imposto: { impostoFixoMensal: 0, impostoDiário: 0, impostoMensal: 0, impostoSobreFaturamentoDiário: 0 },
    valoresDespesas: { terrenos: 0, lojasP: 0, lojasM: 0, lojasG: 0, impostos: 0, funcionários: 0, despesasTotais: 0 },

    // ── Edifícios dinâmicos ───────────────────────────────────────────────────
    edificiosBase: EDIFICIOS_BASE_DINAMICOS,
    edificiosFinais: EDIFICIOS_FINAIS_DINAMICOS_INICIAL,
    licençasStatus: LICENCAS_STATUS_INICIAL,
    licençasGlobais: {
        agricultura: false,
        tecnologia: false,
        industria: false,
        comercio: false,
        imobiliario: false,
        energia: false,
    },
    // ── Economia por setor ────────────────────────────────────────────────────
    economiaSetores: {
        agricultura: { estadoAtual: "estável" },
    },

    vision: { visionAtual: "dashboard" },
}
// ─── Store ────────────────────────────────────────────────────────────────────
const salvo = carregarSalvo()


console.log("edificiosFinais carregado:", JSON.stringify(salvo.central?.edificiosFinais?.agricultura))
console.log("licençasStatus carregado:", JSON.stringify(salvo.central?.licençasStatus?.agricultura))

// Migração de compatibilidade — corrige saves antigos
if (salvo.central) {
  // edificiosFinais: converte array direto para { edificios: [] } e completa índices faltando
  for (const setor of Object.keys(EDIFICIOS_FINAIS_DINAMICOS_INICIAL)) {
    const inicial = EDIFICIOS_FINAIS_DINAMICOS_INICIAL[setor].edificios;
    const salvoSetor = salvo.central.edificiosFinais?.[setor];

    if (Array.isArray(salvoSetor)) {
      // estrutura velha era array direto
      salvo.central.edificiosFinais[setor] = { edificios: salvoSetor };
    }

    const atual = salvo.central.edificiosFinais?.[setor]?.edificios ?? [];
    if (atual.length < inicial.length) {
      salvo.central.edificiosFinais[setor].edificios = [
        ...atual,
        ...inicial.slice(atual.length),
      ];
    }
  }

  // licençasStatus: completa arrays menores que o inicial
  for (const setor of Object.keys(LICENCAS_STATUS_INICIAL)) {
    const inicial = LICENCAS_STATUS_INICIAL[setor];
    const atual   = salvo.central.licençasStatus?.[setor] ?? [];
    if (atual.length < inicial.length) {
      salvo.central.licençasStatus[setor] = [
        ...atual,
        ...inicial.slice(atual.length),
      ];
    }
  }
}

export const useCentralStore = create(
    immer(
        persist(
            (set) => ({
                // Estado inicial (save sobrescreve se existir)
                ...(salvo.central ?? estadoInicial),

                algumModalAberto: () => {
                    const state = useCentralStore.getState();

                    // Lista de todos os seus objetos de modal
                    const modais = [
                        "modal", "modalEditável", "modalAlert", "modalAjuda",
                        "modalObjetivos", "modalDespesas", "modalEconomiaGlobal",
                        "modalOfertas", "modalAchievements", "modalPerson",
                        "modalExcesso", "modalInicio", "modalCompraTerrenos",
                        "modalContinuarDias"
                    ];

                    // Encontra qual modal está com estadoModal: true
                    const modalAberto = modais.find(key => state[key]?.estadoModal === true);

                    if (modalAberto) {
                        console.warn(`⚠️ Bloqueio de dia: O modal "${modalAberto}" está aberto.`);
                        return true;
                    }

                    return false;
                },
                // ── Atualizadores ───────────────────────────────────────────────────

                // Atualiza uma chave de primeiro nível
                // uso: atualizarDados('nomeEmpresa', 'Acme')
                atualizarDados: (chave, novoValor) =>
                    set((state) => { state[chave] = novoValor }),

                // Atualiza via caminho profundo (array de chaves)
                // uso: atualizarDadosProf(['edificiosBase','lojasP','quantidade'], 5)
                atualizarDadosProf: (caminho, novoValor) =>
                    set((state) => {
                        let ref = state
                        for (let i = 0; i < caminho.length - 1; i++) {
                            if (ref[caminho[i]] === undefined) {
                                console.warn(`❌ Caminho inválido em: ${caminho[i]}`)
                                return
                            }
                            ref = ref[caminho[i]]
                        }
                        ref[caminho[caminho.length - 1]] = novoValor
                    }),

                // Atualiza múltiplos caminhos de uma vez — evita renders encadeados
                // uso: atualizarLote([ [caminho1, valor1], [caminho2, valor2] ])
                // atualizarLote — substitua o atual por esta versão que valida array vs objeto:
                atualizarLote: (atualizacoes) =>
                    set((state) => {
                        for (const [caminho, novoValor] of atualizacoes) {
                            let ref = state
                            let valido = true
                            for (let i = 0; i < caminho.length - 1; i++) {
                                const chave = caminho[i]
                                if (ref[chave] === undefined || ref[chave] === null) {
                                    console.warn(`❌ Caminho inválido em: ${chave}`)
                                    valido = false
                                    break
                                }
                                // Immer: array só aceita índices numéricos, objeto aceita string
                                if (Array.isArray(ref[chave]) && typeof caminho[i + 1] === 'string' && isNaN(Number(caminho[i + 1]))) {
                                    console.warn(`❌ Tentativa de usar chave string "${caminho[i + 1]}" em array. Use objeto no estado.`)
                                    valido = false
                                    break
                                }
                                ref = ref[chave]
                            }
                            if (valido) {
                                ref[caminho[caminho.length - 1]] = novoValor
                            }
                        }
                    }),


                // Atualiza um edifício final dinâmico por setor + índice
                // uso: atualizarEdificio('agricultura', 0, { quantidade: 3 })
                atualizarEdificio: (setor, index, patch) =>
                    set((state) => {
                        Object.assign(state.edificiosFinais[setor].edificios[index], patch)
                    }),

                // Atualiza status de licença por setor + índice
                atualizarLicença: (setor, index, status) =>
                    set((state) => {
                        state.licençasStatus[setor][index].status = status
                    }),
            }),
            {
                name: 'central-dados',          // chave no localStorage
                partialize: (state) => {        // persiste só o dinâmico
                    const { atualizarDados, atualizarDadosProf,
                        atualizarLote, atualizarEdificio,
                        atualizarLicença, ...rest } = state
                    return rest
                },
            }
        )
    )
)