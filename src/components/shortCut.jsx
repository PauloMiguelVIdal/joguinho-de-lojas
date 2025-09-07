import { useEffect } from "react";

export default function AtalhoTeclaP() {
  const handleKeyPress = (event) => {
    if (event.key.toLowerCase() === "p") {
      alert("Você pressionou a tecla P!");
    }
  };

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, []);

  return <div>Pressione "P" para ativar a ação.</div>;
}
