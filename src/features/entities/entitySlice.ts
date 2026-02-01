import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { Entity, EntityData, EntityStatus, CountryEntry, ColumnData } from '@/types/entity';
import { calculateColumnG } from '@/utils/calculations';
import { generateSubRowLabel } from '@/utils/format';

interface EntityState {
  byId: Record<string, Entity>;
  allIds: string[];
  entityData: Record<string, EntityData>;
}

const initialState: EntityState = {
  byId: {},
  allIds: [],
  entityData: {}
};

const entitySlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    // Entity CRUD
    addEntity: (state, action: PayloadAction<{ name: string; identifier: string }>) => {
      const id = uuidv4();
      const now = new Date().toISOString();
      
      const entity: Entity = {
        id,
        name: action.payload.name,
        identifier: action.payload.identifier,
        status: 'DRAFT',
        createdAt: now,
        updatedAt: now
      };
      
      state.byId[id] = entity;
      state.allIds.push(id);
      state.entityData[id] = { entityId: id, lines: {} };
    },
    
    updateEntity: (state, action: PayloadAction<{ id: string; name: string; identifier: string }>) => {
      const entity = state.byId[action.payload.id];
      if (entity) {
        entity.name = action.payload.name;
        entity.identifier = action.payload.identifier;
        entity.updatedAt = new Date().toISOString();
      }
    },
    
    deleteEntity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.byId[id];
      delete state.entityData[id];
      state.allIds = state.allIds.filter(entityId => entityId !== id);
    },
    
    setEntityStatus: (state, action: PayloadAction<{ id: string; status: EntityStatus }>) => {
      const entity = state.byId[action.payload.id];
      if (entity) {
        entity.status = action.payload.status;
        entity.updatedAt = new Date().toISOString();
      }
    },
    
    // Country entry CRUD
    addCountryEntry: (state, action: PayloadAction<{ entityId: string; lineNumber: number; country: string }>) => {
      const { entityId, lineNumber, country } = action.payload;
      const data = state.entityData[entityId];
      
      if (!data) return;
      
      // Initialize line if it doesn't exist
      if (!data.lines[lineNumber]) {
        data.lines[lineNumber] = {
          lineNumber,
          countries: []
        };
      }
      
      const line = data.lines[lineNumber];
      const newEntry: CountryEntry = {
        id: uuidv4(),
        country,
        subRowLabel: generateSubRowLabel(line.countries.length),
        columns: {
          a: '0.0000',
          b: '0.0000',
          c: '0.0000',
          d: '0.0000',
          e: '0.0000',
          f: '0.0000',
          g: '0.0000'
        }
      };
      
      line.countries.push(newEntry);
      
      // Update entity timestamp
      const entity = state.byId[entityId];
      if (entity) {
        entity.updatedAt = new Date().toISOString();
      }
    },
    
    updateCountryEntry: (state, action: PayloadAction<{ 
      entityId: string; 
      lineNumber: number; 
      entryId: string; 
      country: string 
    }>) => {
      const { entityId, lineNumber, entryId, country } = action.payload;
      const line = state.entityData[entityId]?.lines[lineNumber];
      
      if (!line) return;
      
      const entry = line.countries.find(c => c.id === entryId);
      if (entry) {
        entry.country = country;
        
        // Update entity timestamp
        const entity = state.byId[entityId];
        if (entity) {
          entity.updatedAt = new Date().toISOString();
        }
      }
    },
    
    deleteCountryEntry: (state, action: PayloadAction<{ 
      entityId: string; 
      lineNumber: number; 
      entryId: string 
    }>) => {
      const { entityId, lineNumber, entryId } = action.payload;
      const line = state.entityData[entityId]?.lines[lineNumber];
      
      if (!line) return;
      
      line.countries = line.countries.filter(c => c.id !== entryId);
      
      // Regenerate sub-row labels
      line.countries.forEach((country, index) => {
        country.subRowLabel = generateSubRowLabel(index);
      });
      
      // Remove line if empty
      if (line.countries.length === 0) {
        delete state.entityData[entityId]!.lines[lineNumber];
      }
      
      // Update entity timestamp
      const entity = state.byId[entityId];
      if (entity) {
        entity.updatedAt = new Date().toISOString();
      }
    },
    
    // Column data updates
    updateColumnData: (state, action: PayloadAction<{
      entityId: string;
      lineNumber: number;
      entryId: string;
      columnKey: keyof ColumnData;
      value: string;
    }>) => {
      const { entityId, lineNumber, entryId, columnKey, value } = action.payload;
      const line = state.entityData[entityId]?.lines[lineNumber];
      
      if (!line) return;
      
      const entry = line.countries.find(c => c.id === entryId);
      if (!entry) return;
      
      // INVARIANT: Column (g) is never editable
      if (columnKey === 'g') return;
      
      // Update column value
      if (columnKey === 'eCategory') {
        entry.columns.eCategory = value;
      } else {
        entry.columns[columnKey] = value;
      }
      
      // Recalculate column (g)
      entry.columns.g = calculateColumnG(entry.columns);
      
      // Update entity timestamp
      const entity = state.byId[entityId];
      if (entity) {
        entity.updatedAt = new Date().toISOString();
      }
    },
    
    // Clear entity data
    clearEntityData: (state, action: PayloadAction<string>) => {
      const entityId = action.payload;
      if (state.entityData[entityId]) {
        state.entityData[entityId] = { entityId, lines: {} };
        
        const entity = state.byId[entityId];
        if (entity) {
          entity.updatedAt = new Date().toISOString();
        }
      }
    },
    
    clearLineData: (state, action: PayloadAction<{ entityId: string; lineNumber: number }>) => {
      const { entityId, lineNumber } = action.payload;
      const data = state.entityData[entityId];
      
      if (data && data.lines[lineNumber]) {
        delete data.lines[lineNumber];
        
        const entity = state.byId[entityId];
        if (entity) {
          entity.updatedAt = new Date().toISOString();
        }
      }
    },
    
    // Load state from storage
    loadEntitiesState: (_state, action: PayloadAction<EntityState>) => {
      return action.payload;
    }
  }
});

export const {
  addEntity,
  updateEntity,
  deleteEntity,
  setEntityStatus,
  addCountryEntry,
  updateCountryEntry,
  deleteCountryEntry,
  updateColumnData,
  clearEntityData,
  clearLineData,
  loadEntitiesState
} = entitySlice.actions;

export default entitySlice.reducer;
