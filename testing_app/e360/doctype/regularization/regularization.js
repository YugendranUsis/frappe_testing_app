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


// total Hours calculation using check-in and check-out
    frappe.ui.form.on('Regularization', {
        check_in: function (frm) {
            calculate_total_hours(frm);
        },
        check_out: function (frm) {
            calculate_total_hours(frm);
        }
    });
    
    function calculate_total_hours(frm) {
        if (frm.doc.check_in && frm.doc.check_out) {
            const from_datetime = frappe.datetime.str_to_obj(frm.doc.check_in);
            const to_datetime = frappe.datetime.str_to_obj(frm.doc.check_out);
    
            // Calculate the difference in milliseconds
            const diff_in_ms = to_datetime - from_datetime;
    
            // Convert milliseconds to hours
            const hours = diff_in_ms / (1000 * 60 * 60);
    
            // Display as a string with up to 2 decimal places
            frm.set_value('total_hours', hours > 0 ? `${hours.toFixed(2)} hours` : '0 hours');
        }
    }


    
 frappe.ui.form.on("Regularization", {
        onload: function(frm) {
<<<<<<< HEAD
            print 
=======
>>>>>>> parent of e64a3c1 (Revert "faulttesting")
        }
    });