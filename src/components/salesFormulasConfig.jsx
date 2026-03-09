

export const SALES_EDIFICIOS = [
    {
        edificioId: "Açougue",
        nomeEdificio: "Açougue",
        setor: "comercio",
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
    },
    {
        edificioId: "Petshop",
        nomeEdificio: "Petshop",
        setor: "comercio",
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
                id: "sellRacaoDeVacas",
                produto: "racaoDeVacas",
                margemBase: 20,
            },
            {
                id: "sellRacaoDePorco",
                produto: "racaoDeAves",
                margemBase: 20,
            },
            {
                id: "sellRacaoDePorco",
                produto: "racaoDeOvinos",
                margemBase: 20,
            },
            {
                id: "sellRacaoDePorco",
                produto: "racaoDePorco",
                margemBase: 20,
            },
        ],
    },
    {
        edificioId: "Livraria",
        nomeEdificio: "Livraria",
        setor: "comercio",
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
                id: "sellLivroComum",
                produto: "livroComum",
                margemBase: 20,
            },
            {
                id: "sellLivroPremium",
                produto: "livroPremium",
                margemBase: 20,
            },
        ],
    },
    {
        edificioId: "Mercado",
        nomeEdificio: "Mercado",
        setor: "comercio",
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
                id: "sellracaoDeVacas",
                produto: "racaoDeVacas",
                margemBase: 20,
            },
            {
                id: "sellFrango",
                produto: "racaoDeAves",
                margemBase: 20,
            },
            {
                id: "sellCarneSuina",
                produto: "racaoDeOvinos",
                margemBase: 20,
            },
            {
                id: "sellCarneOvino",
                produto: "racaoDePorco",
                margemBase: 20,
            },
        ],
    },
    {
        edificioId: "Posto De Combustíveis",
        nomeEdificio: "Posto De Combustíveis",
        setor: "comercio",
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
                id: "sellDiesel",
                produto: "diesel",
                margemBase: 20,
            },
        ],
    },
    {
        edificioId: "Loja De Calçados",
        nomeEdificio: "Loja De Calçados",
        setor: "comercio",
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
                id: "sellTenisCorrida",
                produto: "tenisCorrida",
                margemBase: 20,
            },
            {
                id: "sellSapatoLuxo",
                produto: "sapatoLuxo",
                margemBase: 20,
            },
        ],
    },
    {
        edificioId: "Loja De Vestuário",
        nomeEdificio: "Loja De Vestuário",
        setor: "comercio",
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
                id: "sellCamisetaAlgodão",
                produto: "camisetaAlgodão",
                margemBase: 20,
            },
            {
                id: "sellCasacoLã",
                produto: "casacoLã",
                margemBase: 20,
            },
            {
                id: "sellRoupasDryFit",
                produto: "roupasDryFit",
                margemBase: 20,
            },
        ],
    },
    {
        edificioId: "Farmácia",
        nomeEdificio: "Farmácia",
        setor: "comercio",
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
                id: "sellComprimidosGenéricos",
                produto: "comprimidosGenéricos",
                margemBase: 20,
            },
            {
                id: "sellFrascoVitamina",
                produto: "frascoVitamina",
                margemBase: 20,
            },
            {
                id: "sellBisnagaTratamento",
                produto: "bisnagaTratamento",
                margemBase: 20,
            },
            {
                id: "sellTesteLaboratorial",
                produto: "testeLaboratorial",
                margemBase: 20,
            },
        ],
    },
    {
        edificioId: "Loja De Games",
        nomeEdificio: "Loja De Games",
        setor: "comercio",
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
                id: "sellConsoleJogos",
                produto: "consoleJogos",
                margemBase: 20,
            },
        ],
    },
    {
        edificioId: "Loja De Celulares",
        nomeEdificio: "Loja De Celulares",
        setor: "comercio",
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
                id: "sellSmartphoneBasico",
                produto: "smartphoneBasico",
                margemBase: 20,
            },
            {
                id: "sellSmartphonePremium",
                produto: "smartphonePremium",
                margemBase: 20,
            },
        ],
    },
    {
        edificioId: "Loja De Gadgets E Wearables",
        nomeEdificio: "Loja De Gadgets E Wearables",
        setor: "comercio",
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
                id: "sellSmartwatch",
                produto: "smartwatch",
                margemBase: 20,
            },
            {
                id: "sellFoneOuvido",
                produto: "foneOuvido",
                margemBase: 20,
            },
        ],
    },
    {
        edificioId: "Loja De Informática",
        nomeEdificio: "Loja De Informática",
        setor: "comercio",
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
                id: "sellComputador",
                produto: "computador",
                margemBase: 20,
            },
            {
                id: "sellUnidadeServidor",
                produto: "unidadeServidor",
                margemBase: 20,
            },
        ],
    },
    {
        edificioId: "Loja De Eletrônicos",
        nomeEdificio: "Loja De Eletrônicos",
        setor: "comercio",
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
                id: "sellComputador",
                produto: "computador",
                margemBase: 20,
            },
            {
                id: "sellUnidadeServidor",
                produto: "unidadeServidor",
                margemBase: 20,
            },
        ],
    },
    {
        edificioId: "Concessionária De Veículos",
        nomeEdificio: "Concessionária De Veículos",
        setor: "comercio",
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
                id: "sellCarroPopular",
                produto: "carroPopular",
                margemBase: 20,
            },
            {
                id: "sellCarroEsportivo",
                produto: "carroEsportivo",
                margemBase: 20,
            },
            {
                id: "sellCarroElétrico",
                produto: "carroElétrico",
                margemBase: 20,
            },
            {
                id: "sellHiperCarroElétrico",
                produto: "hiperCarroElétrico",
                margemBase: 20,
            },
            {
                id: "sellCaminhãoElétrico",
                produto: "caminhãoElétrico",
                margemBase: 20,
            },
        ],
    },
]