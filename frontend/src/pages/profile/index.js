import React, { useState, useEffect } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api'


export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    //setando o ongId do useEffect para trazer todos os casos da ong logada
    const ongId = localStorage.getItem('ongId');
    //pegando o valor do nome da ong no localStorage para passar no cabeçalho
    const ongName = localStorage.getItem('ongName');
    //toda vez que o valor da função useEffect mudar, ela será executada novamente
    //listando todos os casos
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId])

    //deletando um caso
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            //está percorrendo os incidents e recarregando todos os que são diferentes do id deletado
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    //logout da aplicação limpando o localStorage e redirecionando para tela de login
    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem-vindo(a), {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}