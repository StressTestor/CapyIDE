export enum LayerType {
  Ephemeral = "ephemeral",
  ShortTerm = "short-term",
  LongTerm = "long-term",
  Vector = "vector"
}

export abstract class MemoryLayer {
  protected storage: Map<string, string> = new Map();
  
  constructor(public readonly type: LayerType) {}

  store(data: string): string {
    const id = this.generateId();
    this.storage.set(id, data);
    return id;
  }

  retrieve(id: string): string | null {
    return this.storage.get(id) || null;
  }

  // Common methods for all memory layers
  protected generateId(): string {
    return `${this.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}