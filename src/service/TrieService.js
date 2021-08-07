class TrieNode {
  constructor(char) {
    this.char = char;
    this.isWord = false;
    this.children = {};
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode("");
  }

  insert(word) {
    if (!word) return null;

    let n = this.root;
    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (!n.children.hasOwnProperty(c)) {
        n.children[c] = new TrieNode(c);
      }
      n = n.children[c];
      if (i === word.length - 1) {
        n.isWord = true;
      }
    }
  }

  autoComplete(fragment) {
    if (!fragment) return null;

    const result = [];
    let n = this.root;
    for (let i = 0; i < fragment.length; i++) {
      const c = fragment[i];
      if (!n.children.hasOwnProperty(c)) {
        break;
      }
      n = n.children[c];
      if (i === fragment.length - 1) {
        const queue = [];
        queue.push([n, fragment]);
        while (queue.length) {
          const element = queue.shift();
          const [node, word] = element;
          if (node.isWord) result.push(word);
          for (const j in node.children) {
            const child = node.children[j];
            const childWord = word + child.char;
            queue.push([child, childWord]);
          }
        }
      }
    }

    return result;
  }
}
