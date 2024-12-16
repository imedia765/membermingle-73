import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MemberCard } from "@/components/members/MemberCard";
import { MembersHeader } from "@/components/members/MembersHeader";
import { MembersSearch } from "@/components/members/MembersSearch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CoveredMembersOverview } from "@/components/members/CoveredMembersOverview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Member } from "@/components/members/types";

const ITEMS_PER_PAGE = 20;

export default function Members() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['members', page, searchTerm],
    queryFn: async () => {
      console.log('Starting members fetch...', { page, searchTerm });
      
      // First get the current user's role
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Error fetching user:', userError);
        throw userError;
      }

      if (!user) {
        throw new Error('No authenticated user found');
      }

      console.log('Current user:', user.id);
      
      // Try to get existing profile
      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
        throw profileError;
      }

      // If no profile exists, create one
      if (!existingProfile) {
        console.log('Creating new profile for user');
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: user.id,
              email: user.email,
              role: 'admin' // Default role for testing
            }
          ])
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          throw createError;
        }

        console.log('New profile created:', newProfile);
      }

      // Now fetch members
      let query = supabase
        .from('members')
        .select('*', { count: 'exact' });

      // Apply search filter if searchTerm exists
      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,member_number.ilike.%${searchTerm}%`);
      }

      // Apply pagination
      const from = page * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      
      const { data: members, error: queryError, count } = await query
        .range(from, to)
        .order('created_at', { ascending: false });
      
      if (queryError) {
        console.error('Error fetching members:', queryError);
        throw queryError;
      }
      
      console.log('Query completed. Members found:', members?.length);
      console.log('Total count:', count);
      
      return {
        members: members?.map(member => ({
          ...member,
          name: member.full_name
        })) || [],
        totalCount: count || 0
      };
    },
    retry: 1,
    onError: (error) => {
      console.error('Query error:', error);
      toast({
        title: "Error loading members",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ['members'] });
  };

  const toggleMember = (id: string) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  const totalPages = Math.ceil((data?.totalCount || 0) / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <MembersHeader />
      <MembersSearch 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        isLoading={isFetching}
      />
      
      {error ? (
        <div className="text-red-500 p-4 text-center">
          Error loading members: {error.message}
        </div>
      ) : null}
      
      {data?.members && (
        <>
          <div className="text-sm text-muted-foreground mb-2">
            Total Members: {data.totalCount}
          </div>
          <CoveredMembersOverview members={data.members} />
        </>
      )}

      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-muted-foreground">Loading members...</div>
            </div>
          ) : !data?.members ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-muted-foreground">No data available</div>
            </div>
          ) : data.members.length === 0 ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-muted-foreground">
                {searchTerm ? "No members found matching your search" : "No members found"}
              </div>
            </div>
          ) : (
            <>
              {data.members.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  expandedMember={expandedMember}
                  editingNotes={editingNotes}
                  toggleMember={toggleMember}
                  setEditingNotes={setEditingNotes}
                  onUpdate={handleUpdate}
                />
              ))}
              
              <div className="flex justify-center gap-2 py-4">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0 || isLoading}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4">
                  Page {page + 1} of {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= (totalPages - 1) || isLoading}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}