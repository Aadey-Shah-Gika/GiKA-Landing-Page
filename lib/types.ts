export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Entity {
  id: string;
  type: string;
  name: string;
  properties: Record<string, string | number>;
}

export interface RelatedEntity {
  id: string;
  name: string;
  type: string;
  relation: string;
  properties: Record<string, string | number>;
}

export interface DataSource {
  id: string;
  name: string;
  type: string;
  lastUpdated?: string;
  details?: string;
}

export interface ContextData {
  entities: Entity[];
  relatedEntities: RelatedEntity[];
  sources: DataSource[];
}
