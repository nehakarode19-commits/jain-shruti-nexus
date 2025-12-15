import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TicketNotificationRequest {
  type: "created" | "assigned" | "status_changed" | "sla_warning" | "resolved";
  ticketNumber: string;
  ticketTitle: string;
  recipientEmail?: string;
  recipientName?: string;
  assigneeName?: string;
  oldStatus?: string;
  newStatus?: string;
  slaDeadline?: string;
}

const getEmailTemplate = (data: TicketNotificationRequest) => {
  const baseStyle = `
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #2D2A26;
  `;

  const templates: Record<string, { subject: string; html: string }> = {
    created: {
      subject: `New Ticket Created: ${data.ticketNumber}`,
      html: `
        <div style="${baseStyle}">
          <h2 style="color: #D2811D;">New Ticket Created</h2>
          <p>A new ticket has been created in the Jambushrusti Ticket Management System.</p>
          <div style="background: #FAF7F2; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p><strong>Ticket Number:</strong> ${data.ticketNumber}</p>
            <p><strong>Title:</strong> ${data.ticketTitle}</p>
          </div>
          <p>Please log in to the system to view and manage this ticket.</p>
          <p style="color: #6B6764; font-size: 12px; margin-top: 24px;">
            — Jambushrusti Ticket Management System
          </p>
        </div>
      `,
    },
    assigned: {
      subject: `Ticket Assigned to You: ${data.ticketNumber}`,
      html: `
        <div style="${baseStyle}">
          <h2 style="color: #D2811D;">Ticket Assigned to You</h2>
          <p>A ticket has been assigned to you for resolution.</p>
          <div style="background: #FAF7F2; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p><strong>Ticket Number:</strong> ${data.ticketNumber}</p>
            <p><strong>Title:</strong> ${data.ticketTitle}</p>
            <p><strong>Assigned To:</strong> ${data.assigneeName || "You"}</p>
          </div>
          <p>Please review and take necessary action.</p>
          <p style="color: #6B6764; font-size: 12px; margin-top: 24px;">
            — Jambushrusti Ticket Management System
          </p>
        </div>
      `,
    },
    status_changed: {
      subject: `Ticket Status Updated: ${data.ticketNumber}`,
      html: `
        <div style="${baseStyle}">
          <h2 style="color: #D2811D;">Ticket Status Updated</h2>
          <p>The status of a ticket has been updated.</p>
          <div style="background: #FAF7F2; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p><strong>Ticket Number:</strong> ${data.ticketNumber}</p>
            <p><strong>Title:</strong> ${data.ticketTitle}</p>
            <p><strong>Previous Status:</strong> ${data.oldStatus || "N/A"}</p>
            <p><strong>New Status:</strong> ${data.newStatus || "N/A"}</p>
          </div>
          <p style="color: #6B6764; font-size: 12px; margin-top: 24px;">
            — Jambushrusti Ticket Management System
          </p>
        </div>
      `,
    },
    sla_warning: {
      subject: `⚠️ SLA Warning: ${data.ticketNumber}`,
      html: `
        <div style="${baseStyle}">
          <h2 style="color: #D2811D;">⚠️ SLA Deadline Approaching</h2>
          <p>A ticket is approaching its SLA deadline and requires immediate attention.</p>
          <div style="background: #FEF3CD; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #F4B400;">
            <p><strong>Ticket Number:</strong> ${data.ticketNumber}</p>
            <p><strong>Title:</strong> ${data.ticketTitle}</p>
            <p><strong>SLA Deadline:</strong> ${data.slaDeadline || "Approaching soon"}</p>
          </div>
          <p style="color: #dc2626; font-weight: bold;">Please take immediate action to avoid SLA breach.</p>
          <p style="color: #6B6764; font-size: 12px; margin-top: 24px;">
            — Jambushrusti Ticket Management System
          </p>
        </div>
      `,
    },
    resolved: {
      subject: `Ticket Resolved: ${data.ticketNumber}`,
      html: `
        <div style="${baseStyle}">
          <h2 style="color: #16a34a;">✓ Ticket Resolved</h2>
          <p>Your ticket has been resolved.</p>
          <div style="background: #F0FDF4; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #16a34a;">
            <p><strong>Ticket Number:</strong> ${data.ticketNumber}</p>
            <p><strong>Title:</strong> ${data.ticketTitle}</p>
          </div>
          <p>If you have any further issues, please create a new ticket or reopen this one.</p>
          <p style="color: #6B6764; font-size: 12px; margin-top: 24px;">
            — Jambushrusti Ticket Management System
          </p>
        </div>
      `,
    },
  };

  return templates[data.type] || templates.created;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: TicketNotificationRequest = await req.json();
    const template = getEmailTemplate(data);

    // MOCK MODE: Log email instead of sending
    // To enable real emails, add RESEND_API_KEY secret and uncomment the Resend code below
    console.log("=== MOCK EMAIL NOTIFICATION ===");
    console.log("To:", data.recipientEmail || "admin@jambushrusti.com");
    console.log("Subject:", template.subject);
    console.log("Type:", data.type);
    console.log("Ticket:", data.ticketNumber, "-", data.ticketTitle);
    console.log("================================");

    // UNCOMMENT BELOW TO ENABLE REAL EMAILS WITH RESEND:
    // import { Resend } from "npm:resend@2.0.0";
    // const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    // const emailResponse = await resend.emails.send({
    //   from: "Jambushrusti <notifications@yourdomain.com>",
    //   to: [data.recipientEmail || "admin@jambushrusti.com"],
    //   subject: template.subject,
    //   html: template.html,
    // });
    // console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Notification processed (mock mode)",
        type: data.type,
        ticketNumber: data.ticketNumber,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in ticket-notifications function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
