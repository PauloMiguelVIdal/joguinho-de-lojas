import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import fechar from "../imagens/fechar.png"
import { CardLocalization } from "./cardLocalization";
import { Localizador } from "./localizador";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import alvo from "../imagens/alvo.png"
const RaffledBuildings = () => {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);
    const [ModalObjOpen, setIsModalObjOpen] = useState(false);

    // Arrays para sortear
    const RankS = [
        "Usina Hidrelétrica",
        "Reator Nuclear Convencional",
        "Usina De Fusão Nuclear",
        "Shopping Popular",
        "Shopping Center",
        "Fábrica De Computadores",
        "Construtora De Infraestruturas",
        "Aeroporto",
        "Porto",
        "Mineradora Radioativa",
        "Plataforma De Petróleo",
        "Montadora De Veículos Elétricos",
        "Fábrica De Automóveis",
        "Refinaria",
        "Fábrica De Chips",
        "Fábrica De Semicondutores",
        "Fábrica De Robôs",
        "Fábrica De Motores",
        "Fábrica De Foguetes",
        "Fábrica De Aeronaves"
    ];

    const RankA = [
        "Cooperativa Agrícola",
        "Usina De Biomassa",
        "Transporte Petrolífero",
        "Marketplace Online",
        "Plataforma De Streaming",
        "Fábrica De Smartphones",
        "Fábrica De Consoles De Jogos",
        "Fábrica De Dispositivos Vestiveis",
        "Centro De Pesquisa Em Fusão Nuclear",
        "Centro De Pesquisa Aeroespacial",
        "Centro De Engenharia Avançada",
        "Centro De Pesquisa Em Materiais Avançados",
        "Centro De Pesquisa Em IA",
        "Mineradora De Pedras Preciosas",
        "Mega Mercado",
        "Prédio De Alto Padrão",
        "Tanque De Armazenamento Biocombustível",
        "Fábrica De Plásticos",
        "Fábrica De Químicos Especializados",
        "Alto-Forno",
        "Usina Siderúrgica",
        "Fundição De Alumínio",
        "Fábrica De Ligas Metálicas",
        "Fábrica De Peças Automotivas",
        "Refinaria De Biocombustíveis",
        "Biofábrica",
        "Fábrica De Eletrônicos",
        "Empresa De Automação Industrial",
        "Estaleiro"
    ];

    const RankB = [
        "Centro De Comércio De Plantações",
        "Empresa De Comercio Energético",
        "Empresa De Consultoria Energética",
        "Centro De Pesquisa Em Energias Renováveis",
        "Centro De Pesquisa Energética",
        "Usina Termelétrica A Biocombustíveis",
        "Usina De Biomassa",
        "Usina Termolétrica",
        "Joalheria",
        "Concessionária De Veículos",
        "Centro De Distribuição",
        "Armazém Logístico",
        "Servidor Em Nuvem",
        "Data Center",
        "Empresa De Desenvolvimento De Software",
        "Empresa De Jogos Digitais",
        "Empresa De Telecomunicações",
        "Plataforma De Redes Sociais",
        "Marketplace Online",
        "Instituto De Tecnologia Alimentar",
        "Centro De Pesquisa Agrícola",
        "Instituto De Biotecnologia",
        "Laboratório De Nanotecnologia",
        "Centro De Pesquisa Em Eletrônicos",
        "Laboratório De Design De Produtos",
        "Laboratório De Novos Combustíveis",
        "Centro De Engenharia Avançada",
        "Centro De Pesquisa Em Robótica",
        "Construtora",
        "Imobiliária Residencial",
        "Imobiliária Comercial",
        "Mineradora",
        "Centro De Coleta De Biomassa",
        "Fábrica De Fertilizante",
        "Fábrica De Medicamentos",
        "Laboratório Farmacêutico",
        "Fábrica De Plásticos",
        "Alto-Forno",
        "Indústria De Componentes Mecânicos",
        "Fábrica De Chapas Metálicas",
        "Fábrica De Estruturas Metálicas",
        "Fábrica De Peças Automotivas",
        "Fábrica De Placas Eletrônicas",
        "Fábrica De Eletrônicos"
    ];

    const RankC = [
        "Plantação De Grãos",
        "Plantação De Vegetais",
        "Pomares",
        "Fazenda Administrativa",
        "Fazenda De Vacas",
        "Granja De Aves",
        "Criação De Ovinos",
        "Armazém",
        "Silo",
        "Depósito De Resíduos Orgânicos",
        "Madeireira",
        "Área Florestal",
        "Terreno De Mineração",
        "Plantação De Eucalipto",
        "Plantação De Plantas Medicinais",
        "Subestação De Energia",
        "Rede De Distribuição Elétrica",
        "Usina Solar",
        "Fábrica De Turbinas Eólicas",
        "Fábrica De Painéis Solares",
        "Fábrica De Baterias",
        "Estação De Carregamento",
        "Centro De Reciclagem De Baterias",
        "Parque Eólico",
        "Feira",
        "Loja De Móveis",
        "Restaurante",
        "Livraria",
        "Mercado",
        "Adega",
        "Padaria",
        "Açougue",
        "Loja De Conveniência",
        "Posto De Combustíveis",
        "Redes De Fast-food",
        "Petshop",
        "Farmácia",
        "Cafeteria",
        "Loja De Departamentos",
        "Loja De Calçados",
        "Loja De Vestuário",
        "Loja De Gadgets E Wearables",
        "Loja De Games",
        "Loja De Celulares",
        "Loja De Informática",
        "Loja De Eletrônicos",
        "Centro De Transporte E Entrega",
        "Startup",
        "Centro De Pesquisa Química",
        "Cartório E Licenças",
        "Terraplanagem E Pavimentação",
        "Construtora De Pequenas Obras",
        "Escritório De Design De Interiores",
        "Escritório De Arquitetura",
        "Consultoria Em Engenharia Civil",
        "Fábrica De Móveis",
        "Fábrica De Ração",
        "Fábrica De Embalagem",
        "Fábrica De Bebidas",
        "Fábrica De Pães",
        "Fábrica Textil",
        "Fábrica De Calçados",
        "Fábrica De Roupas",
        "Fábrica De Celulose",
        "Fábrica De Papel",
        "Fábrica De Livros"
    ];
    const EdificiosSelecionados = []
    const [selectedItems, setSelectedItems] = useState([]);
    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];

    const fecharModal = () => {
        // atualizarDados('modalObjetivos', { ...dados.modalObjetivos, estadoModal: false })
        setIsModalObjOpen(false)
    };

    // Função para sortear N itens de um array (pode repetir)
    const getRandomItems = (array, count) => {
        let items = [];
        for (let i = 0; i < count; i++) {
            items.push(array[Math.floor(Math.random() * array.length)]);
        }
        return items;
    };

    const raffleItems = () => {
        // Sorteia nomes
        const copyS = [...RankS];
        const copyA = [...RankA];
        const copyB = [...RankB];
        const copyC = [...RankC];

        const getUniqueItems = (array, count) => {
            const result = [];
            for (let i = 0; i < count && array.length > 0; i++) {
                const idx = Math.floor(Math.random() * array.length);
                result.push(array[idx]);
                array.splice(idx, 1); // remove o item para não repetir
            }
            return result;
        };

        const nomesSorteados = [
            ...getUniqueItems(copyS, 1),
            ...getUniqueItems(copyA, 2),
            ...getUniqueItems(copyB, 4),
            ...getUniqueItems(copyC, 8),
        ];

        // Converte nomes em objetos da carteira
        const objetosSelecionados = nomesSorteados.map(nome => {
            for (const setor of setoresArr) {
                const edificio = dados[setor]?.edificios?.find(ed => ed.nome === nome);
                if (edificio) return edificio;
            }
            return null;
        }).filter(Boolean);
        console.log("Nomes sorteados:", nomesSorteados);
        console.log("Objetos encontrados:", objetosSelecionados);
        setSelectedItems(objetosSelecionados);
        atualizarDados("itensSorteados", {
            itensSorteados: nomesSorteados
        });
    };


    return (
        <div>


            <button onClick={() => setIsModalObjOpen(true)} className={`bg-laranja min-h-[50px] hover:bg-[#E56100] active:scale-95 hover:scale-[1.05] max-h-[70px] min-w-[50px] max-w-[70px] aspect-square rounded-[10px] flex w-[50px] items-center justify-center`}>
                <img className="w-[60%] max-w-[58px] aspect-square" src={alvo} alt="Economia" />
            </button>
            {/* Modal */}
            {ModalObjOpen && (
                <div className="flex justify-center items-center z-10 bg-black bg-opacity-80 w-[100vw] h-[100vh] fixed top-0 left-0 select-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-[95vw] h-[95vh] bg-[#350973] rounded-[20px] z-20 relative"
                    >
                        <h1 className="text-center text-white p-[10px] text-[30px] fonteBold">
                            Objetivos do jogo
                        </h1>
                        <div className="w-[80%] h-[10px] bg-gradient-to-l from-laranja to-roxo flex rounded-[5px] relative m-auto"></div>
                        <div>
                            <div className="overflow-x-hidden overflow-y-auto scrollbar-custom h-[calc(100%-120px)] mt-4 rounded-[10px]">
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 px-4 pb-4">
                                    {selectedItems.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {Localizador(item.nome)}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button onClick={raffleItems}>Abrir Modal</button>

                        <button
                            className="bg-laranja absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex justify-center items-center rounded-[10px] hover:bg-[#E56100] active:scale-95"
                            onClick={fecharModal}
                        >
                            <img src={fechar} alt="" className="w-[60%]" />
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );

}

export default RaffledBuildings;
