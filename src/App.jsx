import { useEffect, useState } from "react";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const displayFollower = enabled ? "block" : "none";

  useEffect(() => {
    console.log("efect", { enabled });

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log("handleMove", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  //cleanup --> seejecuta cuando el componente se desmonta y cuando cambian las dependicas, antes de ejecutar el efecto de nuevo.

  //objeto de javascript getEventListeners(window) -----> permite observar los eventos, en éste caso de window, pero no me funciona en Firefox for developer, quizá sólo es de Google Chrome y su motor. confirmado lo anterior.
  return (
    <>
      <div
        style={{
          display: `${displayFollower}`,
          position: "absolute",
          backgroundColor: "transparent",
          borderRadius: "50%",
          border: "solid 5px black",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px,${position.y}px)`,
        }}
      ></div>
      <h3>Project: Mouse Follower</h3>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivate" : "Activate"}: Follow Mouse
      </button>
    </>
  );
};

function App() {
  const [mounted, setMounted] = useState(true);
  return (
    <main>
      {mounted && <FollowMouse />}
      <button onClick={() => setMounted(!mounted)}>
        Toggle mounted FollowMouse component
      </button>
    </main>
  );
}

export default App;
