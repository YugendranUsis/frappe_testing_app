import frappe
from frappe.email.queue import flush

def cron():
    try:
        # Flush the email queue
        flush()
        frappe.logger().info("Email queue flushed successfully.")
    except Exception as e:
        frappe.logger().error(f"Error flushing email queue: {e}")

# This function will be called by the cron job
def flush_email_queue():
    cron()  # Corrected to 'cron()' instead of 'corn()'
