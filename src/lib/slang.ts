// SLang — a tiny interpreted language built for SarthakOS.
// Supports: comments (#), let bindings, print, arithmetic, strings,
// string concatenation, comparisons, and `repeat N { ... }` loops.

export type SlangValue = number | string | boolean;

type Token =
  | { t: "num"; v: number }
  | { t: "str"; v: string }
  | { t: "id"; v: string }
  | { t: "op"; v: string }
  | { t: "lparen" }
  | { t: "rparen" };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const ops = ["==", "!=", ">=", "<=", "+", "-", "*", "/", "%", ">", "<"];
  while (i < expr.length) {
    const ch = expr[i];
    if (ch === " " || ch === "\t") {
      i++;
      continue;
    }
    if (ch === "(") {
      tokens.push({ t: "lparen" });
      i++;
      continue;
    }
    if (ch === ")") {
      tokens.push({ t: "rparen" });
      i++;
      continue;
    }
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let s = "";
      i++;
      while (i < expr.length && expr[i] !== quote) {
        s += expr[i];
        i++;
      }
      i++; // closing quote
      tokens.push({ t: "str", v: s });
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      let n = "";
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        n += expr[i];
        i++;
      }
      tokens.push({ t: "num", v: parseFloat(n) });
      continue;
    }
    let matchedOp = "";
    for (const op of ops) {
      if (expr.startsWith(op, i)) {
        matchedOp = op;
        break;
      }
    }
    if (matchedOp) {
      tokens.push({ t: "op", v: matchedOp });
      i += matchedOp.length;
      continue;
    }
    if (/[A-Za-z_]/.test(ch)) {
      let id = "";
      while (i < expr.length && /[A-Za-z0-9_]/.test(expr[i])) {
        id += expr[i];
        i++;
      }
      tokens.push({ t: "id", v: id });
      continue;
    }
    throw new Error(`Unexpected character '${ch}'`);
  }
  return tokens;
}

function evalExpr(expr: string, env: Record<string, SlangValue>): SlangValue {
  const tokens = tokenize(expr);
  let pos = 0;

  function peek(): Token | undefined {
    return tokens[pos];
  }
  function next(): Token | undefined {
    return tokens[pos++];
  }

  function parsePrimary(): SlangValue {
    const tok = next();
    if (!tok) throw new Error("Unexpected end of expression");
    if (tok.t === "num") return tok.v;
    if (tok.t === "str") return tok.v;
    if (tok.t === "id") {
      if (tok.v === "true") return true;
      if (tok.v === "false") return false;
      if (!(tok.v in env)) throw new Error(`Unknown variable '${tok.v}'`);
      return env[tok.v];
    }
    if (tok.t === "lparen") {
      const val = parseComparison();
      const close = next();
      if (!close || close.t !== "rparen") throw new Error("Expected ')'");
      return val;
    }
    if (tok.t === "op" && tok.v === "-") {
      return -(parsePrimary() as number);
    }
    throw new Error("Unexpected token in expression");
  }

  function parseTerm(): SlangValue {
    let left = parsePrimary();
    while (peek()?.t === "op" && ["*", "/", "%"].includes((peek() as { v: string }).v)) {
      const op = (next() as { v: string }).v;
      const right = parsePrimary();
      const a = left as number;
      const b = right as number;
      if (op === "*") left = a * b;
      else if (op === "/") left = a / b;
      else left = a % b;
    }
    return left;
  }

  function parseAdd(): SlangValue {
    let left = parseTerm();
    while (peek()?.t === "op" && ["+", "-"].includes((peek() as { v: string }).v)) {
      const op = (next() as { v: string }).v;
      const right = parseTerm();
      if (op === "+") {
        if (typeof left === "string" || typeof right === "string") {
          left = String(left) + String(right);
        } else {
          left = (left as number) + (right as number);
        }
      } else {
        left = (left as number) - (right as number);
      }
    }
    return left;
  }

  function parseComparison(): SlangValue {
    let left = parseAdd();
    while (
      peek()?.t === "op" &&
      ["==", "!=", ">", "<", ">=", "<="].includes((peek() as { v: string }).v)
    ) {
      const op = (next() as { v: string }).v;
      const right = parseAdd();
      switch (op) {
        case "==":
          left = left === right;
          break;
        case "!=":
          left = left !== right;
          break;
        case ">":
          left = (left as number) > (right as number);
          break;
        case "<":
          left = (left as number) < (right as number);
          break;
        case ">=":
          left = (left as number) >= (right as number);
          break;
        case "<=":
          left = (left as number) <= (right as number);
          break;
      }
    }
    return left;
  }

  const result = parseComparison();
  if (pos < tokens.length) throw new Error("Unexpected trailing tokens");
  return result;
}

export function runSlang(source: string): { output: string[]; error?: string } {
  const output: string[] = [];
  const env: Record<string, SlangValue> = {};
  const lines = source.split("\n");

  try {
    let i = 0;
    let steps = 0;
    const exec = (ls: { text: string; n: number }[]) => {
      let j = 0;
      while (j < ls.length) {
        steps++;
        if (steps > 100000) throw new Error("Execution limit exceeded");
        const raw = ls[j].text;
        const line = raw.replace(/#.*$/, "").trim();
        if (!line) {
          j++;
          continue;
        }
        if (line.startsWith("let ")) {
          const eq = line.indexOf("=");
          if (eq === -1) throw new Error(`Line ${ls[j].n}: expected '=' in let`);
          const name = line.slice(4, eq).trim();
          if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name))
            throw new Error(`Line ${ls[j].n}: invalid variable name`);
          env[name] = evalExpr(line.slice(eq + 1), env);
          j++;
          continue;
        }
        if (line.startsWith("print")) {
          const val = evalExpr(line.slice(5), env);
          output.push(String(val));
          j++;
          continue;
        }
        const repeatMatch = line.match(/^repeat\s+(.+?)\s*\{$/);
        if (repeatMatch) {
          const count = Number(evalExpr(repeatMatch[1], env));
          // gather block until matching }
          const block: { text: string; n: number }[] = [];
          j++;
          let depth = 1;
          while (j < ls.length && depth > 0) {
            const t = ls[j].text.replace(/#.*$/, "").trim();
            if (t.endsWith("{")) depth++;
            if (t === "}") {
              depth--;
              if (depth === 0) {
                j++;
                break;
              }
            }
            block.push(ls[j]);
            j++;
          }
          for (let k = 0; k < count; k++) {
            env["i"] = k;
            exec(block);
          }
          continue;
        }
        // bare assignment: name = expr
        const asg = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);
        if (asg && !line.includes("==")) {
          env[asg[1]] = evalExpr(asg[2], env);
          j++;
          continue;
        }
        throw new Error(`Line ${ls[j].n}: unknown statement '${line}'`);
      }
    };
    void i;
    exec(lines.map((text, idx) => ({ text, n: idx + 1 })));
  } catch (e) {
    return { output, error: e instanceof Error ? e.message : String(e) };
  }
  return { output };
}

export const SLANG_SAMPLE = `# Welcome to SLang — Sarthak's language, running in SarthakOS
# Try editing and pressing Run (Ctrl+Enter)

print "Booting SLang interpreter..."

let name = "Sarthak"
let coffeeCups = 4
let codeLines = coffeeCups * 250

print "Developer: " + name
print "Coffee cups today: " + coffeeCups
print "Estimated lines of code: " + codeLines

repeat 3 {
  print "loop iteration " + i
}

let hireWorthy = codeLines > 500
print "Hire worthy? " + hireWorthy
`;
