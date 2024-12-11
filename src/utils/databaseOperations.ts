import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export async function insertMemberData(transformedData: any[]) {
  console.log('Starting batch insert of member data');
  
  for (const member of transformedData) {
    try {
      // First, ensure collector exists
      const { data: collector, error: collectorError } = await supabase
        .from('collectors')
        .select('id')
        .eq('name', member.collector)
        .single();

      if (collectorError) {
        console.error('Error finding collector:', collectorError);
        throw new Error(`Collector not found: ${member.collector}`);
      }

      // Insert member
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .insert({
          collector_id: collector.id,
          full_name: member.fullName || member.name,
          date_of_birth: member.dateOfBirth,
          gender: member.gender,
          marital_status: member.maritalStatus,
          email: member.email,
          phone: member.mobileNo,
          address: member.address,
          postcode: member.postCode,
          town: member.town,
          status: 'active',
          verified: member.verified || false
        })
        .select()
        .single();

      if (memberError) {
        console.error('Error inserting member:', memberError);
        throw memberError;
      }

      // Insert family members if any
      if (member.dependants?.length) {
        const { error: dependantsError } = await supabase
          .from('family_members')
          .insert(
            member.dependants.map((dep: any) => ({
              member_id: memberData.id,
              name: dep.name,
              relationship: dep.relationship,
              date_of_birth: dep.dateOfBirth,
              gender: dep.gender
            }))
          );

        if (dependantsError) {
          console.error('Error inserting dependants:', dependantsError);
        }
      }

      // Insert admin notes if any
      if (member.notes?.length) {
        const { error: notesError } = await supabase
          .from('admin_notes')
          .insert(
            member.notes.map((note: string) => ({
              member_id: memberData.id,
              note: note
            }))
          );

        if (notesError) {
          console.error('Error inserting notes:', notesError);
        }
      }

      console.log(`Successfully processed member: ${member.fullName || member.name}`);
    } catch (error) {
      console.error('Error processing member:', error);
      throw error;
    }
  }
}