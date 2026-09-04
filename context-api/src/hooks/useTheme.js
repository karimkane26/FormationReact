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
