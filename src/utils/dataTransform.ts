export interface RawMember {
  address?: string;
  collector: string;
  dateOfBirth?: string | number;
  dependants?: any[];
  email?: string;
  fullName?: string;
  name: string;
  gender?: string;
  maritalStatus?: string;
  mobileNo?: string;
  notes?: string[];
  postCode?: string;
  town?: string;
  verified?: boolean;
}

export interface CleanMember {
  address: string | null;
  collector: string;
  dateOfBirth: string | null;
  dependants: any[];
  email: string | null;
  fullName: string;
  gender: string | null;
  maritalStatus: string | null;
  mobileNo: string | null;
  notes: string[];
  postCode: string | null;
  town: string | null;
  verified: boolean;
}

const cleanValue = (value: any): string | null => {
  if (value === 0 || value === null || value === undefined || value === '') return null;
  return String(value);
};

const cleanArray = (value: any): any[] => {
  if (Array.isArray(value)) return value;
  return [];
};

export const transformMemberData = (members: RawMember[]): CleanMember[] => {
  return members.map((member) => ({
    address: cleanValue(member.address),
    collector: member.collector,
    dateOfBirth: cleanValue(member.dateOfBirth),
    dependants: cleanArray(member.dependants),
    email: cleanValue(member.email),
    fullName: member.fullName || member.name,
    gender: cleanValue(member.gender),
    maritalStatus: cleanValue(member.maritalStatus),
    mobileNo: cleanValue(member.mobileNo),
    notes: cleanArray(member.notes),
    postCode: cleanValue(member.postCode),
    town: cleanValue(member.town),
    verified: Boolean(member.verified)
  }));
};