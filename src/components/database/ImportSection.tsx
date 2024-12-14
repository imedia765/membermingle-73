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
      for (const member of validData) {
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