angular.module('crmApp')
    .factory('consultationFactory', function ($http) {
        var baseUrl = "http://localhost:3003/";

         
        function setHeaders(){
            const headers = { 'accept-version': "1.0.0",
            'Authorization': localStorage.getItem('token') }
            return headers;
          }

        /**
         * method to get all consultation from consultation API
         */
        function getConsultations() {
            return $http.get(baseUrl + "consultations",{headers:setHeaders()});
        }

        /**
         * method to get  consultation by customer Id from consultation API
         */
        function getConsultation(customerid) {
            //return $http.get(baseUrl + "consultations?customerId=" + customerid);
            return $http.get(baseUrl + "consultation/" + customerid,{headers:setHeaders()});
        }

        function getConsultationById(id) {
            return $http.get(baseUrl + "consultationbyconsultid/" + id,{headers:setHeaders()});
        }

        /**
         * method to filter out  customers from customer API
         */

        //function filter(label,value) {
        function filter(label, value) {
            // return $http.get(baseUrl+"customers",{params: {fullName:value} });
            var params = {}
            if (label == 'fullName') params["fullName"] = value;
            if (label == 'residenceId') params["residenceId"] = value;
            if (label == 'mobile') params["mobile"] = value;


            return $http.get(baseUrl + "customers", { params },{headers:setHeaders()});
            // return $http.get(baseUrl+"customers",{params: {mobile:value} });

        }


        /**
         * method to update consultation into the DB.
         */
        function create(data) {
            let user = JSON.parse(localStorage.getItem("userData"));
            data.createdBy = {id:user.user_id,name: user.user_label};
            return $http.post(baseUrl + "consultation", data,{headers:setHeaders()})
        }

        /**
         * method to update consultation into the DB.
         */
        function update(data) {
            let user = JSON.parse(localStorage.getItem("userData"));
            data.createdBy = {id:user.user_id,name: user.user_label};
              return $http.put(baseUrl + "consultation/" + data.consultationId, data,{headers:setHeaders()})
        }

        function checkPaymentStatus(consultObj, installment) {
            let status = "Open";
            // total payment is equal to installment amount when emi is 1
            (consultObj.payment.emis == 1 && consultObj.payment.total == installment.amount) ? status = "Close" : status = "Open";
          // status =  (consultObj.payment.emis == 1 && consultObj.payment.total == installment.amount) ? "Close" : "Open";
          
            // let totalInstallmentAmount = parseInt(installment.amount);
            let totalInstallmentAmount = parseInt(installment.amount);
            // when emi is greater then 1 and multiple installments
            if (typeof (consultObj.installments) == "object") {
                 consultObj.installments.forEach(ins => {
                 totalInstallmentAmount = totalInstallmentAmount + parseInt(ins.amount);
              
                });
                (totalInstallmentAmount == consultObj.payment.total) ? status = "Close" : status = "Open";
            }
            return status;
        }

        function paymentPostData(consultObj) {
            if(consultObj.installments.length == 0) consultObj = sampleDetails(consultObj);
            // creating installament obj
            let installmentObj = {
                amount: consultObj.installment.amount,
                mode: consultObj.installment.type,
                date: moment().toISOString()
            }
            // payment object
            let payment = consultObj.payment;
            // setting payment status
            payment.status = checkPaymentStatus(consultObj, consultObj.installment);

            // updating emis if fullpayment is done in first installament
            if (payment.status == "Close" && !consultObj.installments.length) payment.emis = 1;

            // adding installment in array
            consultObj.installments.push(installmentObj)
            //decrease the emi if payment is done before
           
            if (payment.emis > consultObj.installments.length && payment.status == "Close")  payment.emis = consultObj.installments.length;
             
            else if (payment.emis <= consultObj.installments.length && payment.status != "Close")  payment.emis = consultObj.installments.length + 1;
         
            return {
                medicalsummary: consultObj.medicalsummary,
                installments: consultObj.installments,
                payment,
                consultationId: consultObj.consultationId,
                remark:consultObj.remark,
                customerId:consultObj.customerId

            }
        }

        
        function sampleDetails(consultObj){
             // creating medical summary obj
            let medicalsummaryObj = {
                label: 'bloodSample',
                value: true,
                date: consultObj.medicalsummary.date
            };
            
            // blood sample array in medical summarry
            consultObj.medicalsummary.push(medicalsummaryObj);
            return consultObj;
        }

        function paidAmount(consultObj){
              paidAmount = 0;
            consultObj.installments.forEach(ins => {
                paidAmount = parseInt(paidAmount) + parseInt(ins.amount); 
            });
          
            return paidAmount;
        }


        return {
            create: create,
            getConsultations: getConsultations,
            filter: filter,
            getConsultation: getConsultation,
            getConsultationById: getConsultationById,
            update: update,
            paymentPostData: paymentPostData,
            sampleDetails:sampleDetails,
            paidAmount:paidAmount
        }
    });