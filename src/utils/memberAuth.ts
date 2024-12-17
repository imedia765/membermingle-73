import { supabase } from "@/integrations/supabase/client";

export async function getMemberByMemberId(memberId: string) {
  console.log("Looking up member with member_number:", memberId);
  
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('member_number', memberId.toUpperCase().trim())
      .maybeSingle();

    if (error) {
      console.error("Database error when looking up member:", error);
      return null;
    }

    if (!data) {
      console.log("No member found with member number:", memberId);
      return null;
    }

    console.log("Member lookup result:", data);
    return data;
  } catch (error) {
    console.error("Error in getMemberByMemberId:", error);
    return null;
  }
}

export async function verifyMemberPassword(password: string, storedHash: string | null) {
  if (!storedHash) {
    console.error("No stored hash provided for password verification");
    return false;
  }

  console.log("Verifying password hash...");
  
  try {
    // Hash the provided password
    const encoder = new TextEncoder();
    const passwordBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(password));
    const hashedPassword = Array.from(new Uint8Array(passwordBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    console.log("Password verification:", {
      providedPasswordLength: password.length,
      generatedHashLength: hashedPassword.length,
      storedHashLength: storedHash.length,
      matches: hashedPassword === storedHash
    });
    
    return hashedPassword === storedHash;
  } catch (error) {
    console.error("Error in password verification:", error);
    return false;
  }
}