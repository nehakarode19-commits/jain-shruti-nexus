import { supabase } from "@/integrations/supabase/client";

type NotificationType = "created" | "assigned" | "status_changed" | "sla_warning" | "resolved";

interface NotificationData {
  type: NotificationType;
  ticketNumber: string;
  ticketTitle: string;
  recipientEmail?: string;
  recipientName?: string;
  assigneeName?: string;
  oldStatus?: string;
  newStatus?: string;
  slaDeadline?: string;
}

export async function sendTicketNotification(data: NotificationData): Promise<boolean> {
  try {
    const { data: response, error } = await supabase.functions.invoke("ticket-notifications", {
      body: data,
    });

    if (error) {
      console.error("Error sending ticket notification:", error);
      return false;
    }

    console.log("Ticket notification sent:", response);
    return true;
  } catch (error) {
    console.error("Failed to send ticket notification:", error);
    return false;
  }
}

// Helper functions for specific notification types
export const notifyTicketCreated = (ticketNumber: string, ticketTitle: string, recipientEmail?: string) =>
  sendTicketNotification({ type: "created", ticketNumber, ticketTitle, recipientEmail });

export const notifyTicketAssigned = (
  ticketNumber: string,
  ticketTitle: string,
  assigneeName: string,
  recipientEmail?: string
) =>
  sendTicketNotification({ type: "assigned", ticketNumber, ticketTitle, assigneeName, recipientEmail });

export const notifyStatusChanged = (
  ticketNumber: string,
  ticketTitle: string,
  oldStatus: string,
  newStatus: string,
  recipientEmail?: string
) =>
  sendTicketNotification({ type: "status_changed", ticketNumber, ticketTitle, oldStatus, newStatus, recipientEmail });

export const notifySLAWarning = (
  ticketNumber: string,
  ticketTitle: string,
  slaDeadline: string,
  recipientEmail?: string
) =>
  sendTicketNotification({ type: "sla_warning", ticketNumber, ticketTitle, slaDeadline, recipientEmail });

export const notifyTicketResolved = (ticketNumber: string, ticketTitle: string, recipientEmail?: string) =>
  sendTicketNotification({ type: "resolved", ticketNumber, ticketTitle, recipientEmail });
