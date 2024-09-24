import { sendEmail } from "@/lib/email";
import contactRequestTemplate, { contactRequestReceived } from "@/lib/email/templates/contactRequest";
import { ProtectedTRPCContext } from "../../trpc";
import { SendContactRequestInput } from "./email.input";

// key: path to template

// const templates = {
//   'query-submission': contactRequestTemplate
// }

export const sendContactRequest = async (ctx: ProtectedTRPCContext, input: SendContactRequestInput) => {
  const res = await sendEmail({
    to: process.env.EMAIL_USER!,
    subject: `New query from ${input.name} (${input.email})`,
    html: contactRequestTemplate(input),
    replyTo: input.email
  });

  if (!res.success) {
    return { error: res.message };
  }

  // send email back to the user
  const userRes = await sendEmail({
    to: input.email,
    subject: "Query received",
    html: contactRequestReceived(input)
  });

  if (!userRes.success) {
    return { error: userRes.message };
  }

  return { success: true };
}