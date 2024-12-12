// Copyright (c) 2024, yugendran and contributors
// For license information, please see license.txt

 frappe.ui.form.on("Regularization", {
        onload: function(frm) {
            // Get the current logged-in user ID
              if (!frm.doc.employee_number || !frm.doc.employee_name) {
            let user_id = frappe.session.user;
    
            // Fetch employee ID from the User document based on the logged-in user
            frappe.call({
                method: 'frappe.client.get',
                args: {
                    doctype: 'User',
                    filters: { 'name': user_id },
                    fieldname: ['employee_id','full_name']  // Fieldname in User doctype to fetch
                },
                callback: function(r) {
                    if (r.message) {
                        // Set the employee ID in the Personal form's employeenumber field
                        frm.set_value('employee_id', r.message.employee_id);
                        frm.set_value('employee_name', r.message.full_name);
                    }
                }
            });
            }
        }
    });
