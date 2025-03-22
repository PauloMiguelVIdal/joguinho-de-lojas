import React, { useContext, useState } from 'react';
import { CentraldeDadosContext } from '../centralDeDadosContext';
import correto from '../imagens/simbolo-correto (1).png'


const InputName = () => {
    const { dados, atualizarDados } = useContext(CentraldeDadosContext);


    const [novoNome, setNovoNome] = useState('');


    function handleChangeNome(event) {
        setNovoNome(event.target.value.toUpperCase());
    }




    function atualizarContexto() {
        if (novoNome) {

            atualizarDados("inicioGame", { ...dados.inicioGame, nomeEmpresa: novoNome, estadoModal: false })
        }
        else {
            alert("Campo não preenchido")
        }
    }



    if (dados.inicioGame.estadoModal === true) {
        return (
            <div className='flex justify-center items-center w-[100vw] h-[100vh] z-20 bg-black opacity-[95%] absolute' >
                <div className='w-[60vw] h-[60vh] bg-roxo rounded-[10px] flex justify-center items-center p-10 flex-col' >
                    <h1 className='fonteBold text-white mb-[10px] text-[25px]'>ESCOLHA O NOME DE SUAS LOJAS</h1>
                    <h2 className='fonteBold text-white mb-[60px] text-[20px] opacity-70'>O nome da sua empresa é a primeira impressão que seus clientes terão. Escolha com cuidado e criatividade!</h2>
                    <div className='flex justify-center w-full items-center'>
                        <input
                            type="text"
                            placeholder="Nome empresa"
                            onChange={handleChangeNome}
                            value={novoNome}
                            className="placeholder:text-white text-white placeholder:opacity-70 z-50 text-[25px] fonteBold w-[100%] pl-[10px] h-[60px] bg-[#290064] bg-opacity-[90%] rounded-[17.50px]"
                        />
                            
                        <button
                            onClick={atualizarContexto}
                            className="flex justify-center items-center h-[60px] w-[60px] ml-[10px] aspect-square text-[20px] fonteBold bg-laranja rounded-[20px] text-white  z-50"
                        >
                            <img className='h-[60%]' src={correto} alt="correto" />                        </button>
                    </div>

                </div>
            </div>
        );
    }
    else {
        return null
    }
}

export default InputName;

