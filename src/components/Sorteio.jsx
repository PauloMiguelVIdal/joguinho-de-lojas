import React, { useContext, useEffect } from "react";
import { CentraldeDadosContext } from "../centralDeDadosContext";

export default function Sorteio(){
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);

    // useEffect(() => {
    //     if (dados.iniciarSorteio) {
    //         const evento = centralResultado(); // Chama centralResultado sem passar dados como argumento
    //         atualizarDados('eventoAtual', evento)
    //         console.log(evento);
    //         atualizarDados('iniciarSorteio', false); // Resetar iniciarSorteio após o sorteio
    //         console.log("Estado do modal após atualização:", dados.modal.estadoModal);
    //         atualizarDados('modal', { ...dados.modal, estadoModal: true }); 
    //         console.log(dados.modal.estadoModal);
    //     }
    // }, [dados.iniciarSorteio, atualizarDados]);

    
    
    // chance de evento em 50%
    const chanceNovoEvento = 30;
    
    // Função sorteio
    const sortearNovoEvento = () => {
        const probabilidade = Math.random() * 100;
        if (probabilidade <= chanceNovoEvento) {
            console.log("sorteio ocorreu");
            // atualizarDados('iniciarSorteio', true); // não quero que seja um estado penso em fazer apenas uma função que irá realizar isso
            // sortearEvento();
        }
    };
    
    useEffect(() => {
        sortearNovoEvento()
    console.log("passou aqui")
    }, [dados.dia]);



    return (
        <div>
            <button onClick={() => {
                atualizarDados('iniciarSorteio', true);
                console.log(dados.modal.estadoModal);
            }} className="bg-white">Sortear</button>
            <button onClick={sortearNovoEvento}>Sortear Novo Evento</button>
        </div>
    );
};



