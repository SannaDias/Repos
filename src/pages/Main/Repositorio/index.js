import React , {useState, useEffect}from "react";
import { useParams } from "react-router-dom";
import { Container, Owner, Loading, BlackButton } from "./styles";
import {FaArrowLeft} from 'react-icons/fa'
import api from "../../../services/api";

export default function Repositorio() {

  const { repositorio } = useParams(); // pega o parâmetro da URL
  const nomeRepo = decodeURIComponent(repositorio); // decodifica a URL
 
  const [repositorios, setRepositorios]= useState({});
  const [issues, setIssues]= useState([]);
  const [loading, setLoading]= useState([true]);

  useEffect(() => {
    async function load() {
      try {
        const [repositorioData, issuesData] = await Promise.all([
          api.get(`/repos/${nomeRepo}`),
          api.get(`/repos/${nomeRepo}/issues`,{
            params:{
                state: 'open',
                per_page: 5
            }
          })
        ]);
 
        setRepositorios(repositorioData.data);
        setIssues(issuesData.data);
        setLoading(false)

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
 
    load();
  }, [nomeRepo]);
  
  if(loading){
    return (
      <Loading>
        <h1>
          CARREGANDO
        </h1>
    </Loading>
    )
  }

  return (
    <Container>
      <BlackButton to="/">
        <FaArrowLeft color="#000"/>
      </BlackButton>
      <Owner>
        <img src={repositorios.owner?.avatar_url} 
        alt={repositorios.owner?.login}></img>
        <h1>{repositorios.name}</h1>
        <p>{repositorios.description}</p>
      </Owner>
    </Container>
  );
}