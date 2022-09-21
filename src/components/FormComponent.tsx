import React, { useEffect, useState } from "react";

// C'est la façon d'écrire pour déclarer des props à un composant
type FormComponentProps = {
  onSubmit: (value: string) => void;
};

const FormComponent: React.FC<FormComponentProps> = (props) => {
  // Je récupère mes props de l'objet props
  // C'est équivalent à `const onSubmit = props.onSubmit` mais en une ligne
  const { onSubmit } = props;
  // Je créé un state pour la valeur de l'input à vide
  const [todo, setTodo] = useState<string>("");

  // C'est une fonction classique pour récupérer le change d'un input
  // La valeur se retrouve grâce à `e.target.value`
  // editTodo pour être null il faut donc vérifier à chaque fois
  // React Form: https://www.w3schools.com/react/react_forms.asp
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  // Classique fonction pour handle le submit
  // Afin d'éviter le rafraichissement de la page faire excuter la fonction e.preventDefault();
  // preventDefault: https://developer.mozilla.org/fr/docs/Web/API/Event/preventDefault
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo === "") return;
    onSubmit(todo);
    setTodo("");
  };

  // À chaque changement de todos je fais un console.log()
  useEffect(() => {
    console.log(`Variable todo as been changed to '${todo}'`);
  }, [todo]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="app--content-form-field">
        <input
          type="text"
          placeholder="todo"
          value={todo}
          onChange={(e) => handleChangeInput(e)}
        />
      </div>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default FormComponent;
