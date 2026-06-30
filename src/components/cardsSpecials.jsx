import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";
import { DadosEconomyGlobalContext } from "../dadosEconomyGlobal";

export const CardSpecials = () =>{

    
    const { economiaSetores, setEconomiaSetores, atualizarEco } = useContext(DadosEconomyGlobalContext);
    
    const { dados, atualizarDados, atualizarDadosProf2, atualizarDadosProf3, atualizarDadosProf } = useContext(CentraldeDadosContext);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    const arrayConstrutoraPeq = [
        "Fazenda Administrativa",
        "Granja De Aves",
        "Criação De Ovinos",
        "Armazém",
        "Silo",
        "Depósito De Resíduos Orgânicos",
        "Subestação De Energia",
        "Estação De Carregamento",
        "Feira",
        "Loja De Móveis",
        "Restaurante",
        "Livraria",
        "Loja De Bebidas",
        "Padaria",
        "Açougue",
        "Loja De Conveniência",
        "Rede De Fast-Food",
        "Petshop",
        "Farmácia",
        "Cafeteria",
        "Loja De Departamentos",
        "Loja De Calçados",
        "Loja De Vestuário",
        "Loja De Celulares",
        "Loja De Eletrônicos",
        "Cartório E Licenças",
        "Terraplanagem E Pavimentação",
        "Fábrica De Móveis",
        "Fábrica De Rações",
        "Fábrica De Embalagens",
        "Fábrica De Bebidas",
        "Fábrica De Pães",
        "Fábrica De Calçados",
        "Fábrica De Roupas",
        "Fazenda De Vacas",
        "Madeireira",
        "Rede De Distribuição Elétrica",
        "Usina Solar",
        "Fábrica De Turbinas Eólicas",
        "Fábrica De Painéis Solares",
        "Fábrica De Baterias",
        "Centro De Reciclagem De Baterias",
        "Parque Eólico",
        "Mercado",
        "Loja De Gadgets E Wearables",
        "Loja De Games",
        "Loja De Informática",
        "Centro De Transporte E Entrega",
        "Centro De Distribuição",
        "Startup",
        "Centro De Pesquisa Química",
        "Construtora De Pequenas Obras",
        "Escritório De Design De Interiores",
        "Escritório De Arquitetura",
        "Consultoria Em Engenharia Civil",
        "Fábrica Têxtil",
        "Fábrica De Celulose",
        "Fábrica De Papel",
        "Fábrica De Livros",
        "Empresa De Comércio Energético",
        "Empresa De Consultoria Energética",
        "Centro De Pesquisa Em Energias Renováveis",
        "Centro De Pesquisa Energética",
        "Posto De Combustíveis",
        "Joalheria",
        "Armazém Logístico",
        "Servidor Em Nuvem",
        "Data Center",
        "Instituto De Tecnologia Alimentar",
        "Centro De Pesquisa Agrícola",
        "Imobiliária Residencial",
        "Fábrica De Medicamentos"
    ];
    
    const arrayConstrutora = [
        "Centro De Comércio De Plantações",
        "Usina Termelétrica",
        "Concessionária De Veículos",
        "Empresa De Desenvolvimento De Software",
        "Empresa De Jogos Digitais",
        "Empresa De Telecomunicações",
        "Plataforma De Redes Sociais",
        "Instituto De Biotecnologia",
        "Laboratório De Nanotecnologia",
        "Centro De Pesquisa Em Eletrônicos",
        "Laboratório De Design De Produtos",
        "Laboratório De Novos Combustíveis",
        "Centro De Pesquisa Em Robótica",
        "Construtora",
        "Imobiliária Comercial",
        "Mineradora",
        "Centro De Coleta De Biomassa",
        "Laboratório Farmacêutico",
        "Indústria De Componentes Mecânicos",
        "Fábrica De Chapas Metálicas",
        "Fábrica De Estruturas Metálicas",
        "Fábrica De Placas Eletrônicas",
        "Usina Termelétrica Movida A Biocombustíveis",
        "Usina De Biomassa",
        "Marketplace Online",
        "Plataforma De Streaming",
        "Fábrica De Dispositivos Vestíveis",
        "Centro De Engenharia Avançada",
        "Centro De Pesquisa Em Materiais",
        "Centro De Pesquisa Em Inteligência Artificial",
        "Fábrica De Fertilizantes",
        "Fábrica De Plásticos",
        "Fábrica De Químicos Especializados",
        "Alto-Forno",
        "Fábrica De Peças Automotivas",
        "Fábrica De Eletrônicos",
        "Centro De Pesquisa Em Fusão Nuclear",
        "Tanque De Armazenamento De Biocombustíveis",
        "Fundição De Alumínio",
        "Fábrica De Ligas Metálicas",
        "Biofábrica",
        "Empresa De Automação Industrial"
    ];
    
    
    const arrayConstrutoraInfraestrutura = [
        "Cooperativa Agrícola",
        "Shopping Popular",
        "Transporte Petrolífero",
        "Fábrica De Smartphones",
        "Fábrica De Computadores",
        "Fábrica De Consoles De Jogos",
        "Centro De Pesquisa Aeroespacial",
        "Mineradora De Pedras Preciosas",
        "Mega Mercado",
        "Prédio De Alto Padrão",
        "Usina Siderúrgica",
        "Montadora De Veículos Elétricos",
        "Fábrica De Automóveis",
        "Refinaria De Biocombustíveis",
        "Refinaria",
        "Fábrica De Navios",
        "Usina Hidrelétrica",
        "Construtora De Infraestruturas",
        "Aeroporto",
        "Mineradora De Minérios Radioativos",
        "Plataforma De Petróleo",
        "Fábrica De Chips",
        "Fábrica De Semicondutores",
        "Fábrica De Robôs",
        "Fábrica De Motores",
        "Fábrica De Aeronaves",
        "Reator Nuclear Convencional",
        "Usina De Fusão Nuclear",
        "Shopping Center",
        "Porto",
        "Fábrica De Foguetes"
    ];
    
    const arrayTerraplanagem = [
        "Plantação De Grãos",
        "Plantação De Vegetais",
        "Pomar",
        "Plantação De Eucalipto",
        "Plantação De Plantas Medicinais",
        "Área Florestal",
        "Terreno De Mineração"
    ];

// const baseComercio = dados.imobiliario

// const terraplanagem = baseComercio.edificios[1].powerUp

// const terraplanagemNv2 = terraplanagem.nível2.quantidadeMínima

// const terraplanagemNv3 = terraplanagem.nível3.quantidadeMínima



useEffect(() => {
    // console.log("▶️ useEffect Terraplanagem");
  
    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
    const baseComercio = dados.imobiliario;
    const terraplanagem = baseComercio.edificios.find(
      ed => ed.nome === "Terraplanagem E Pavimentação"
    );
  
    if (!terraplanagem) {
    //   console.warn("❌ Terraplanagem não encontrada em dados.imobiliario.edificios");
      return;
    }
  
    const q = terraplanagem.quantidade ?? 0;
    const nv2 = terraplanagem.powerUp?.nível2?.quantidadeMínima ?? Infinity;
    const nv3 = terraplanagem.powerUp?.nível3?.quantidadeMínima ?? Infinity;
  
    // ✅ aplica só quando q >= 1
    let reducao = 0;
    if (q >= nv3) reducao = 0.15;
    else if (q >= nv2) reducao = 0.10;
    else if (q >= 1) reducao = 0.05;
    else reducao = 0;
  
    // console.log(`🏗️ Terraplanagem: q=${q} | nv2=${nv2} | nv3=${nv3} | redução=${reducao * 100}%`);
  
    // const arrayTerraplanagem = [
    //   "Plantação De Grãos",
    //   "Plantação De Vegetais",
    //   "Pomar",
    //   "Plantação De Eucalipto",
    //   "Plantação De Plantas Medicinais",
    //   "Área Florestal",
    //   "Terreno De Mineração",
    // ];
  
    arrayTerraplanagem.forEach((nomeEd) => {
      for (const setor of setoresArr) {
        const i = dados[setor]?.edificios?.findIndex((ed) => ed.nome === nomeEd);
        if (i != null && i !== -1) {
          const edif = dados[setor].edificios[i];
  
          // salva original uma única vez
          const original =
            edif.custoConstrucaoOriginal != null
              ? edif.custoConstrucaoOriginal
              : edif.custoConstrucao;
  
          if (edif.custoConstrucaoOriginal == null) {
            dados[setor].edificios[i].custoConstrucaoOriginal = original;
            // console.log(`💾 Salvei custo original de ${nomeEd} (${setor}):`, original);
          }
  
          // aplica (ou remove) desconto sempre a partir do original
          const novo = Math.floor(original * (1 - reducao));
          dados[setor].edificios[i].custoConstrucao = novo;
  
        //   console.log(`🏢 ${nomeEd} | setor=${setor} | original=${original} -> novo=${novo}`);
        }
      }
    });
  }, [dados.imobiliario.edificios]);
  




  useEffect(() => {
    // console.log("▶️ useEffect Construtora De Pequenas Obras");
  
    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
    const baseImobiliario = dados.imobiliario;
    const construtoraPeq = baseImobiliario.edificios.find(
      ed => ed.nome === "Construtora De Pequenas Obras"
    );
  
    if (!construtoraPeq) {
    //   console.warn("❌ Construtora De Pequenas Obras não encontrada em dados.imobiliario.edificios");
      return;
    }
  
    const q = construtoraPeq.quantidade ?? 0;
    const nv2 = construtoraPeq.powerUp?.nível2?.quantidadeMínima ?? Infinity;
    const nv3 = construtoraPeq.powerUp?.nível3?.quantidadeMínima ?? Infinity;
  
    let reducao = 0;
    if (q >= nv3) reducao = 0.15;
    else if (q >= nv2) reducao = 0.10;
    else if (q >= 1) reducao = 0.05;
    else reducao = 0;
  
    // console.log(`🏗️ Construtora Peq: q=${q} | nv2=${nv2} | nv3=${nv3} | redução=${reducao * 100}%`);
  

  
    arrayConstrutoraPeq.forEach((nomeEd) => {
      for (const setor of setoresArr) {
        const i = dados[setor]?.edificios?.findIndex((ed) => ed.nome === nomeEd);
        if (i != null && i !== -1) {
          const edif = dados[setor].edificios[i];
  
          // salva custo original uma vez
          const original =
            edif.custoConstrucaoOriginal != null
              ? edif.custoConstrucaoOriginal
              : edif.custoConstrucao;
  
          if (edif.custoConstrucaoOriginal == null) {
            dados[setor].edificios[i].custoConstrucaoOriginal = original;
            // console.log(`💾 Salvei custo original de ${nomeEd} (${setor}):`, original);
          }
  
          // aplica desconto sempre a partir do original
          const novo = Math.floor(original * (1 - reducao));
          dados[setor].edificios[i].custoConstrucao = novo;
  
        //   console.log(`🏢 ${nomeEd} | setor=${setor} | original=${original} -> novo=${novo}`);
        }
      }
    });
  }, [dados.imobiliario.edificios]);
  






  useEffect(() => {
    // console.log("▶️ useEffect Construtora");
  
    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
    const baseImobiliario = dados.imobiliario;
    const construtora = baseImobiliario.edificios.find(
      ed => ed.nome === "Construtora"
    );
  
    if (!construtora) {
      // console.warn("❌ Construtora não encontrada em dados.imobiliario.edificios");
      return;
    }
  
    const q = construtora.quantidade ?? 0;
    const nv2 = construtora.powerUp?.nível2?.quantidadeMínima ?? Infinity;
    const nv3 = construtora.powerUp?.nível3?.quantidadeMínima ?? Infinity;
  
    let reducao = 0;
    if (q >= nv3) reducao = 0.15;
    else if (q >= nv2) reducao = 0.10;
    else if (q >= 1) reducao = 0.05;
    else reducao = 0;
  
    // console.log(`🏗️ Construtora: q=${q} | nv2=${nv2} | nv3=${nv3} | redução=${reducao * 100}%`);
    
    arrayConstrutora.forEach((nomeEd) => {
      for (const setor of setoresArr) {
        const i = dados[setor]?.edificios?.findIndex((ed) => ed.nome === nomeEd);
        if (i != null && i !== -1) {
          const edif = dados[setor].edificios[i];
  
          // salva custo original uma vez
          const original =
            edif.custoConstrucaoOriginal != null
              ? edif.custoConstrucaoOriginal
              : edif.custoConstrucao;
  
          if (edif.custoConstrucaoOriginal == null) {
            dados[setor].edificios[i].custoConstrucaoOriginal = original;
            // console.log(`💾 Salvei custo original de ${nomeEd} (${setor}):`, original);
          }
  
          // aplica desconto sempre a partir do original
          const novo = Math.floor(original * (1 - reducao));
          dados[setor].edificios[i].custoConstrucao = novo;
  
          // console.log(`🏢 ${nomeEd} | setor=${setor} | original=${original} -> novo=${novo}`);
        }
      }
    });
  }, [dados.imobiliario.edificios]);
  


  useEffect(() => {
    // console.log("▶️ useEffect Construtora De Infraestruturas");
  
    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
    const baseImobiliario = dados.imobiliario;
    const constrInfra = baseImobiliario.edificios.find(
      ed => ed.nome === "Construtora De Infraestruturas"
    );
  
    if (!constrInfra) {
      // console.warn("❌ Construtora De Infraestruturas não encontrada em dados.imobiliario.edificios");
      return;
    }
  
    const q = constrInfra.quantidade ?? 0;
    const nv2 = constrInfra.powerUp?.nível2?.quantidadeMínima ?? Infinity;
    const nv3 = constrInfra.powerUp?.nível3?.quantidadeMínima ?? Infinity;
  
    let reducao = 0;
    if (q >= nv3) reducao = 0.15;
    else if (q >= nv2) reducao = 0.10;
    else if (q >= 1) reducao = 0.05;
    else reducao = 0;
  
    // console.log(`🏗️ Construtora De Infraestruturas: q=${q} | nv2=${nv2} | nv3=${nv3} | redução=${reducao * 100}%`);
  
  
    arrayConstrutoraInfraestrutura.forEach((nomeEd) => {
      for (const setor of setoresArr) {
        const i = dados[setor]?.edificios?.findIndex((ed) => ed.nome === nomeEd);
        if (i != null && i !== -1) {
          const edif = dados[setor].edificios[i];
  
          // salva custo original uma vez
          const original =
            edif.custoConstrucaoOriginal != null
              ? edif.custoConstrucaoOriginal
              : edif.custoConstrucao;
  
          if (edif.custoConstrucaoOriginal == null) {
            dados[setor].edificios[i].custoConstrucaoOriginal = original;
            // console.log(`💾 Salvei custo original de ${nomeEd} (${setor}):`, original);
          }
  
          // aplica desconto sempre a partir do original
          const novo = Math.floor(original * (1 - reducao));
          dados[setor].edificios[i].custoConstrucao = novo;
  
          // console.log(`🏢 ${nomeEd} | setor=${setor} | original=${original} -> novo=${novo}`);
        }
      }
    });
  }, [dados.imobiliario.edificios]);
  
  useEffect(() => {
    // console.log("▶️ useEffect Cartório E Licenças - início");
  
    const setoresArr = ["agricultura", "tecnologia", "comercio", "industria", "imobiliario", "energia"];
  
    // Cartório E Licenças do setor imobiliário
    const cartorio = dados.imobiliario.edificios.find(ed => ed.nome === "Cartório E Licenças");
    if (!cartorio) {
      // console.log("⚠️ Cartório E Licenças não encontrado no setor imobiliário.");
      return;
    }
  
    const quantidade = cartorio.quantidade ?? 0;
    const nv2 = cartorio.powerUp?.nível2?.quantidadeMínima ?? Infinity;
    const nv3 = cartorio.powerUp?.nível3?.quantidadeMínima ?? Infinity;
  
    // Define o percentual de redução
    let reducao = 0;
    if (quantidade >= nv3) reducao = 0.15;
    else if (quantidade >= nv2) reducao = 0.10;
    else if (quantidade >= 1) reducao = 0.05;
    else reducao = 0;
  
    // console.log(`🏛️ Cartório E Licenças: quantidade=${quantidade}, nv2=${nv2}, nv3=${nv3}, redução=${reducao * 100}%`);
  
    // Aplica redução em todas as licenças de todos os setores
    setoresArr.forEach(setor => {
      const licencasSetor = dados[setor]?.licençasSetor;
      if (!Array.isArray(licencasSetor)) {
        // console.log(`⚠️ Licenças do setor '${setor}' não são um array.`);
        return;
      }
  
      licencasSetor.forEach((licenca, index) => {
        if (licenca.valor != null) {
          const valorOriginal = licenca.valorOriginal ?? licenca.valor;
  
          // Salva valor original se ainda não estiver salvo
          if (licenca.valorOriginal == null) {
            dados[setor].licençasSetor[index].valorOriginal = valorOriginal;
            // console.log(`💾 Valor original salvo da licença '${licenca.nome}' no setor ${setor}: ${valorOriginal}`);
          }
  
          const novoValor = Math.floor(valorOriginal * (1 - reducao));
          dados[setor].licençasSetor[index].valor = novoValor;
  
          // console.log(`💰 Licença '${licenca.nome}' | setor=${setor} | original=${valorOriginal} -> novo=${novoValor}`);
        }
      });
    });
  
    // console.log("✅ useEffect Cartório E Licenças - fim");
  }, [dados.imobiliario.edificios]); 
  
  
  
}




