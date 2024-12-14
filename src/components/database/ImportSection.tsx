import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileJson } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { transformMemberForSupabase, transformCollectorForSupabase } from "@/utils/dataCleanup";
import { supabase } from "@/integrations/supabase/client";

interface ImportData {
  collector: string;
  fullName: string;
  name: string;
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

  const validateJsonData = (data: any[]): data is ImportData[] => {
    if (!Array.isArray(data)) {
      throw new Error('Invalid JSON format: expected an array');
    }

    data.forEach((item, index) => {
      if (typeof item !== 'object' || item === null) {
        throw new Error(`Invalid item at index ${index}: expected an object`);
      }
      
      // Validate required fields
      if (!item.collector) {
        throw new Error(`Missing collector at index ${index}`);
      }
      if (!item.fullName && !item.name) {
        throw new Error(`Missing name at index ${index}`);
      }
    });

    return true;
  };

  const importData = async () => {
    setIsImporting(true);
    try {
      const response = await fetch('/pwadb.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch JSON file: ${response.statusText}`);
      }

      const rawData = await response.json();
      console.log('Raw data:', rawData);

      if (!validateJsonData(rawData)) {
        throw new Error('Invalid data format');
      }

      const data = rawData as ImportData[];

      // Process collectors first
      const uniqueCollectors = [...new Set(data.map(item => item.collector).filter(Boolean))];
      console.log('Unique collectors:', uniqueCollectors);

      for (const collectorName of uniqueCollectors) {
        // Check if collector already exists
        const { data: existingCollector } = await supabase
          .from('collectors')
          .select('id')
          .eq('name', collectorName)
          .single();

        if (!existingCollector) {
          const collectorData = await transformCollectorForSupabase(collectorName);
          console.log('Inserting collector:', collectorData);

          const { error: collectorError } = await supabase
            .from('collectors')
            .insert(collectorData);

          if (collectorError) {
            console.error('Error inserting collector:', collectorError);
            throw collectorError;
          }
        }
      }

      // Process members
      for (const member of data) {
        if (!member.collector) continue;

        // Get collector ID
        const { data: collectorData } = await supabase
          .from('collectors')
          .select('id')
          .eq('name', member.collector)
          .single();

        if (collectorData) {
          const memberData = transformMemberForSupabase(member);
          console.log('Inserting member:', { ...memberData, collector_id: collectorData.id });

          const { error: memberError } = await supabase
            .from('members')
            .insert({
              ...memberData,
              collector_id: collectorData.id,
            });

          if (memberError) {
            console.error('Error inserting member:', memberError);
            throw memberError;
          }
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
          disabled={isImporting}
          className="w-full flex items-center gap-2"
        >
          <FileJson className="h-4 w-4" />
          {isImporting ? "Importing..." : "Import Data"}
        </Button>
      </CardContent>
    </Card>
  );
}