import { useState } from "react";
import "./PessoasList.css";

const PessoaList = ({ pessoaList, handleDelete, handleEdit }) => {
   return (
      <>
         {pessoaList.length > 0 ? (
            pessoaList.map((pessoa) => (
               <div key={pessoa.id} className="pessoa">
                  <div className="details">
                     <h4>{pessoa.nome}</h4>
                     <p>Idade: {pessoa.idade}</p>
                     <p>UF: {pessoa.uf}</p>
                  </div>
                  <div className="actions">
                     <i
                        className="bi bi-pencil"
                        onClick={() => handleEdit(pessoa)}
                     ></i>
                     <i
                        className="bi bi-trash"
                        onClick={() => handleDelete(pessoa.id)}
                     ></i>
                  </div>
               </div>
            ))
         ) : (
            <p>Não há pessoas cadastradas</p>
         )}
      </>
   );
};

export default PessoaList;
