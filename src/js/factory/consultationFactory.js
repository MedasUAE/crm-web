angular.module('crmApp')
    .factory('consultationFactory', function ($http) {
        var baseUrl = "http://localhost:3000/";



        /**
         * method to get all consultation from consultation API
         */
        function getConsultations() {
            return $http.get(baseUrl + "consultations");
        }

        /**
         * method to get  consultation by customer Id from consultation API
         */
        function getConsultation(customerid) {
            //return $http.get(baseUrl + "consultations?customerId=" + customerid);
            return $http.get(baseUrl + "consultation/" + customerid);
        }

        function getConsultationById(id) {
            return $http.get(baseUrl + "consultationbyconsultid/" + id);
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


            return $http.get(baseUrl + "customers", { params });
            // return $http.get(baseUrl+"customers",{params: {mobile:value} });

        }


        /**
         * method to update consultation into the DB.
         */
        function create(data) {

            return $http.post(baseUrl + "consultation", data)
        }

        /**
         * method to update consultation into the DB.
         */
        function update(data) {
            return $http.put(baseUrl + "consultation/" + data.consultationId, data)
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
            console.log(consultObj);
          
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
                consultationId: consultObj.consultationId
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


        return {
            create: create,
            getConsultations: getConsultations,
            filter: filter,
            getConsultation: getConsultation,
            getConsultationById: getConsultationById,
            update: update,
            paymentPostData: paymentPostData,
            sampleDetails:sampleDetails
        }
    });