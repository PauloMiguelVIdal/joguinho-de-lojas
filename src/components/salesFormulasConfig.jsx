export const CONTRACT_PERIODS = [20, 30, 40, 50];

export const SALES_EDIFICIOS = [
    {
        edificioId: "Açougue",
        nomeEdificio: "Açougue",
        setor: "comércio",
        categoriasPermitidas: ["pereciveis"],
        capacidadePorEdificio: 1000, // kg
        maxContratosDisponiveisPorNível: 4,
        maxAcoesSimultaneasPorNivel: {
            1: 1,
            2: 2,
            3: 3,
        },
        periodoNovosContratos: 30,
        variacaoMargem: {
            min: -5,
            max: 10
        },
        rangeQuantidadeContrato: {
            minCapacidadeMultiplicador: 0.5,
            maxCapacidadeMultiplicador: 5
        },

        rangeDuracaoContrato: {
            min: 20,
            max: 50
        },
        multiplicadorNivel: {
            1: 1,
            2: 1.5,
            3: 2
        },
        formulas: [
            {
                id: "sellCarneBovina",
                produto: "carneBovina",
                margemBase: 20,
            },
            {
                id: "sellFrango",
                produto: "frango",
                margemBase: 20,
            },
            {
                id: "sellCarneSuina",
                produto: "carneSuina",
                margemBase: 20,
            },
            {
                id: "sellCarneOvino",
                produto: "carneOvino",
                margemBase: 20,
            },
        ],
    }
]