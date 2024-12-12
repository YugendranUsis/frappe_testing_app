// Copyright (c) 2024, yugendran and contributors
// For license information, please see license.txt

frappe.ui.form.on("Leave_Request", {
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

//get total days
    frappe.ui.form.on('Leave_Request', {
        from_date: function (frm) {
            calculate_total_days(frm);
        },
        to_date: function (frm) {
            calculate_total_days(frm);
        }
    });
    
    function calculate_total_days(frm) {
        if (frm.doc.from_date && frm.doc.to_date) {
            const from_date = frappe.datetime.str_to_obj(frm.doc.from_date);
            const to_date = frappe.datetime.str_to_obj(frm.doc.to_date);
            const days = frappe.datetime.get_day_diff(to_date, from_date) + 1;
            frm.set_value('total_days_of_leave', days > 0 ? days : 0);
        }
    }