import React, {useState, useCallback} from "react";
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash} from 'react-icons/fa';
import {Container, Form, SubmitButton, List, DeleteButton} from './styles'
import api from "../../services/api";



export default function Main(){
    const [newRepo, setnewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);

   const handleSubtmit = useCallback((e)=>{
    e.preventDefault(); // para não atualizar a página
     async function submit() {
         setLoading(true);
        try{
            const response = await api.get(`/repos/${newRepo}`)

        const data = {
            name: response.data.full_name,
        }

        setRepositorios([...repositorios, data]);
        setnewRepo('');
            
        }catch(error){
            console.log(error);
        } finally{
           setLoading(false); 
        }
        
     }
      submit();
   },[newRepo, repositorios]);
       
    
    function handleinputChange(e){
        setnewRepo(e.target.value);
    }

    const handleDelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !== repo)
        setRepositorios(find);
    }, [repositorios]);

    return(
        <Container>
            <h1>
                <FaGithub size={25}></FaGithub>
                Meu repositorios
            </h1>

        <Form onSubmit={handleSubtmit}> 
            <input type="text" 
            placeholder="Adicionar Repositorios"
            value={newRepo}
            onChange={handleinputChange}
            ></input>

            <SubmitButton Loading={loading ? 1: 0}>
                {loading ? (
                    <FaSpinner color="#fff" size={14}/>
                ): (
                    <FaPlus color="#fff" size={14}></FaPlus>
                )}
               
            </SubmitButton>
        </Form>

        <List>
           {repositorios.map(repo =>(
             <li key={repo.name}>
                <span>
                    <DeleteButton onClick={()=> handleDelete(repo.name) }>
                        <FaTrash size={14}></FaTrash>
                    </DeleteButton>
                {repo.name}
                </span>
                <a href="">
                    <FaBars size={20}></FaBars>
                </a>
             </li>
           ))} 
        </List>

        </Container>
    )
}