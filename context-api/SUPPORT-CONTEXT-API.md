# Support de formation — Le Context API en React

## Objectifs pédagogiques

À la fin de ce module, l'apprenant sait :
- expliquer le problème du "prop drilling" ;
- créer un contexte avec `createContext` ;
- fournir des données à un arbre de composants avec un `Provider` ;
- consommer un contexte avec `useContext` ;
- encapsuler la logique d'un contexte dans un hook personnalisé ;
- faire cohabiter plusieurs contextes dans une même application.

---

## 1. Le problème : le "prop drilling"

Sans Context API, pour faire descendre une donnée (ex : le thème, la langue) du composant racine jusqu'à un composant profondément imbriqué, il faut la faire transiter par **toutes les props intermédiaires**, même dans des composants qui n'en ont pas besoin.

```
App
 └─ Layout        (ne s'en sert pas, doit quand même passer la prop)
     └─ Sidebar   (ne s'en sert pas, doit quand même passer la prop)
         └─ ThemeButton (l'utilise enfin)
```

C'est ce qu'on appelle le **prop drilling**. Le Context API permet de contourner ce problème en rendant une donnée accessible directement depuis n'importe quel composant descendant, sans passer par les props intermédiaires.

---

## 2. Les trois briques du Context API

| Brique | Rôle |
|---|---|
| `createContext()` | Crée un objet "contexte" (une boîte vide au départ). |
| `<MonContexte.Provider value={...}>` | Fournit une valeur à tous les composants enfants, quelle que soit leur profondeur. |
| `useContext(MonContexte)` | Récupère la valeur fournie par le `Provider` le plus proche. |

---

## 3. Exemple pas à pas : `ThemeContexte`

### 3.1 Création du contexte et de son Provider

Fichier : `src/context/ThemeContexte.jsx`

```jsx
import { createContext, useState, useEffect } from "react";

const ThemeContexte = createContext();

export const ThemeContexteProvider = ({ children }) => {
  const [theme, setTheme] = useState('white');

  const ChangementTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContexte.Provider value={{ theme, ChangementTheme }}>
      {children}
    </ThemeContexte.Provider>
  );
};

export default ThemeContexte;
```

Points clés :
- `createContext()` crée le contexte, exporté par défaut.
- Le **Provider** est un composant à part (`ThemeContexteProvider`) qui encapsule :
  - l'état (`useState`) ;
  - la logique de mise à jour (`ChangementTheme`) ;
  - un effet de bord (`useEffect`) pour persister la valeur (ici dans le `localStorage`).
- La `value` passée au `Provider` est un objet `{ theme, ChangementTheme }` : c'est cet objet que récupéreront tous les composants consommateurs.

> ⚠️ Point d'attention pédagogique : l'état initial est `'white'`, mais la fonction de bascule ne connaît que `'light'`/`'dark'`. Au premier clic, on passe donc de `'white'` à `'light'`. C'est un bon exemple à montrer en formation pour illustrer l'importance de faire correspondre l'état initial aux valeurs réellement gérées par la logique.

### 3.2 Fournir le contexte à l'application

Fichier : `src/main.jsx`

```jsx
import { ThemeContexteProvider } from './context/ThemeContexte.jsx'
import { LangContextProvider } from './context/LangContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContexteProvider>
      <LangContextProvider>
        <App />
      </LangContextProvider>
    </ThemeContexteProvider>
  </StrictMode>,
)
```

On enveloppe `<App />` avec le(s) `Provider(s)`. Tout composant rendu à l'intérieur de `App` pourra accéder aux contextes fournis, quelle que soit sa profondeur.

---

## 4. Consommer le contexte

### 4.1 Manière directe : `useContext`

Fichier : `src/components/Footer.jsx`

```jsx
import { useContext } from 'react'
import LangContext from '../context/LangContext'

const Footer = () => {
  const { lang, changeLang } = useContext(LangContext)
  return (
    <div>
      <h1>Footer</h1>
      <p>Language: {lang}</p>
      <button onClick={changeLang}>Changer Lang</button>
    </div>
  )
}
```

### 4.2 Bonne pratique : encapsuler dans un hook personnalisé

Fichier : `src/hooks/useTheme.js`

