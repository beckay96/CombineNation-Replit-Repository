import { useState } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, SmilePlus } from "lucide-react";
import type { WellbeingLog } from "@shared/schema";

const moodOptions = ["Great", "Good", "Okay", "Down", "Struggling"] as const;

export default function Wellbeing() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");

  const { data: logs, isLoading } = useQuery<WellbeingLog[]>({
    queryKey: ["/api/wellbeing"],
  });

  const createLog = useMutation({
    mutationFn: async (data: { mood: string; notes: string }) => {
      const res = await apiRequest("POST", "/api/wellbeing", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Log created",
        description: "Your wellbeing log has been saved.",
      });
      setMood("");
      setNotes("");
      queryClient.invalidateQueries({ queryKey: ["/api/wellbeing"] });
    },
  });

  return (
    <div className="flex min-h-screen">
      <SidebarNav />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-dyslexia font-bold text-primary">
            Wellbeing Tracker
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your emotional wellbeing and reflect on your journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your mood" />
                </SelectTrigger>
                <SelectContent>
                  {moodOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Textarea
                placeholder="Share your thoughts..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />

              <Button
                className="w-full"
                onClick={() => createLog.mutate({ mood, notes })}
                disabled={!mood || createLog.isPending}
              >
                {createLog.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <SmilePlus className="mr-2 h-4 w-4" />
                )}
                Log Feeling
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Logs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : logs?.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No logs yet. Start tracking your wellbeing today!
                </p>
              ) : (
                logs?.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-lg border p-4 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{log.mood}</span>
                      <span className="text-sm text-muted-foreground">
                        {log.createdAt ? new Date(log.createdAt).toLocaleDateString() : 'No date'}
                      </span>
                    </div>
                    {log.notes && <p className="text-sm">{log.notes}</p>}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}