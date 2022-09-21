import React, { useState } from "react";
// J'importe le type Todo qui est dans le fichier App.tsx mais puisque ce n'est pas l'import par défault je l'écris de la manière suivante {Todo}
import { Todo } from "../App";

// C'est la façon d'écrire pour déclarer des props à un composant
type TableComponentProps = {
  todos: Todo[];
  onEdit: (id: number, value: string) => void;
  onDelete: (id: number) => void;
};

// Les composent sont simplement une fonction qui renvoie du JSX, pour typé il suffit de mettre : React.FC
// Dans notre cas le composant a des Props de type TableComponentProps, donc le composant est de type React.FC<TableComponentProps>
const TableComponent: React.FC<TableComponentProps> = (props) => {
  // Je récupère mes props de l'objet props
  // C'est équivalent à `const todos = props.todos` mais en une ligne
  const { todos, onEdit, onDelete } = props;

  // Je créé un state pour l'édition qui est par défaut à null
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  // Au clique sur l'édition j'ajoute le todo à éditer au state editTodo
  const handleClickEdit = (todo: Todo) => {
    setEditTodo(todo);
  };

  // Au clique sur le bouton delete soit j'annule l'édition soit j'appel le props onDelete avec l'id du todo à supprimer
  const handleClickDelete = (todo: Todo) => {
    if (editTodo !== null) {
      setEditTodo(null);
    } else {
      onDelete(todo.id);
    }
  };

  // C'est une fonction classique pour récupérer le change d'un input
  // La valeur se retrouve grâce à `e.target.value`
  // editTodo pour être null il faut donc vérifier à chaque fois
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editTodo) {
      setEditTodo({ id: editTodo.id, value: e.target.value });
    }
  };

  // Si l'utilisateur est en édition et qu'il clique sur le bouton submit j'envoie l'id et la nouvelle valeur au props onEdit
  // editTodo pour être null il faut donc vérifier à chaque fois
  // Je vide editTodo pour afficher la valeur final dans le tableau
  const handleSubmitEdition = () => {
    if (editTodo) {
      onEdit(editTodo.id, editTodo.value);
      setEditTodo(null);
    }
  };

  return (
    <div className="app--table-component">
      <div className="app--table-component-row header">
        <div>ID</div>
        <div>Intitulé</div>
        <div>Actions</div>
      </div>
      {/* En JSX on peut transformer une constante de type tableau en composant JSX de la manière suivante */}
      {/* Fonction map: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map */}
      {todos.map((todo) => (
        // Dans un map le parent doit forcement avoir un key unique, dans notre cas sa sera l'id du todo
        <div key={todo.id} className="app--table-component-row">
          {/* Pour afficher une variable dans le JSX il faut ouvrir les accolades {todo.id} */}
          <div>{todo.id}</div>
          {/* Les conditions en JSX: https://www.digitalocean.com/community/tutorials/7-ways-to-implement-conditional-rendering-in-react-applications */}
          {/* En JSX on peut mettre une condition et finir par && avec le contenu du JSX, si la condition est bonne on affiche le contenu */}
          {/* S'il n'y aucune édition ou que le todo à éditer n'est pas le todo de cette ligne */}
          {(editTodo === null || editTodo.id !== todo.id) && (
            <div>{todo.value}</div>
          )}
          {/* Les conditions avec && s'accumule mais s'il y a un || il faut ouvrir les parenthèses comme au dessus */}
          {/* Si l'utilisateur edite cette ligne afficher un input à la place de la valeur directement  */}
          {editTodo && editTodo.id === todo.id && (
            <div>
              <input
                type="text"
                placeholder="todo"
                value={editTodo.value}
                autoFocus
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
          )}
          {/* Si l'utiliseur n'est pas en edition afficher un crayon et au clique passer en édition */}
          <div className="app--table-component-col-action">
            {(editTodo === null || editTodo.id !== todo.id) && (
              <button type="button" onClick={() => handleClickEdit(todo)}>
                &#10002;
              </button>
            )}
            {/* Si l'utilisateur édite cette ligne afficher un check et au clique envoyé la nouvelle valeur au props onEdit */}
            {editTodo && editTodo.id === todo.id && (
              <button type="button" onClick={() => handleSubmitEdition()}>
                &#10004;
              </button>
            )}

            <button type="button" onClick={() => handleClickDelete(todo)}>
              &#10006;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableComponent;