```js
import { useContext } from "react";
import ThemeContexte from "../context/ThemeContexte";

const useTheme = () => {
  const context = useContext(ThemeContexte);

  if (!context) {
    throw new Error("useTheme doit être utilisé à l'intérieur d'un ThemeContexteProvider");
  }

  return context;
};

export default useTheme;
```

Pourquoi c'est une bonne pratique :
- on évite de répéter `useContext(ThemeContexte)` partout ;
- on peut **valider l'usage** : si le hook est appelé hors d'un `Provider`, `context` vaut `undefined` (ou `null`) et on lève une erreur explicite, plutôt qu'un bug silencieux plus tard ;
- si l'implémentation du contexte change (ex : ajout d'un `reducer`), un seul fichier à modifier.

Utilisation dans `App.jsx` :

```jsx
import useTheme from './hooks/useTheme'

function App() {
  const { theme } = useTheme()
  return (
    <div className={theme}>
      <ChangerThemeBtn />
      <Main />
      <Footer />
    </div>
  )
}
```

---

## 5. Combiner plusieurs contextes

Le projet illustre aussi comment un même composant peut consommer **plusieurs contextes en même temps** (`ThemeContexte` via le hook `useTheme`, et `LangContext` via `useContext` direct) :

Fichier : `src/components/Main.jsx`

```jsx
import { useContext } from 'react'
import useTheme from '../hooks/useTheme'
import LangContext from '../context/LangContext'

const Main = () => {
  const { theme, ChangementTheme } = useTheme()
  const { lang, changeLang } = useContext(LangContext)
  return (
    <div>
      <p>Theme: {theme}</p>
      <p>Lang: {lang}</p>
      <button onClick={ChangementTheme} className={theme}>Changer Theme</button>
      <button onClick={changeLang}>Changer Lang</button>
    </div>
  )
}
```

Chaque contexte reste indépendant : un `Provider` pour le thème, un `Provider` pour la langue, chacun avec son propre état et sa propre logique.

---

## 6. Schéma récapitulatif

```
main.jsx
 └─ ThemeContexteProvider   (fournit { theme, ChangementTheme })
     └─ LangContextProvider (fournit { lang, changeLang })
         └─ App
             ├─ ChangerThemeBtn  → useTheme() + useContext(LangContext)
             ├─ Main             → useTheme() + useContext(LangContext)
             └─ Footer           → useContext(LangContext)
```

---

## 7. Bonnes pratiques à retenir

1. **Un fichier de contexte = un `createContext` + son `Provider`**, exportés séparément.
2. **Toujours passer par un hook personnalisé** (`useTheme`, `useLang`, …) plutôt que d'appeler `useContext` directement dans les composants — plus lisible, plus sûr (garde-fou en cas d'oubli du `Provider`).
3. **Ne pas tout mettre dans un seul contexte global** : séparer par domaine fonctionnel (thème, langue, authentification, panier…) pour éviter des re-renders inutiles.
4. **Le Context API n'est pas un remplaçant systématique de Redux/Zustand** : il convient bien à des données peu fréquemment mises à jour (thème, langue, utilisateur connecté), moins à un état très dynamique partagé par de nombreux composants (risque de re-renders en cascade).

---

## 8. Pièges courants

- Oublier d'englober l'application avec le `Provider` → `useContext` renvoie `undefined`.
- Créer un nouvel objet `value={{ ... }}` à chaque rendu du `Provider` → provoque un re-render de tous les consommateurs même si les données n'ont pas changé (à mentionner en ouverture vers `useMemo`).
- Faire correspondre un état initial à des valeurs que la logique de mise à jour ne gère pas (cf. le cas `'white'` vs `'light'/'dark'` plus haut).

---

## 9. Exercices proposés

1. Corriger l'incohérence entre l'état initial `'white'` et les valeurs `'light'/'dark'` gérées par `ChangementTheme`.
2. Créer un hook `useLang` sur le modèle de `useTheme` pour `LangContext`, et remplacer les `useContext(LangContext)` directs dans `Main.jsx`, `Footer.jsx` et `ChangerThemeBtn.jsx`.
3. Ajouter un troisième contexte (ex : `AuthContext` avec `user` et `login`/`logout`).
4. Mesurer avec React DevTools le nombre de re-renders déclenchés par un changement de thème, puis optimiser avec `useMemo` sur la `value` du `Provider`.
