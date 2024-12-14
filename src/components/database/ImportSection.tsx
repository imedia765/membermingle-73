import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileJson } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { transformMemberForSupabase, transformCollectorForSupabase } from "@/utils/dataCleanup";
import { supabase } from "@/integrations/supabase/client";

interface ImportData {
  collector: string;
  fullName?: string;
  name?: string;
  address?: string;
  email?: string;
  gender?: string;
  maritalStatus?: string;
  mobileNo?: string;
  dateOfBirth?: string;
  postCode?: string;
  town?: string;
  verified?: boolean;
}

export function ImportSection() {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const validateJsonData = (data: any[]): ImportData[] => {
    if (!Array.isArray(data)) {
      throw new Error('Invalid JSON format: expected an array');
    }

    // Filter out invalid entries and transform valid ones
    const validData = data.filter((item) => {
      if (typeof item !== 'object' || item === null) {
        console.log('Skipping invalid item:', item);
        return false;
      }
      
      if (!item.collector || (!item.fullName && !item.name)) {
        console.log('Skipping item missing required fields:', item);
        return false;
      }

      return true;
    });

    if (validData.length === 0) {
      throw new Error('No valid data entries found');
    }

    return validData as ImportData[];
  };

  const importData = async () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please log in to import data",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    try {
      const response = await fetch('/pwadb.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch JSON file: ${response.statusText}`);
      }

      const rawData = await response.json();
      console.log('Raw data:', rawData);

      const validData = validateJsonData(rawData);
      console.log('Valid data entries:', validData.length);

      // Process collectors first
      const uniqueCollectors = [...new Set(validData.map(item => item.collector).filter(Boolean))];
      console.log('Unique collectors:', uniqueCollectors);

      // Create a map to store collector IDs
      const collectorIdMap = new Map<string, string>();

      for (const collectorName of uniqueCollectors) {
        try {
          // Check if collector already exists
          const { data: existingCollectors, error: searchError } = await supabase
            .from('collectors')
            .select('id')
            .eq('name', collectorName);

          if (searchError) {
            console.error('Error searching for collector:', searchError);
            continue;
          }

          let collectorId: string;

          if (!existingCollectors || existingCollectors.length === 0) {
            // Collector doesn't exist, create new one
            const collectorData = await transformCollectorForSupabase(collectorName);
            console.log('Inserting collector:', collectorData);

            const { data: newCollector, error: insertError } = await supabase
              .from('collectors')
              .insert(collectorData)
              .select('id')
              .single();

            if (insertError) {
              console.error('Error inserting collector:', insertError);
              continue;
            }

            collectorId = newCollector.id;
          } else {
            collectorId = existingCollectors[0].id;
          }

          // Store the collector ID in our map
          collectorIdMap.set(collectorName, collectorId);
          
        } catch (error) {
          console.error(`Error processing collector ${collectorName}:`, error);
          continue;
        }
      }

      // Process members
      for (const member of validData) {
        try {
          if (!member.collector) continue;

          const collectorId = collectorIdMap.get(member.collector);
          if (!collectorId) {
            console.error(`No collector ID found for ${member.collector}`);
            continue;
          }

          const memberData = transformMemberForSupabase(member);
          console.log('Inserting member:', { ...memberData, collector_id: collectorId });

          const { error: memberError } = await supabase
            .from('members')
            .insert({
              ...memberData,
              collector_id: collectorId,
            });

          if (memberError) {
            console.error('Error inserting member:', memberError);
            continue;
          }

        } catch (error) {
          console.error('Error processing member:', error);
          continue;
        }
      }

      toast({
        title: "Import successful",
        description: "Data has been imported into the database",
      });
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "An error occurred during import",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Data</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Import member and collector data from pwadb.json file into the database.
          This will create new records and update existing ones.
        </p>
        <Button 
          onClick={importData} 
          disabled={isImporting || !session}
          className="w-full flex items-center gap-2"
        >
          <FileJson className="h-4 w-4" />
          {isImporting ? "Importing..." : "Import Data"}
        </Button>
        {!session && (
          <p className="text-sm text-red-500">
            Please log in to import data
          </p>
        )}
      </CardContent>
    </Card>
  );
}