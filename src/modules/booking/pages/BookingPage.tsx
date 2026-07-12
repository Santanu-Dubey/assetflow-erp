import { FormEvent, Fragment, useState } from "react";
import { CalendarPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/common/components/PageHeader";
import { Badge } from "@/common/components/ui/Badge";
import { Button } from "@/common/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/Card";
import { useErpStore } from "@/common/store/erpStore";

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

export function BookingPage() {
  const [message, setMessage] = useState("");
  const { assets, employees, bookings, createBooking, cancelBooking } = useErpStore();
  const resources = assets.filter((asset) => asset.bookable);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = createBooking({
      resourceId: String(form.get("resourceId")),
      employeeId: String(form.get("employeeId")),
      purpose: String(form.get("purpose")),
      startTime: String(form.get("startTime")),
      endTime: String(form.get("endTime")),
    });
    setMessage(result.message);
    if (result.ok) event.currentTarget.reset();
  };

  return (
    <>
      <PageHeader
        title="Resource Booking"
        description="Book rooms, vehicles, and shared equipment by time slot with overlap validation and cancel or reschedule support."
        actions={<Button icon={<CalendarPlus className="h-4 w-4" />}>New Booking</Button>}
      />
      {message ? <div className="mb-4 rounded-md border border-border bg-card p-3 text-sm">{message}</div> : null}
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
            <form className="mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5" onSubmit={onSubmit}>
              <select className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="resourceId">{resources.map((asset) => <option key={asset.id} value={asset.id}>{asset.name}</option>)}</select>
              <select className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="employeeId">{employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.name}</option>)}</select>
              <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="purpose" placeholder="Purpose" required />
              <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="startTime" type="datetime-local" required />
              <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" name="endTime" type="datetime-local" required />
              <Button type="submit">Book</Button>
            </form>
            <div className="mb-5 space-y-2">
              {bookings.map((booking) => (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-3 text-sm" key={booking.id}>
                  <span>{assets.find((asset) => asset.id === booking.resourceId)?.name} - {booking.purpose} - {booking.startTime} to {booking.endTime}</span>
                  <div className="flex gap-2"><Badge tone={booking.status === "CANCELLED" ? "neutral" : "success"}>{booking.status}</Badge>{booking.status !== "CANCELLED" ? <Button className="h-8" variant="outline" onClick={() => cancelBooking(booking.id)}>Cancel</Button> : null}</div>
                </div>
              ))}
            </div>
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
