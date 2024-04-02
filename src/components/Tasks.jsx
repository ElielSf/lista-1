import { useEffect, useState } from 'react'
import { subDays, format } from 'date-fns';
import '../css/Tasks.css'

export default function Tasks() {
    const [nomeTarefa, setNomeTarefa] = useState('');
    const [estadoTarefa, setEstadoTarefa] = useState(false);
    const [totalTarefas, setTotalTarefas] = useState(0);
    const [listaTarefas, setListaTarefas] = useState([]);
    const [ativarLista, setAtivarLista] = useState(false);

    const dataHoje = new Date().toLocaleDateString();
    const dataOntem = subDays(new Date(), 1);   
    const dataOntemFormatada = format(dataOntem, 'dd/MM/yyyy'); 
    const tempoExpirar = 24 * 60 * 60; //tempo em segundos total de 1 dia -- mude o tempo aqui para testar

    useEffect(() => {
        const timer = setInterval(() => {
            setListaTarefas(listaTarefas => listaTarefas.map(tarefa => {
                if ((tarefa.time > 0) && (tarefa.state !== true)) {
                    return { ...tarefa, time: tarefa.time - 1 };
                } else {
                    return tarefa;
                }
            }));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const criarTarefa = () => {
        if (nomeTarefa !== '') {
            setAtivarLista(true);
            setListaTarefas([ ...listaTarefas,{ name: nomeTarefa, state: estadoTarefa, date: dataHoje, time: tempoExpirar }]);
            setNomeTarefa('');
        }
    }

    const concluirTarefa = (index) => {
        setListaTarefas(listaTarefas.map((tarefa, i) => {
            if(index === i) {
                return { ...tarefa, state:true };
            }
            return tarefa;
        }));
    }

    return (
        <div className='Tasks'>
            <div className='Tasks__create'>
                <h2 className='Tasks__title'>Nome da tarefa</h2>
                <input className='Tasks__input' value={nomeTarefa} onChange={(e) => setNomeTarefa(e.target.value)} type='text' placeholder='Ex: Estudar' required/>    
                <button className='Tasks__submit' onClick={criarTarefa}>Criar Tarefa</button>            
            </div>
            <div className='Tasks__total'>
                <h2 className='Tasks__title'>Total de Tarefas: {totalTarefas}</h2>
            </div>
            {ativarLista ? (
                <div className='Tasks__list'>
                    {listaTarefas.map((tarefa, index) => {
                        return (
                            tarefa.time > 0 ? (
                                <div className={tarefa.state ? 'Tasks--listItem--finished' : 'Tasks--listItem--unfinished'} key={index}>
                                    <h3 className={tarefa.state ? 'Tasks--listItem--titleFinished' : 'Tasks--listItem--titleUnfinished'}>{tarefa.name}</h3>
                                    <p className={tarefa.state ? 'Tasks--listItem--textFinished' : 'Tasks--listItem--titleUnfinished'}>{tarefa.date}</p>
                                    <p className={tarefa.state ? 'Tasks--listItem--textFinished' : 'Tasks--listItem--titleUnfinished'}>{tarefa.state ? 'CONCLUÍDA' : 'NÃO-CONCLUÍDA'}</p>
                                    {tarefa.state ? '' : (<button className='Tasks--listItem--button' onClick={() => concluirTarefa(index)}>Concluir</button>)}
                                </div>
                            ) : (
                                <div className='Tasks--listItem--expired' key={index}>
                                    <h2 className='Tasks--listItem--textExpired'>Tarefa expirada</h2>
                                </div>
                            )
                        )
                    })}
                </div>
            ) : (
                <div className='Tasks__exception'>
                    <h1 className='Tasks__list__exception'>Nenhuma tarefa ainda...</h1>
                </div>
            )}
        </div>
    )
}