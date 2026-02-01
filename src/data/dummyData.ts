import { v4 as uuidv4 } from 'uuid';
import type { Entity, EntityData } from '@/types/entity';

// Dummy entities for testing
export const dummyEntities: Entity[] = [
  {
    id: uuidv4(),
    name: 'Tech Solutions Inc.',
    identifier: '12-3456789',
    status: 'SUBMITTED',
    createdAt: new Date('2025-12-15').toISOString(),
    updatedAt: new Date('2026-01-20').toISOString()
  },
  {
    id: uuidv4(),
    name: 'Global Enterprises LLC',
    identifier: '98-7654321',
    status: 'SUBMITTED',
    createdAt: new Date('2025-12-20').toISOString(),
    updatedAt: new Date('2026-01-25').toISOString()
  },
  {
    id: uuidv4(),
    name: 'Innovation Partners Corp',
    identifier: '45-6789012',
    status: 'SUBMITTED',
    createdAt: new Date('2026-01-05').toISOString(),
    updatedAt: new Date('2026-01-28').toISOString()
  },
  {
    id: uuidv4(),
    name: 'Pacific Trade Holdings',
    identifier: '23-8901234',
    status: 'SUBMITTED',
    createdAt: new Date('2025-11-10').toISOString(),
    updatedAt: new Date('2026-01-15').toISOString()
  },
  {
    id: uuidv4(),
    name: 'Atlantic Financial Group',
    identifier: '67-4321098',
    status: 'SUBMITTED',
    createdAt: new Date('2025-12-01').toISOString(),
    updatedAt: new Date('2026-01-22').toISOString()
  },
  {
    id: uuidv4(),
    name: 'Beta Industries Ltd',
    identifier: '89-1122334',
    status: 'DRAFT',
    createdAt: new Date('2026-01-25').toISOString(),
    updatedAt: new Date('2026-01-30').toISOString()
  }
];

/**
 * COMPREHENSIVE DUMMY DATA
 * 
 * Entity 1 - Tech Solutions Inc. (SUBMITTED): 13 IRS lines filled
 * Entity 2 - Global Enterprises LLC (SUBMITTED): 10 IRS lines filled
 * Entity 3 - Innovation Partners (SUBMITTED): 11 IRS lines filled
 * Entity 4 - Pacific Trade Holdings (SUBMITTED): 9 IRS lines filled
 * Entity 5 - Atlantic Financial Group (SUBMITTED): 10 IRS lines filled
 * Entity 6 - Beta Industries Ltd (DRAFT): 4 IRS lines filled
 * 
 * Total: 57 IRS line entries across 6 entities
 * All columns (a-f) filled, eCategory codes included
 * Multiple countries per line for rich aggregation testing
 */
