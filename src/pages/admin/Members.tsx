import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MemberCard } from "@/components/members/MemberCard";
import { MembersHeader } from "@/components/members/MembersHeader";
import { MembersSearch } from "@/components/members/MembersSearch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CoveredMembersOverview } from "@/components/members/CoveredMembersOverview";
import { Button } from "@/components/ui/button";
import type { Member } from "@/components/members/types";
import { useToast } from "@/components/ui/use-toast";

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
      console.log('Fetching members...', { page, searchTerm });
      
      // First verify we can access the members table
      const { data: testData, error: testError } = await supabase
        .from('members')
        .select('count');
      
      console.log('Database access test:', { testData, testError });

      let query = supabase
        .from('members')
        .select('*, collectors(name)', { count: 'exact' });

      // Apply search filter if searchTerm exists
      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,member_number.ilike.%${searchTerm}%`);
      }

      // Apply pagination
      const from = page * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      
      const { data, error: fetchError, count } = await query
        .range(from, to)
        .order('created_at', { ascending: false });
      
      if (fetchError) {
        console.error('Error fetching members:', fetchError);
        toast({
          title: "Error fetching members",
          description: fetchError.message,
          variant: "destructive"
        });
        throw fetchError;
      }
      
      console.log('Members fetch result:', { 
        count, 
        dataLength: data?.length,
        firstMember: data?.[0]
      });
      
      return {
        members: data?.map(member => ({
          ...member,
          name: member.full_name
        })) || [],
        totalCount: count || 0
      };
    },
    placeholderData: (previousData) => previousData,
    staleTime: 5000, // Consider data fresh for 5 seconds
  });

  const handleUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ['members'] });
  };

  const toggleMember = (id: string) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  const totalPages = Math.ceil((data?.totalCount || 0) / ITEMS_PER_PAGE);

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-destructive">Error loading members: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MembersHeader />
      <MembersSearch 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        isLoading={isFetching}
      />
      
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
          ) : data?.members.length === 0 ? (
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
                  Page {page + 1} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1 || isLoading}
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