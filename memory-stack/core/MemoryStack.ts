import { AESEncryption } from '../encryption/AESEncryption';
import { MemoryLayer, LayerType } from './MemoryLayer';

export interface ContextData {
  id: string;
  data: any;
}

export class MemoryStack {
  private layers: Map<LayerType, MemoryLayer>;
  private encryption: AESEncryption;

  constructor(encryptionKey: string) {
    this.encryption = new AESEncryption(encryptionKey);
    this.layers = new Map();
  }

  addLayer(layer: MemoryLayer): void {
    this.layers.set(layer.type, layer);
  }

  storeData(layerType: LayerType, context: ContextData): string {
    const layer = this.layers.get(layerType);
    if (!layer) throw new Error(`Layer ${layerType} not configured`);
    
    const encrypted = this.encryption.encrypt(JSON.stringify(context));
    return layer.store(encrypted);
  }

  retrieveData(layerType: LayerType, id: string): ContextData | null {
    const layer = this.layers.get(layerType);
    if (!layer) throw new Error(`Layer ${layerType} not configured`);
    
    const encrypted = layer.retrieve(id);
    if (!encrypted) return null;
    
    return JSON.parse(this.encryption.decrypt(encrypted));
  }

  // Additional methods for memory management
  // will be implemented in subsequent milestones
}