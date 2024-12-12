export interface RawMemberImport {
  "Member No": string | null;
  "Unknown Author2024-07-30T14:49:00Author:\nName of member\nName": string;
  "No": string;
  "Unknown Author2024-07-30T14:49:00Author:\nAddress of member\nAddress": string;
  "Collector": string;
  "Checked": boolean | null;
  "Notes": string | null;
}

export interface CleanMember {
  full_name: string;
  address: string | null;
  collector: string;
  notes: string[];
  verified: boolean;
}

const cleanValue = (value: any): string | null => {
  if (value === 0 || value === null || value === undefined || value === '') return null;
  return String(value);
};

const mapCollectorName = (collectorCode: string): string => {
  const collectorMap: { [key: string]: string } = {
    'Tan&Anj': 'Anjum Riaz',
    // Add more mappings as needed
  };
  return collectorMap[collectorCode] || collectorCode;
};

export const transformMemberData = (members: RawMemberImport[]): CleanMember[] => {
  console.log('Starting data transformation for', members.length, 'members');
  
  return members.map((member) => {
    const transformed: CleanMember = {
      full_name: member["Unknown Author2024-07-30T14:49:00Author:\nName of member\nName"],
      address: cleanValue(member["Unknown Author2024-07-30T14:49:00Author:\nAddress of member\nAddress"]),
      collector: mapCollectorName(member.Collector),
      notes: member.Notes ? [member.Notes] : [],
      verified: member.Checked || false
    };

    console.log('Transformed member:', transformed);
    return transformed;
  });
};