export function createDummyEntityData(): Record<string, EntityData> {
  const entityData: Record<string, EntityData> = {};
  
  // Tech Solutions Inc. - Comprehensive data with 13 lines filled
  const entity1 = dummyEntities[0]!;
  entityData[entity1.id] = {
    entityId: entity1.id,
    lines: {
      1: { // Sales
        lineNumber: 1,
        countries: [
          {
            id: uuidv4(),
            country: 'United States',
            subRowLabel: 'A',
            columns: {
              a: '1000000.0000',
              b: '500000.0000',
              c: '250000.0000',
              d: '150000.0000',
              e: '100000.0000',
              eCategory: 'TECH-A',
              f: '50000.0000',
              g: '2050000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'China',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '300000.0000',
              c: '150000.0000',
              d: '100000.0000',
              e: '75000.0000',
              eCategory: 'TECH-B',
              f: '25000.0000',
              g: '650000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'United Kingdom',
            subRowLabel: 'C',
            columns: {
              a: '0.0000',
              b: '200000.0000',
              c: '100000.0000',
              d: '75000.0000',
              e: '50000.0000',
              eCategory: 'TECH-C',
              f: '15000.0000',
              g: '440000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Germany',
            subRowLabel: 'D',
            columns: {
              a: '0.0000',
              b: '180000.0000',
              c: '90000.0000',
              d: '60000.0000',
              e: '40000.0000',
              eCategory: 'TECH-D',
              f: '12000.0000',
              g: '382000.0000'
            }
          }
        ]
      },
      2: { // Services
        lineNumber: 2,
        countries: [
          {
            id: uuidv4(),
            country: 'India',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '220000.0000',
              c: '110000.0000',
              d: '80000.0000',
              e: '45000.0000',
              eCategory: 'SVC-IND',
              f: '15000.0000',
              g: '470000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Brazil',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '95000.0000',
              c: '50000.0000',
              d: '35000.0000',
              e: '20000.0000',
              eCategory: 'SVC-BR',
              f: '8000.0000',
              g: '208000.0000'
            }
          }
        ]
      },
      5: { // Interest income
        lineNumber: 5,
        countries: [
          {
            id: uuidv4(),
            country: 'Canada',
            subRowLabel: 'A',
            columns: {
              a: '50000.0000',
              b: '30000.0000',
              c: '20000.0000',
              d: '10000.0000',
              e: '5000.0000',
              eCategory: 'INT-CA',
              f: '2000.0000',
              g: '117000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Switzerland',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '45000.0000',
              c: '30000.0000',
              d: '15000.0000',
              e: '8000.0000',
              eCategory: 'INT-CH',
              f: '3000.0000',
              g: '101000.0000'
            }
          }
        ]
      },
      6: { // Ordinary dividends
        lineNumber: 6,
        countries: [
          {
            id: uuidv4(),
            country: 'Japan',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '75000.0000',
              c: '50000.0000',
              d: '25000.0000',
              e: '10000.0000',
              eCategory: 'DIV-JP',
              f: '5000.0000',
              g: '165000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'South Korea',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '60000.0000',
              c: '40000.0000',
              d: '20000.0000',
              e: '8000.0000',
              eCategory: 'DIV-KR',
              f: '3000.0000',
              g: '131000.0000'
            }
          }
        ]
      },
      3: { // Gross rental real estate income
        lineNumber: 3,
        countries: [
          {
            id: uuidv4(),
            country: 'Spain',
            subRowLabel: 'A',
            columns: {
              a: '25000.0000',
              b: '55000.0000',
              c: '30000.0000',
              d: '18000.0000',
              e: '10000.0000',
              eCategory: 'RE-ES',
              f: '5000.0000',
              g: '143000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Greece',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '42000.0000',
              c: '22000.0000',
              d: '13000.0000',
              e: '7000.0000',
              eCategory: 'RE-GR',
              f: '3500.0000',
              g: '87500.0000'
            }
          }
        ]
      },
      4: { // Other gross rental income
        lineNumber: 4,
        countries: [
          {
            id: uuidv4(),
            country: 'Portugal',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '38000.0000',
              c: '20000.0000',
              d: '12000.0000',
              e: '6000.0000',
              eCategory: 'RNT-PT',
              f: '2800.0000',
              g: '78800.0000'
            }
          }
        ]
      },
      7: { // Qualified dividends
        lineNumber: 7,
        countries: [
          {
            id: uuidv4(),
            country: 'Ireland',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '52000.0000',
              c: '35000.0000',
              d: '20000.0000',
              e: '10000.0000',
              eCategory: 'QDIV-IE',
              f: '4000.0000',
              g: '121000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Belgium',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '44000.0000',
              c: '28000.0000',
              d: '16000.0000',
              e: '8000.0000',
              eCategory: 'QDIV-BE',
              f: '3200.0000',
              g: '99200.0000'
            }
          }
        ]
      },
      8: { // Royalties
        lineNumber: 8,
        countries: [
          {
            id: uuidv4(),
            country: 'Australia',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '85000.0000',
              c: '45000.0000',
              d: '30000.0000',
              e: '15000.0000',
              eCategory: 'ROY-AU',
              f: '7000.0000',
              g: '182000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'New Zealand',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '62000.0000',
              c: '33000.0000',
              d: '21000.0000',
              e: '11000.0000',
              eCategory: 'ROY-NZ',
              f: '5000.0000',
              g: '132000.0000'
            }
          }
        ]
      },
      9: { // Net short-term capital gain
        lineNumber: 9,
        countries: [
          {
            id: uuidv4(),
            country: 'Hong Kong',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '48000.0000',
              c: '28000.0000',
              d: '18000.0000',
              e: '9000.0000',
              eCategory: 'SCG-HK',
              f: '3600.0000',
              g: '106600.0000'
            }
          }
        ]
      },
      10: { // Net long-term capital gain
        lineNumber: 10,
        countries: [
          {
            id: uuidv4(),
            country: 'Singapore',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '72000.0000',
              c: '42000.0000',
              d: '28000.0000',
              e: '14000.0000',
              eCategory: 'LCG-SG',
              f: '5600.0000',
              g: '161600.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Luxembourg',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '58000.0000',
              c: '35000.0000',
              d: '22000.0000',
              e: '11000.0000',
              eCategory: 'LCG-LU',
              f: '4400.0000',
              g: '130400.0000'
            }
          }
        ]
      },
      11: { // Collectibles (28%) gain
        lineNumber: 11,
        countries: [
          {
            id: uuidv4(),
            country: 'Switzerland',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '35000.0000',
              c: '22000.0000',
              d: '14000.0000',
              e: '7000.0000',
              eCategory: 'COL-CH',
              f: '2800.0000',
              g: '80800.0000'
            }
          }
        ]
      },
      13: { // Net section 1231 gain
        lineNumber: 13,
        countries: [
          {
            id: uuidv4(),
            country: 'Netherlands',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '42000.0000',
              c: '26000.0000',
              d: '16000.0000',
              e: '8000.0000',
              eCategory: 'S1231-NL',
              f: '3200.0000',
              g: '95200.0000'
            }
          }
        ]
      },
      14: { // Other income (loss)
        lineNumber: 14,
        countries: [
          {
            id: uuidv4(),
            country: 'Israel',
            subRowLabel: 'A',
            columns: {
              a: '15000.0000',
              b: '28000.0000',
              c: '18000.0000',
              d: '11000.0000',
              e: '5500.0000',
              eCategory: 'OTH-IL',
              f: '2200.0000',
              g: '79700.0000'
            }
          }
        ]
      }
    }
  };
  
  // Global Enterprises LLC - Full data
  const entity2 = dummyEntities[1]!;
  entityData[entity2.id] = {
    entityId: entity2.id,
    lines: {
      1: { // Sales
        lineNumber: 1,
        countries: [
          {
            id: uuidv4(),
            country: 'United States',
            subRowLabel: 'A',
            columns: {
              a: '750000.0000',
              b: '400000.0000',
              c: '200000.0000',
              d: '100000.0000',
              e: '50000.0000',
              eCategory: 'GBL-US',
              f: '25000.0000',
              g: '1525000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'France',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '180000.0000',
              c: '90000.0000',
              d: '60000.0000',
              e: '35000.0000',
              eCategory: 'GBL-FR',
              f: '10000.0000',
              g: '375000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Mexico',
            subRowLabel: 'C',
            columns: {
              a: '0.0000',
              b: '120000.0000',
              c: '65000.0000',
              d: '40000.0000',
              e: '22000.0000',
              eCategory: 'GBL-MX',
              f: '8000.0000',
              g: '255000.0000'
            }
          }
        ]
      },
      2: { // Services
        lineNumber: 2,
        countries: [
          {
            id: uuidv4(),
            country: 'India',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '150000.0000',
              c: '75000.0000',
              d: '50000.0000',
              e: '25000.0000',
              eCategory: 'SVC-001',
              f: '10000.0000',
              g: '310000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Philippines',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '88000.0000',
              c: '45000.0000',
              d: '30000.0000',
              e: '15000.0000',
              eCategory: 'SVC-PH',
              f: '6000.0000',
              g: '184000.0000'
            }
          }
        ]
      },
      3: { // Gross rental real estate
        lineNumber: 3,
        countries: [
          {
            id: uuidv4(),
            country: 'Spain',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '65000.0000',
              c: '35000.0000',
              d: '20000.0000',
              e: '12000.0000',
              eCategory: 'RE-ES',
              f: '5000.0000',
              g: '137000.0000'
            }
          }
        ]
      },
      6: { // Ordinary dividends
        lineNumber: 6,
        countries: [
          {
            id: uuidv4(),
            country: 'Singapore',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '45000.0000',
              c: '30000.0000',
              d: '15000.0000',
              e: '7500.0000',
              eCategory: 'DIV-SG',
              f: '2000.0000',
              g: '99500.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Hong Kong',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '38000.0000',
              c: '25000.0000',
              d: '12000.0000',
              e: '6000.0000',
              eCategory: 'DIV-HK',
              f: '1500.0000',
              g: '82500.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'South Africa',
            subRowLabel: 'C',
            columns: {
              a: '0.0000',
              b: '32000.0000',
              c: '20000.0000',
              d: '10000.0000',
              e: '5000.0000',
              eCategory: 'DIV-ZA',
              f: '1200.0000',
              g: '68200.0000'
            }
          }
        ]
      },
      7: { // Qualified dividends
        lineNumber: 7,
        countries: [
          {
            id: uuidv4(),
            country: 'Austria',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '48000.0000',
              c: '30000.0000',
              d: '18000.0000',
              e: '9000.0000',
              eCategory: 'QDIV-AT',
              f: '3600.0000',
              g: '108600.0000'
            }
          }
        ]
      },
      8: { // Royalties
        lineNumber: 8,
        countries: [
          {
            id: uuidv4(),
            country: 'Australia',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '85000.0000',
              c: '45000.0000',
              d: '30000.0000',
              e: '15000.0000',
              eCategory: 'ROY-AU',
              f: '7000.0000',
              g: '182000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'New Zealand',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '62000.0000',
              c: '33000.0000',
              d: '21000.0000',
              e: '11000.0000',
              eCategory: 'ROY-NZ',
              f: '5000.0000',
              g: '132000.0000'
            }
          }
        ]
      },
      9: { // Net short-term capital gain
        lineNumber: 9,
        countries: [
          {
            id: uuidv4(),
            country: 'Chile',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '41000.0000',
              c: '25000.0000',
              d: '16000.0000',
              e: '8000.0000',
              eCategory: 'SCG-CL',
              f: '3200.0000',
              g: '93200.0000'
            }
          }
        ]
      },
      10: { // Net long-term capital gain
        lineNumber: 10,
        countries: [
          {
            id: uuidv4(),
            country: 'Denmark',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '68000.0000',
              c: '40000.0000',
              d: '26000.0000',
              e: '13000.0000',
              eCategory: 'LCG-DK',
              f: '5200.0000',
              g: '152200.0000'
            }
          }
        ]
      },
      13: { // Net section 1231 gain
        lineNumber: 13,
        countries: [
          {
            id: uuidv4(),
            country: 'Finland',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '38000.0000',
              c: '24000.0000',
              d: '15000.0000',
              e: '7500.0000',
              eCategory: 'S1231-FI',
              f: '3000.0000',
              g: '87500.0000'
            }
          }
        ]
      },
      14: { // Other income (loss)
        lineNumber: 14,
        countries: [
          {
            id: uuidv4(),
            country: 'Norway',
            subRowLabel: 'A',
            columns: {
              a: '12000.0000',
              b: '28000.0000',
              c: '18000.0000',
              d: '11000.0000',
              e: '5500.0000',
              eCategory: 'OTH-NO',
              f: '2200.0000',
              g: '76700.0000'
            }
          }
        ]
      }
    }
  };
  
  // Innovation Partners - Rich data
  const entity3 = dummyEntities[2]!;
  entityData[entity3.id] = {
    entityId: entity3.id,
    lines: {
      1: { // Sales
        lineNumber: 1,
        countries: [
          {
            id: uuidv4(),
            country: 'United States',
            subRowLabel: 'A',
            columns: {
              a: '450000.0000',
              b: '200000.0000',
              c: '100000.0000',
              d: '60000.0000',
              e: '35000.0000',
              eCategory: 'INV-US',
              f: '15000.0000',
              g: '860000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Netherlands',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '95000.0000',
              c: '50000.0000',
              d: '32000.0000',
              e: '18000.0000',
              eCategory: 'INV-NL',
              f: '7000.0000',
              g: '202000.0000'
            }
          }
        ]
      },
      5: { // Interest income
        lineNumber: 5,
        countries: [
          {
            id: uuidv4(),
            country: 'Luxembourg',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '42000.0000',
              c: '28000.0000',
              d: '15000.0000',
              e: '8000.0000',
              eCategory: 'INT-LU',
              f: '3000.0000',
              g: '96000.0000'
            }
          }
        ]
      },
      4: { // Other gross rental income
        lineNumber: 4,
        countries: [
          {
            id: uuidv4(),
            country: 'Czech Republic',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '44000.0000',
              c: '24000.0000',
              d: '15000.0000',
              e: '8000.0000',
              eCategory: 'RNT-CZ',
              f: '3200.0000',
              g: '94200.0000'
            }
          }
        ]
      },
      6: { // Ordinary dividends
        lineNumber: 6,
        countries: [
          {
            id: uuidv4(),
            country: 'Russia',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '62000.0000',
              c: '38000.0000',
              d: '24000.0000',
              e: '12000.0000',
              eCategory: 'DIV-RU',
              f: '4800.0000',
              g: '140800.0000'
            }
          }
        ]
      },
      7: { // Qualified dividends
        lineNumber: 7,
        countries: [
          {
            id: uuidv4(),
            country: 'Ireland',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '55000.0000',
              c: '35000.0000',
              d: '20000.0000',
              e: '10000.0000',
              eCategory: 'QDIV-IE',
              f: '4000.0000',
              g: '124000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Iceland',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '38000.0000',
              c: '24000.0000',
              d: '14000.0000',
              e: '7000.0000',
              eCategory: 'QDIV-IS',
              f: '2800.0000',
              g: '85800.0000'
            }
          }
        ]
      },
      8: { // Royalties
        lineNumber: 8,
        countries: [
          {
            id: uuidv4(),
            country: 'Argentina',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '52000.0000',
              c: '30000.0000',
              d: '19000.0000',
              e: '9500.0000',
              eCategory: 'ROY-AR',
              f: '3800.0000',
              g: '114300.0000'
            }
          }
        ]
      },
      9: { // Net short-term capital gain
        lineNumber: 9,
        countries: [
          {
            id: uuidv4(),
            country: 'Colombia',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '36000.0000',
              c: '22000.0000',
              d: '14000.0000',
              e: '7000.0000',
              eCategory: 'SCG-CO',
              f: '2800.0000',
              g: '81800.0000'
            }
          }
        ]
      },
      10: { // Net long-term capital gain
        lineNumber: 10,
        countries: [
          {
            id: uuidv4(),
            country: 'Indonesia',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '58000.0000',
              c: '35000.0000',
              d: '22000.0000',
              e: '11000.0000',
              eCategory: 'LCG-ID',
              f: '4400.0000',
              g: '130400.0000'
            }
          }
        ]
      },
      16: { // Section 951A(a) inclusions
        lineNumber: 16,
        countries: [
          {
            id: uuidv4(),
            country: 'Bermuda',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '125000.0000',
              c: '75000.0000',
              d: '48000.0000',
              e: '25000.0000',
              eCategory: 'S951A-BM',
              f: '10000.0000',
              g: '283000.0000'
            }
          }
        ]
      }
    }
  };
  
  // Pacific Trade Holdings - Comprehensive data
  const entity4 = dummyEntities[3]!;
  entityData[entity4.id] = {
    entityId: entity4.id,
    lines: {
      1: { // Sales
        lineNumber: 1,
        countries: [
          {
            id: uuidv4(),
            country: 'United States',
            subRowLabel: 'A',
            columns: {
              a: '600000.0000',
              b: '280000.0000',
              c: '140000.0000',
              d: '85000.0000',
              e: '45000.0000',
              eCategory: 'PAC-US',
              f: '20000.0000',
              g: '1170000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Vietnam',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '125000.0000',
              c: '68000.0000',
              d: '42000.0000',
              e: '25000.0000',
              eCategory: 'PAC-VN',
              f: '9000.0000',
              g: '269000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Thailand',
            subRowLabel: 'C',
            columns: {
              a: '0.0000',
              b: '98000.0000',
              c: '52000.0000',
              d: '33000.0000',
              e: '18000.0000',
              eCategory: 'PAC-TH',
              f: '7000.0000',
              g: '208000.0000'
            }
          }
        ]
      },
      2: { // Services
        lineNumber: 2,
        countries: [
          {
            id: uuidv4(),
            country: 'Malaysia',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '72000.0000',
              c: '38000.0000',
              d: '24000.0000',
              e: '13000.0000',
              eCategory: 'SVC-MY',
              f: '5000.0000',
              g: '152000.0000'
            }
          }
        ]
      },
      6: { // Ordinary dividends
        lineNumber: 6,
        countries: [
          {
            id: uuidv4(),
            country: 'Taiwan',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '48000.0000',
              c: '32000.0000',
              d: '18000.0000',
              e: '9000.0000',
              eCategory: 'DIV-TW',
              f: '3000.0000',
              g: '110000.0000'
            }
          }
        ]
      },
      5: { // Interest income
        lineNumber: 5,
        countries: [
          {
            id: uuidv4(),
            country: 'Egypt',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '42000.0000',
              c: '26000.0000',
              d: '16000.0000',
              e: '8000.0000',
              eCategory: 'INT-EG',
              f: '3200.0000',
              g: '95200.0000'
            }
          }
        ]
      },
      6: { // Ordinary dividends
        lineNumber: 6,
        countries: [
          {
            id: uuidv4(),
            country: 'Taiwan',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '58000.0000',
              c: '36000.0000',
              d: '22000.0000',
              e: '11000.0000',
              eCategory: 'DIV-TW',
              f: '4400.0000',
              g: '131400.0000'
            }
          }
        ]
      },
      7: { // Qualified dividends
        lineNumber: 7,
        countries: [
          {
            id: uuidv4(),
            country: 'Poland',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '46000.0000',
              c: '28000.0000',
              d: '17000.0000',
              e: '8500.0000',
              eCategory: 'QDIV-PL',
              f: '3400.0000',
              g: '102900.0000'
            }
          }
        ]
      },
      8: { // Royalties
        lineNumber: 8,
        countries: [
          {
            id: uuidv4(),
            country: 'South Africa',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '52000.0000',
              c: '31000.0000',
              d: '20000.0000',
              e: '10000.0000',
              eCategory: 'ROY-ZA',
              f: '4000.0000',
              g: '117000.0000'
            }
          }
        ]
      },
      9: { // Net short-term capital gain
        lineNumber: 9,
        countries: [
          {
            id: uuidv4(),
            country: 'South Korea',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '35000.0000',
              c: '22000.0000',
              d: '15000.0000',
              e: '8000.0000',
              eCategory: 'CG-KR',
              f: '2500.0000',
              g: '82500.0000'
            }
          }
        ]
      },
      11: { // Collectibles (28%) gain
        lineNumber: 11,
        countries: [
          {
            id: uuidv4(),
            country: 'Monaco',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '28000.0000',
              c: '18000.0000',
              d: '11000.0000',
              e: '5500.0000',
              eCategory: 'COL-MC',
              f: '2200.0000',
              g: '64700.0000'
            }
          }
        ]
      },
      13: { // Net section 1231 gain
        lineNumber: 13,
        countries: [
          {
            id: uuidv4(),
            country: 'Croatia',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '32000.0000',
              c: '20000.0000',
              d: '12000.0000',
              e: '6000.0000',
              eCategory: 'S1231-HR',
              f: '2400.0000',
              g: '72400.0000'
            }
          }
        ]
      },
      15: { // Section 951(a)(1) inclusions
        lineNumber: 15,
        countries: [
          {
            id: uuidv4(),
            country: 'British Virgin Islands',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '88000.0000',
              c: '52000.0000',
              d: '33000.0000',
              e: '17000.0000',
              eCategory: 'S951-VG',
              f: '6800.0000',
              g: '196800.0000'
            }
          }
        ]
      }
    }
  };
  
  // Atlantic Financial Group - Full data
  const entity5 = dummyEntities[4]!;
  entityData[entity5.id] = {
    entityId: entity5.id,
    lines: {
      1: { // Sales
        lineNumber: 1,
        countries: [
          {
            id: uuidv4(),
            country: 'United States',
            subRowLabel: 'A',
            columns: {
              a: '850000.0000',
              b: '380000.0000',
              c: '190000.0000',
              d: '120000.0000',
              e: '65000.0000',
              eCategory: 'ATL-US',
              f: '30000.0000',
              g: '1635000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Italy',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '142000.0000',
              c: '78000.0000',
              d: '48000.0000',
              e: '28000.0000',
              eCategory: 'ATL-IT',
              f: '11000.0000',
              g: '307000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Sweden',
            subRowLabel: 'C',
            columns: {
              a: '0.0000',
              b: '105000.0000',
              c: '58000.0000',
              d: '36000.0000',
              e: '20000.0000',
              eCategory: 'ATL-SE',
              f: '8000.0000',
              g: '227000.0000'
            }
          }
        ]
      },
      4: { // Other gross rental income
        lineNumber: 4,
        countries: [
          {
            id: uuidv4(),
            country: 'Portugal',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '52000.0000',
              c: '28000.0000',
              d: '18000.0000',
              e: '10000.0000',
              eCategory: 'RNT-PT',
              f: '4000.0000',
              g: '112000.0000'
            }
          }
        ]
      },
      5: { // Interest income
        lineNumber: 5,
        countries: [
          {
            id: uuidv4(),
            country: 'Belgium',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '38000.0000',
              c: '25000.0000',
              d: '14000.0000',
              e: '7000.0000',
              eCategory: 'INT-BE',
              f: '2500.0000',
              g: '86500.0000'
            }
          }
        ]
      },
      6: { // Ordinary dividends
        lineNumber: 6,
        countries: [
          {
            id: uuidv4(),
            country: 'Denmark',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '42000.0000',
              c: '28000.0000',
              d: '16000.0000',
              e: '8500.0000',
              eCategory: 'DIV-DK',
              f: '2800.0000',
              g: '97300.0000'
            }
          }
        ]
      },
      7: { // Qualified dividends
        lineNumber: 7,
        countries: [
          {
            id: uuidv4(),
            country: 'Romania',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '41000.0000',
              c: '26000.0000',
              d: '16000.0000',
              e: '8000.0000',
              eCategory: 'QDIV-RO',
              f: '3200.0000',
              g: '94200.0000'
            }
          }
        ]
      },
      8: { // Royalties
        lineNumber: 8,
        countries: [
          {
            id: uuidv4(),
            country: 'Hungary',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '48000.0000',
              c: '29000.0000',
              d: '18000.0000',
              e: '9000.0000',
              eCategory: 'ROY-HU',
              f: '3600.0000',
              g: '107600.0000'
            }
          }
        ]
      },
      9: { // Net short-term capital gain
        lineNumber: 9,
        countries: [
          {
            id: uuidv4(),
            country: 'Bulgaria',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '33000.0000',
              c: '20000.0000',
              d: '13000.0000',
              e: '6500.0000',
              eCategory: 'SCG-BG',
              f: '2600.0000',
              g: '75100.0000'
            }
          }
        ]
      },
      10: { // Net long-term capital gain
        lineNumber: 10,
        countries: [
          {
            id: uuidv4(),
            country: 'Norway',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '62000.0000',
              c: '38000.0000',
              d: '24000.0000',
              e: '12000.0000',
              eCategory: 'LCG-NO',
              f: '5000.0000',
              g: '141000.0000'
            }
          }
        ]
      },
      12: { // Unrecaptured section 1250 gain
        lineNumber: 12,
        countries: [
          {
            id: uuidv4(),
            country: 'Morocco',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '36000.0000',
              c: '22000.0000',
              d: '14000.0000',
              e: '7000.0000',
              eCategory: 'S1250-MA',
              f: '2800.0000',
              g: '81800.0000'
            }
          }
        ]
      },
      14: { // Other income (loss)
        lineNumber: 14,
        countries: [
          {
            id: uuidv4(),
            country: 'Kenya',
            subRowLabel: 'A',
            columns: {
              a: '8000.0000',
              b: '22000.0000',
              c: '14000.0000',
              d: '9000.0000',
              e: '4500.0000',
              eCategory: 'OTH-KE',
              f: '1800.0000',
              g: '59300.0000'
            }
          }
        ]
      },
      17: { // Other foreign income
        lineNumber: 17,
        countries: [
          {
            id: uuidv4(),
            country: 'Pakistan',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '45000.0000',
              c: '28000.0000',
              d: '17000.0000',
              e: '8500.0000',
              eCategory: 'FOR-PK',
              f: '3400.0000',
              g: '101900.0000'
            }
          }
        ]
      }
    }
  };
  
  // Beta Industries Ltd - Work in progress (DRAFT)
  const entity6 = dummyEntities[5]!;
  entityData[entity6.id] = {
    entityId: entity6.id,
    lines: {
      1: { // Sales
        lineNumber: 1,
        countries: [
          {
            id: uuidv4(),
            country: 'United States',
            subRowLabel: 'A',
            columns: {
              a: '180000.0000',
              b: '75000.0000',
              c: '40000.0000',
              d: '22000.0000',
              e: '12000.0000',
              eCategory: 'BETA-US',
              f: '5000.0000',
              g: '334000.0000'
            }
          },
          {
            id: uuidv4(),
            country: 'Ukraine',
            subRowLabel: 'B',
            columns: {
              a: '0.0000',
              b: '52000.0000',
              c: '28000.0000',
              d: '17000.0000',
              e: '9000.0000',
              eCategory: 'BETA-UA',
              f: '3600.0000',
              g: '109600.0000'
            }
          }
        ]
      },
      2: { // Services
        lineNumber: 2,
        countries: [
          {
            id: uuidv4(),
            country: 'Poland',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '45000.0000',
              c: '25000.0000',
              d: '15000.0000',
              e: '8000.0000',
              eCategory: 'SVC-PL',
              f: '3000.0000',
              g: '96000.0000'
            }
          }
        ]
      },
      5: { // Interest income
        lineNumber: 5,
        countries: [
          {
            id: uuidv4(),
            country: 'Slovakia',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '28000.0000',
              c: '18000.0000',
              d: '11000.0000',
              e: '5500.0000',
              eCategory: 'INT-SK',
              f: '2200.0000',
              g: '64700.0000'
            }
          }
        ]
      },
      6: { // Ordinary dividends
        lineNumber: 6,
        countries: [
          {
            id: uuidv4(),
            country: 'Serbia',
            subRowLabel: 'A',
            columns: {
              a: '0.0000',
              b: '32000.0000',
              c: '20000.0000',
              d: '12000.0000',
              e: '6000.0000',
              eCategory: 'DIV-RS',
              f: '2400.0000',
              g: '72400.0000'
            }
          }
        ]
      }
    }
  };
  
  return entityData;
}
