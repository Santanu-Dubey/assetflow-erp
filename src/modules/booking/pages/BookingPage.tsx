import { Fragment } from "react";
import { CalendarPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/common/components/PageHeader";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

export function BookingPage() {
  return (
    <>
      <PageHeader
        title="Resource Booking"
        description="Book rooms, vehicles, and shared equipment by time slot with overlap validation and cancel or reschedule support."
        actions={<Button icon={<CalendarPlus className="h-4 w-4" />}>New Booking</Button>}
      />
      <section className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Room B2 Weekly Calendar</CardTitle>
            <div className="flex gap-2">
              <Button className="h-9 w-9 px-0" variant="outline" aria-label="Previous week">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button className="h-9 w-9 px-0" variant="outline" aria-label="Next week">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="grid min-w-[720px] grid-cols-[6rem_repeat(5,1fr)] rounded-md border border-border text-sm">
              <div className="border-b border-r border-border bg-muted p-3 font-medium">Time</div>
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                <div className="border-b border-r border-border bg-muted p-3 font-medium last:border-r-0" key={day}>
                  {day}
                </div>
              ))}
              {timeSlots.map((time) => (
                <Fragment key={time}>
                  <div className="border-b border-r border-border p-3 font-mono text-xs" key={`${time}-label`}>
                    {time}
                  </div>
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                    <div className="min-h-16 border-b border-r border-border p-2 last:border-r-0" key={`${day}-${time}`}>
                      {day === "Tue" && time === "09:00" ? (
                        <div className="rounded-md bg-primary/15 p-2 text-xs text-primary">Ops sync 09:00-10:00</div>
                      ) : null}
                      {day === "Thu" && time === "14:00" ? (
                        <div className="rounded-md bg-secondary/15 p-2 text-xs text-secondary">Training 14:00-16:00</div>
                      ) : null}
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Overlap Validation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-md border border-destructive/25 bg-destructive/10 p-3">
              <Badge tone="danger">Rejected</Badge>
              <p className="mt-2 text-sm">09:30-10:30 conflicts with Room B2 booking 09:00-10:00.</p>
            </div>
            <div className="rounded-md border border-secondary/25 bg-secondary/10 p-3">
              <Badge tone="success">Allowed</Badge>
              <p className="mt-2 text-sm">10:00-11:00 starts after the existing booking ends.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
