// unmetafy function implementation
function unmetafy(data: Uint8Array): string {
  const decoder = new TextDecoder("utf-8");
  const result: number[] = [];
  let change = false;

  for (let i = 0; i < data.length; i++) {
    let b = data[i];
    if (b === 0x83) {
      change = true;
    } else {
      if (change) {
        b = b ^ 0x20;
      }
      result.push(b);
      change = false;
    }
  }

  return decoder.decode(new Uint8Array(result));
}

// metafy function implementation
function metafy(data: string): Uint8Array {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(data);
  const result: number[] = [];

  for (let i = 0; i < encoded.length; i++) {
    const b = encoded[i];
    if (b === 0 || (0x83 <= b && b <= 0xa2)) {
      result.push(0x83, b ^ 0x20);
    } else {
      result.push(b);
    }
  }

  return new Uint8Array(result);
}

// Read and unmetafy zsh history
async function read(filepath: string): Promise<string> {
  const data = await Deno.readFile(filepath);
  return unmetafy(data);
}

// Metafy and write zsh history
async function write(filepath: string, content: string): Promise<void> {
  const data = metafy(content);
  await Deno.writeFile(filepath, data);
}

export { metafy, read, unmetafy, write };
