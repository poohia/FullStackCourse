import React, { useEffect, useState } from "react";
import FormComponent from "./components/FormComponent";
import TableComponent from "./components/TableComponent";
// L'import d'un fichier css ce fait comme ça, il suffit de faire npm install sass
import "./index.scss";

// Je créé un type personnalisé Todo qui à un id obligatoire de type number une value obligatoire de type string
// J'exporte le type afin qu'il puisse être importé dans d'autres fichiés
export type Todo = {
  id: number;
  value: string;
};

const App: React.FC = () => {
  // Je créé un state qui est un tableau de Todo
  // useState: https://fr.reactjs.org/docs/hooks-state.html
  const [todos, setTodos] = useState<Todo[]>([]);

  const saveNewTodo = (todo: string) => {
    // si c'est le premier élément je l'ajoute en dur avec id à 0
    if (todos.length === 0) {
      // J'enregistre le nouveau tableau grâce à son setter
      setTodos([{ value: todo, id: 0 }]);
      // je sauvegarde le nouveau talbeau dans le localstorage
      // LocalStorage: https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
      localStorage.setItem("todos", JSON.stringify([{ value: todo, id: 0 }]));
    } else {
      // Je créé un nouveau tableau à partir de todos afin de forcer React à raffraichir la vue
      // Fonction concat: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
      // J'ajoute au tableau todos un nouveau Todo avec un id + 1 du dernier
      const newTodos = Array.from(todos).concat([
        { value: todo, id: todos[todos.length - 1].id + 1 },
      ]);
      // J'enregistre le nouveau tableau grâce à son setter
      setTodos(newTodos);
      // je sauvegarde le nouveau talbeau dans le localstorage
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  };

  const editTodo = (id: number, value: string) => {
    // Je créé un nouveau tableau à partir de todos afin de forcer React à raffraichir la vue
    const newTodos = Array.from(todos);
    // Je cherche la colonne avec l'id qui doit être modifié
    // Fonction find https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const todoEditFind = newTodos.find((t) => t.id === id);
    // La fonction find renvoi null si rien n'est trouvé, dans le contraire ( ce qui sera normalement tout le temps notre cas) j'ajoute la nouvelle value
    if (todoEditFind) {
      todoEditFind.value = value;
    }
    // J'enregistre le nouveau tableau grâce à son setter
    setTodos(newTodos);
    // je sauvegarde le nouveau talbeau dans le localstorage
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const deleteTodo = (id: number) => {
    // Fonction confirm https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
    // La fonction renvoi fausse si l'utilise clique sur Annuler
    if (
      window.confirm(`Attention vous allez supprimé la colonne avec l'id ${id}`)
    ) {
      // Je créé un nouveau tableau à partir de todos afin de forcer React à raffraichir la vue
      // Je filtre le tableau sir l'id n'est pas égale à l'id qui doit être supprimé afin de le supprimer du tableau
      // Fonction filter https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
      const newTodos = Array.from(todos).filter((t) => t.id !== id);
      // J'enregistre le nouveau tableau grâce à son setter
      setTodos(newTodos);
      // je sauvegarde le nouveau talbeau dans le localstorage
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  };

  // Au chargement du composant je vais chercher dans le local storage si des todos ont été enregistré
  // useEffect: https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    const storageTodos = localStorage.getItem("todos");
    if (storageTodos) {
      setTodos(JSON.parse(storageTodos));
    }
  }, []);

  // À chaque changement de todos je fais un console.log()
  useEffect(() => {
    console.log(`Variable todos as been changed to '${JSON.stringify(todos)}'`);
  }, [todos]);

  return (
    // Le JSX doit forcement avoir un parent, dans notre cas le parent est main
    // JSX: https://reactjs.org/docs/introducing-jsx.html
    <main className="app--content">
      <section className="app--content-title">
        <h1>My Todo Liste</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </section>
      <section className="app--content-form">
        {/* J'utilise le composant que j'ai créé FormComponent et insère le props onSubmit avec ma fonction saveNewTodo */}
        <FormComponent onSubmit={(value) => saveNewTodo(value)} />
      </section>
      <section className="app--content-table">
        {/* J'utilise le composant que j'ai créé TableComponent et insère les props todos, onEdit, onDelete */}
        <TableComponent
          todos={todos}
          onEdit={(id, value) => editTodo(id, value)}
          onDelete={(id) => deleteTodo(id)}
        />
      </section>
    </main>
  );
};

export default App;
