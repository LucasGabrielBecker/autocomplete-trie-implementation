import { useEffect, useState } from "react";
import "./App.css";
import { ReactComponent as TrieIcon } from "./assets/trie.svg";
import { Trie } from "./service/TrieService";
import { words } from "./service/buzzWords";
const trie = new Trie();

function App() {
  const [value, setValue] = useState("");
  const [completions, setCompletions] = useState([]);

  useEffect(() => {
    words.forEach((o) => trie.insert(o));
  }, []);

  const handleChangeInput = (event) => {
    setCompletions(trie.autoComplete(event.target.value));
    setValue(event.target.value);
  };
  return (
    <div className="App">
      <div className="grid">
        <TrieIcon
          style={{
            position: "absolute",
            top: 20,
            left: 50,
            height: "800px",
          }}
        />

        <main>
          <h3>Start typing</h3>
          <input type="text" value={value} onChange={handleChangeInput} />

          <div className="completions">
            {completions && completions.length
              ? completions.map((word) => (
                  <p onClick={() => setValue(word)}>{word}</p>
                ))
              : null}
          </div>

          <h2>
            The autocomplete problem implemented in JavaScript with a Trie
            <p>
              <a href="https://github.com/LucasGabrielBecker/autocomplete-trie-implementation">
                <img
                  src="https://pngimg.com/uploads/github/github_PNG40.png"
                  alt="github logo"
                  width="60"
                />
              </a>
            </p>
          </h2>
        </main>
      </div>
    </div>
  );
}

export default App;
