import { useState, useEffect } from 'react';

import "./App.css";

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Modal from './components/Modal.jsx';
import PessoaForm from './components/PessoaForm.jsx';
import PessoaList from './components/PessoaList.jsx';


function App() {
   const [pessoasList, setPessoasList] = useState([]);
   const [pessoaToUpdate, setPessoaToUpdate] = useState(null);
   const [estados, setEstados] = useState([]);

   useEffect(_ => {
      if (pessoasList.length == 0) {
         fetch('http://localhost:3000/pessoas')
            .then(response => response.json())
            .then(data => {
               if (data) {
                  setPessoasList(data);
               } 
            })
            .catch(error => console.log(error));
      }

      if (estados.length == 0) {
         fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => response.json())
            .then(data => {
               if (data) {
                  setEstados(data);
               } 
            })
            .catch(error => console.log(error));
      }
   }, []);    

   const deletePessoa = (id) => {
      if (confirm("Tem certeza que deseja deletar essa pessoa?")) {
         fetch(`http://localhost:3000/pessoa/${id}`, { method: 'DELETE' })
            .then(response => {
               if (response.status == 200) alert("Pessoa deletada com sucesso!");

               setPessoasList(
                  pessoasList.filter((pessoa) => {
                     return pessoa.id !== id;
                  })
               );

               return;
            })
            .catch(error => console.log(error));            
      }
   };

   const hideOrShowModal = (display) => {
      const modal = document.querySelector("#modal");
      if (display) {
         modal.classList.remove("hide");
      } else {
         modal.classList.add("hide");
      }
   };

   const editPessoa = (pessoa) => {
      setPessoaToUpdate(pessoa);
      hideOrShowModal(true);
   };

   const updatePessoa = (id, nome, idade, uf) => {
      if (confirm("Tem certeza que deseja alterar os dados dessa pessoa?")) {
         fetch(`http://localhost:3000/pessoa/${id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, idade, uf })
         })
            .then(response => {
               if (response.status == 200) {
                  setPessoasList([
                     ...pessoasList.filter((pessoa) => { return pessoa.id !== id;}),
                     { id, nome, idade, uf } ]);

                  alert("Pessoa alterada com sucesso!");
                  
                  return;
               }
            })
            .catch(error => console.log(error));            
      }

      hideOrShowModal(false);
   };

  return (
    <>
      <Modal
            children={
               <PessoaForm
                  btnText="Salvar edição"
                  pessoaList={pessoasList}
                  pessoa={pessoaToUpdate}
                  handleUpdate={updatePessoa}
                  estados={estados}
               />
            }
         />
         <Header />
         <main className="main">
            <div>
               <h2>Cadastre a Pessoa</h2>
               <PessoaForm
                  btnText="Cadastrar Pessoa"
                  pessoaList={pessoasList}
                  setPessoaList={setPessoasList}
                  estados={estados}
               />
            </div>
            <div>
               <h2>Pessoas cadastradas:</h2>
               <PessoaList
                  pessoaList={pessoasList}
                  handleDelete={deletePessoa}
                  handleEdit={editPessoa}
               />
            </div>
         </main>
         <Footer />
    </>
  )
}

export default App;
