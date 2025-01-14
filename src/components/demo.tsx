import { CardsActivityGoal } from "@/components/shadcn-demos/activity-goal";
import { CardsChat } from "@/components/shadcn-demos/chat";
import { CardsCreateAccount } from "@/components/shadcn-demos/create-account";
import { CardsTeamMembers } from "@/components/shadcn-demos/team-members";
import { CardsCookieSettings } from "@/components/shadcn-demos/cookie-settings";
import { CardsPaymentMethod } from "@/components/shadcn-demos/payment-method";
import { CardsReportIssue } from "@/components/shadcn-demos/report-issue";
import { CardsDataTable } from "@/components/shadcn-demos/data-table";
import { CardsStats } from "@/components/shadcn-demos/stats";
import { CardsMetric } from "@/components/shadcn-demos/metric";
import { CardsShare } from "@/components/shadcn-demos/share";
import { CardsCalendar } from "@/components/shadcn-demos/calendar";
import { ScrollArea } from "@/components/shadcn-ui/scroll";

export default function Demo() {
  return (
    <ScrollArea className="h-full w-full rounded-md border p-4">
      <div className="md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4">
        <div className="space-y-4 lg:col-span-4 xl:col-span-6 xl:space-y-4">
          <CardsStats />
          <div className="grid gap-1 sm:grid-cols-[260px_1fr] md:hidden">
            <CardsCalendar />
            <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-4">
              <CardsActivityGoal />
            </div>
            <div className="pt-3 sm:col-span-2 xl:pt-4">
              <CardsMetric />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="space-y-4 xl:space-y-4">
              <CardsTeamMembers />
              <CardsCookieSettings />
              <CardsPaymentMethod />
            </div>
            <div className="space-y-4 xl:space-y-4">
              <CardsChat />
              <CardsCreateAccount />
              <div className="hidden xl:block">
                <CardsReportIssue />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
          <div className="hidden gap-1 sm:grid-cols-[260px_1fr] md:grid">
            <CardsCalendar />
            <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-3">
              <CardsActivityGoal />
            </div>
            <div className="pt-3 sm:col-span-2 xl:pt-3">
              <CardsMetric />
            </div>
          </div>
          <div className="hidden md:block">
            <CardsDataTable />
          </div>
          <CardsShare />
          <div className="xl:hidden">
            <CardsReportIssue />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
