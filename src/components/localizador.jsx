import React from "react";
import { CardLocalization } from "./cardLocalization";
import { useAgricultura } from "./AgriculturaContext";
import { useImobiliario } from "./ImobiliarioContext";
import { useEnergia } from "./EnergiaContext";
import { useIndustria } from "./IndustriaContext";
import { useComercio } from "./ComercioContext";
import { useTecnologia } from "./TecnologiaContext";

export const Localizador = ({ edificioProcurado }) => {
  // 🔹 Chamar todos os hooks no TOPO
  const { dadosAgricultura } = useAgricultura();
  const { dadosImobiliario } = useImobiliario();
  const { dadosEnergia } = useEnergia();
  const { dadosIndustria } = useIndustria();
  const { dadosComercio } = useComercio();
  const { dadosTecnologia } = useTecnologia();

  // 🔹 Mapear todos os setores já resolvidos
  const dadosPorSetor = {
    agricultura: dadosAgricultura,
    tecnologia: dadosTecnologia,
    industria: dadosIndustria,
    comercio: dadosComercio,
    imobiliario: dadosImobiliario,
    energia: dadosEnergia,
  };


  const mapaEdificioParaSetor = {
    // Agricultura
    "Plantação De Grãos": "agricultura",
    "Plantação De Vegetais": "agricultura",
    "Fazenda Administrativa": "agricultura",
    "Pomares": "agricultura",
    "Cooperativa Agrícola": "agricultura",
    "Centro De Comércio De Plantações": "agricultura",
    "Fazenda De Vacas": "agricultura",
    "Granja De Aves": "agricultura",
    "Criação De Ovinos": "agricultura",
    "Armazém": "agricultura",
    "Silo": "agricultura",
    "Depósito De Resíduos Orgânicos": "agricultura",
    "Madeireira": "agricultura",
    "Área Florestal": "agricultura",
    "Terreno De Mineração": "agricultura",
    "Plantação De Eucalipto": "agricultura",
    "Plantação De Plantas Medicinais": "agricultura",

    // Indústria
    "Fábrica De Móveis": "industria",
    "Fábrica De Ração": "industria",
    "Fábrica De Embalagem": "industria",
    "Fábrica De Fertilizante": "industria",
    "Fábrica De Bebidas": "industria",
    "Fábrica De Pães": "industria",
    "Fábrica Textil": "industria",
    "Fábrica De Calçados": "industria",
    "Fábrica De Roupas": "industria",
    "Fábrica De Celulose": "industria",
    "Fábrica De Papel": "industria",
    "Fábrica De Livros": "industria",
    "Fábrica De Medicamentos": "industria",
    "Laboratório Farmacêutico": "industria",
    "Fábrica De Plasticos": "industria",
    "Fábrica De Químicos Especializados": "industria",
    "Alto-Forno": "industria",
    "Usina Siderúrgica": "industria",
    "Fundição de Alumínio": "industria",
    "Fábrica De Ligas Metálicas": "industria",
    "Indústria De Componentes Mecânicos": "industria",
    "Fábrica De Chapas Metálicas": "industria",
    "Fábrica De Estruturas Metálicas": "industria",
    "Fábrica De Peças Automotivas": "industria",
    "Montadora De Veículos Elétricos": "industria",
    "Fábricas De Automóveis": "industria",
    "Refinaria de Biocombustíveis": "industria",
    "Refinaria": "industria",
    "Biofábrica": "industria",
    "Fábrica De Chips": "industria",
    "Fábrica De Placas Eletrônicas": "industria",
    "Fábrica De Semicondutores": "industria",
    "Fábrica De Eletrônicos": "industria",
    "Fábrica De Robôs": "industria",
    "Empresa De Automação Industrial": "industria",
    "Fábrica De Motores": "industria",
    "Fábrica De Foguetes": "industria",
    "Fábrica De Aeronaves": "industria",
    "Estaleiro": "industria",

    // Pesquisa
    "Startup": "tecnologia",
    "Servidor Em Nuvem": "tecnologia",
    "Data Center": "tecnologia",
    "Empresa De Desenvolvimento De Software": "tecnologia",
    "Empresa De Telecomunicações": "tecnologia",
    "Empresa De Desenvolvimento De Software": "tecnologia",
    "Plataforma De Redes Sociais": "tecnologia",
    "Marketplace Online": "tecnologia",
    "Plataforma De Streaming": "tecnologia",
    "Fábrica De Smartphones": "tecnologia",
    "Fábrica De Computadores": "tecnologia",
    "Fábrica De Consoles de Jogos": "tecnologia",
    "Fábrica De Dispositivos Vestiveis": "tecnologia",
    "Instituto De Tecnologia Alimentar ": "tecnologia",
    "Centro De Pesquisa Agrícola": "tecnologia",
    "Instituto de Biotecnologia": "tecnologia",
    "Laboratório De Nanotecnologia": "tecnologia",
    "Centro De Pesquisa Em Eletrônicos": "tecnologia",
    "Laboratório De Design De Produtos": "tecnologia",
    "Centro de Pesquisa Química": "tecnologia",
    "Centro De Pesquisa Em Fusão Nuclear": "tecnologia",
    "Laboratório De Novos Combustíveis": "tecnologia",
    "Centro De Pesquisa Aeroespacial": "tecnologia",
    "Centro de Engenharia Avançada ": "tecnologia",
    "Centro de Pesquisa em Materiais Avançados": "tecnologia",
    "Centro De Pesquisa Em Robótica": "tecnologia",
    "Centro De Pesquisa Em IA": "tecnologia",

    // Comércio
    "Feira": "comercio",
    "Loja De Móveis": "comercio",
    "Restaurante": "comercio",
    "Livraria": "comercio",
    "Mercado": "comercio",
    "Adega": "comercio",
    "Padaria": "comercio",
    "Açougue": "comercio",
    "Loja De Conveniência": "comercio",
    "Posto De Combustíveis": "comercio",
    "Redes De Fast-food": "comercio",
    "Petshop": "comercio",
    "Farmácia": "comercio",
    "Cafeteria": "comercio",
    "Loja De Departamentos": "comercio",
    "Loja De Calçados": "comercio",
    "Loja De Vestuário": "comercio",
    "Loja de Gadgets e Wearables": "comercio",
    "Loja De Games": "comercio",
    "Loja De Celulares": "comercio",
    "Loja De Informática": "comercio",
    "Loja De Eletrônicos": "comercio",
    "Joalheria": "comercio",
    "Concessionária De Veículos": "comercio",
    "Shopping Popular": "comercio",
    "Shopping Center": "comercio",
    "Centro De Transporte e Entrega": "comercio",
    "Centro De Distribuição": "comercio",
    "Armazém Logístico": "comercio",
    "Transporte Petrolífero": "comercio",

    // Infraestrutura
    "Cartório E Licenças": "imobiliario",
    "Terraplanagem E Pavimentação": "imobiliario",
    "Construtora De Pequenas Obras": "imobiliario",
    "Escritório De Design De Interiores": "imobiliario",
    "Escritório De Arquitetura ": "imobiliario",
    "Consultoria Em Engenharia Civil": "imobiliario",
    "Construtora": "imobiliario",
    "Imobiliária Residencial": "imobiliario",
    "Imobiliária Comercial ": "imobiliario",
    "Construtora De Infraestruturas": "imobiliario",
    "Aeroporto": "imobiliario",
    "Porto": "imobiliario",
    "Mineradora": "imobiliario",
    "Mineradora Radioativa": "imobiliario",
    "Mineradora De Pedras Preciosas": "imobiliario",
    "Mega Mercado": "imobiliario",
    "Prédio De Alto Padrão": "imobiliario",
    "Centro De Coleta De Biomassa": "imobiliario",
    "Tanque De Armazenamento Biocombustível": "imobiliario",
    "Plataforma De Petróleo": "imobiliario",

    // Energia
    "Subestação De Energia": "energia",
    "Rede De Distribuição Elétrica": "energia",
    "Usina Solar": "energia",
    "Fábrica De Turbinas Eólicas": "energia",
    "Fábrica De Painéis Solares": "energia",
    "Fábrica De Baterias": "energia",
    "Empresa De Comercio Energético": "energia",
    "Empresa De Consultoria Energética": "energia",
    "Estação De Carregamento": "energia",
    "Centro de Pesquisa Em Energias Renováveis": "energia",
    "Centro De Pesquisa Energética": "energia",
    "Centro De Reciclagem De Baterias": "energia",
    "Usina Termelétrica A Biocombustíveis": "energia",
    "Usina De Biomassa": "energia",
    "Usina Hidrelétrica": "energia",
    "Parque Eólico": "energia",
    "Usina Termolétrica": "energia",
    "Reator Nuclear Convencional": "energia",
    "Usina De Fusão Nuclear": "energia"
};


const setorEncontrado = mapaEdificioParaSetor[edificioProcurado];
const dadosCorretosSetor = dadosPorSetor[setorEncontrado];

// 🔹 Procurar índice do edifício dentro do setor
let indice = -1;
if (dadosCorretosSetor && dadosCorretosSetor[setorEncontrado]) {
  indice = dadosCorretosSetor[setorEncontrado].edificios.findIndex(
    (ed) => ed.nome === edificioProcurado
  );
}

const verificadorLocalizado = indice === -1 ? "não achou" : "achou";

console.log("Edifício procurado:", edificioProcurado);
console.log("Setor encontrado:", setorEncontrado);
console.log("Dados corretos:", dadosCorretosSetor);
console.log("Índice:", indice, verificadorLocalizado);

  return (
<CardLocalization index={indice} setor={setorEncontrado}/>
  );
};