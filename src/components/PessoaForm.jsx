import { useState, useEffect } from "react";

import "./PessoaForm.css";

const PessoaForm = ({ btnText, pessoaList, setPessoaList, pessoa, handleUpdate, estados }) => {
   const [nome, setNome] = useState("");
   const [idade, setIdade] = useState("");
   const [uf, setUf] = useState("PE");

   const nomeHtml = document.getElementsByName("nome");
   const idadeHtml = document.getElementsByName("idade");
   const ufHtml = document.getElementsByName("uf");

   useEffect(() => {
      if (pessoa) {
         setNome(pessoa.nome);
         setIdade(pessoa.idade);
         setUf(pessoa.uf);
      }
   }, [pessoa]);

   const addPessoaHandler = (e) => {
      e.preventDefault();

      if (handleUpdate) {
         if (nome === "" || !nome) {
            if (idade <= 0) {
               alert(
                  "Não é possível cadastrar sem o nome da pessoa!\nNão é possível cadastrar sem informar a idade!"
               );
            } else {
               alert("Não é possível cadastrar sem o nome da pessoa!");
            }
            if (nomeHtml[0]) nomeHtml[0].focus();
         } else if (idade <= 0) {
            alert("Não é possível cadastrar sem informar a idade!");
            if (idadeHtml[0]) idadeHtml[0].focus();
         } else {
            handleUpdate(pessoa.id, nome, idade, uf);
            if (nomeHtml[1]) nomeHtml[1].focus();
         }
      } else {
         if (nome === "" || !nome) {
            if (idade <= 0) {
               alert(
                  "Não é possível cadastrar sem o nome da pessoa!\nNão é possível cadastrar sem informar a idade!"
               );
            } else {
               alert("Não é possível cadastrar sem o nome da pessoa!");
            }
            if (nomeHtml[1]) nomeHtml[1].focus();
         } else if (idade <= 0) {
            alert("Não é possível cadastrar sem informar a idade!");
            if (idadeHtml[1]) idadeHtml[1].focus();
         } else {
            fetch('http://localhost:3000/pessoa', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify({ nome, idade, uf })
            })
               .then(response => response.json())
               .then(data => {
                  if (data) setPessoaList([ ...pessoaList, data ]);
               })
               .catch(error => console.log(error));

            setNome("");
            setIdade("");
            setUf("PE");

            if (nomeHtml[1]) nomeHtml[1].focus();
         }
      }
   };

   const handleChange = (e) => {
      if (e.target.name === "nome") {
         setNome(e.target.value);
      } else if (e.target.name === "idade") {
         setIdade(Number(e.target.value));
      } else {
         setUf(e.target.value);
      }
   };

   return (
      <form onSubmit={addPessoaHandler} className="form">
         <div className="input_container">
            <label htmlFor="nome">Nome:</label>
            <input
               type="text"
               name="nome"
               placeholder="nome da pessoa"
               onChange={handleChange}
               value={nome}
               className="form-control"
            />
         </div>
         <div className="input_container">
            <label htmlFor="idade">Idade:</label>
            <input
               type="number"
               name="idade"
               placeholder="idade da pessoa"
               onChange={handleChange}
               value={idade}
               className="form-control"
               step="0.1"
            />
         </div>
         <div className="input_container input_uf">
            <label htmlFor="uf">UF de moradia:</label>
            <select name="uf" id="uf" onChange={handleChange}>
               {estados && estados.length > 0 ? (
                   estados.map((estado) => (
                     estado.sigla == uf ? <option key={estado.sigla} value={estado.sigla} selected>{estado.nome}</option> : <option key={estado.sigla} value={estado.sigla}>{estado.nome}</option>
               ))
            ) : (
               <option key={0} value={'SEM'}>Selecione</option>
            )}
            </select>
         </div>
         <input type="submit" value={btnText} />
      </form>
   );
};

export default PessoaForm;
