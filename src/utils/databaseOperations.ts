import { supabase } from "@/integrations/supabase/client";

export async function insertMemberData(transformedData: any[]) {
  console.log('Starting batch insert of member data');
  
  for (const member of transformedData) {
    try {
      // First, ensure collector exists
      const { data: collector, error: collectorError } = await supabase
        .from('collectors')
        .select('id, prefix, number')
        .eq('name', member.collector)
        .single();

      if (collectorError) {
        console.error('Error finding collector:', collectorError);
        throw new Error(`Collector not found: ${member.collector}`);
      }

      console.log('Found collector:', collector);

      // The trigger will generate the member_number automatically
      // We just need to ensure we're passing the correct collector_id
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .insert({
          collector_id: collector.id,
          full_name: member.fullName || member.name,
          date_of_birth: member.dateOfBirth || null,
          gender: member.gender || null,
          marital_status: member.maritalStatus || null,
          email: member.email || null,
          phone: member.mobileNo || null,
          address: member.address || null,
          postcode: member.postCode || null,
          town: member.town || null,
          status: 'active',
          verified: member.verified || false,
          member_number: '' // This will be overwritten by the trigger
        })
        .select()
        .single();

      if (memberError) {
        console.error('Error inserting member:', memberError);
        throw memberError;
      }

      console.log('Successfully inserted member:', memberData);

      // Insert family members if any
      if (member.dependants?.length) {
        const { error: dependantsError } = await supabase
          .from('family_members')
          .insert(
            member.dependants.map((dep: any) => ({
              member_id: memberData.id,
              name: dep.name,
              relationship: dep.relationship,
              date_of_birth: dep.dateOfBirth || null,
              gender: dep.gender || null
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