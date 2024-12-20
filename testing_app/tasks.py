import frappe
import logging

def cron():
    # Add logging for task execution
    logging.info("Cron task started.")
    
    # Your task logic here
    print("\n\nTask executed successfully\n\n")
    
    # Enqueue the email flush
    frappe.enqueue(method="frappe.email.queue.flush", queue="default", timeout=300, is_async=True)
    
    logging.info("Email queue flush enqueued.")
    print("\n\nTask executed successfully\n\n")
