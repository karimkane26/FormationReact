# Notes — React Context API

Notes basées sur le code présent dans ce projet (`src/context/ThemeContexte.js` et les composants qui l'utilisent).

## 1. Les 3 étapes de la Context API

### a) Créer le contexte
```js
// src/context/ThemeContexte.js
import { createContext } from "react";

const ThemeContexte = createContext();
export default ThemeContexte;
```
`createContext()` crée un objet contexte. On peut lui passer une valeur par défaut entre les parenthèses (utilisée seulement si aucun `Provider` n'englobe le composant).

### b) Fournir la valeur avec un `Provider`
```js
export const ThemeContexteProvider = ({ children }) => {
  return (
    <ThemeContexte.Provider value={"white"}>
      {children}
    </ThemeContexte.Provider>
  );
};
```
Tout composant enfant placé à l'intérieur de `<ThemeContexteProvider>` pourra lire `value` ("white" ici), sans avoir besoin de props.

### c) Consommer la valeur avec `useContext`
```js
import { useContext } from "react";
import ThemeContexte from "../context/ThemeContexte";

const data = useContext(ThemeContexte); // "white"
```

## 2. Arborescence actuelle du projet

```
App.jsx
 └─ ThemeContexteProvider (value = "white")
     └─ ChangerThemeBtn.jsx   → useContext(ThemeContexte) ✅ affiche "white"
```

`ChangerButton.jsx` et `Test.jsx` utilisent aussi `useContext(ThemeContexte)`,
mais **`ChangerButton` n'est pas monté** dans `App.jsx` (seul `ChangerThemeBtn` l'est).
Donc leurs `console.log` ne s'affichent pas actuellement.

## 3. Points à vérifier / pièges observés

- **Import inutile dans le contexte** : [ThemeContexte.js](src/context/ThemeContexte.js) importe `ChangerButton`
  (`import ChangerButton from "../components/ChangerButton";`) mais ne l'utilise jamais.
  À supprimer : un fichier de contexte ne devrait pas dépendre d'un composant UI (risque de dépendance
  circulaire, ex: `ChangerButton.jsx` importe lui-même `ThemeContexte`).
- **Valeur statique** : le `Provider` fournit toujours `"white"` en dur. Pour un vrai changement de thème,
  il faut un `useState` dans `ThemeContexteProvider` + une fonction `toggleTheme` incluse dans `value`
  (ex: `value={{ theme, toggleTheme }}`), puis appeler cette fonction depuis le bouton "Changer Theme".
- **Bouton non fonctionnel** : le `<button>Changer Theme</button>` dans `ChangerThemeBtn.jsx` n'a pas de
  `onClick` — il ne fait rien pour l'instant.

## 4. Exemple pour rendre le thème dynamique

```js
// context/ThemeContexte.js
import { createContext, useState } from "react";

const ThemeContexte = createContext();

export const ThemeContexteProvider = ({ children }) => {
  const [theme, setTheme] = useState("white");
  const toggleTheme = () => setTheme(t => (t === "white" ? "black" : "white"));

  return (
    <ThemeContexte.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContexte.Provider>
  );
};

export default ThemeContexte;
```

```js
// components/ChangerThemeBtn.jsx
const { theme, toggleTheme } = useContext(ThemeContexte);

<h1>Theme: {theme}</h1>
<button onClick={toggleTheme}>Changer Theme</button>
```

## 5. À retenir

- `createContext` + `Provider` + `useContext` = les 3 briques de base.
- Le `Provider` doit englober tous les composants qui ont besoin de la valeur.
- Un composant qui utilise `useContext` mais n'est pas rendu à l'intérieur du `Provider` reçoit la
  valeur par défaut de `createContext()` (ici `undefined`, car aucune n'a été précisée).
- Éviter les imports de composants UI dans les fichiers de contexte.
