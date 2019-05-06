angular
    .module('crmApp')
    .factory('dataFactory', function(){
        let page = {
            registration: ['firstname', 'lastname', 'emiratesid'],
            login: ['username', 'password']
        }

        let nationalities = ['India', 'Iran', 'UAE', 'Paskitan'];
        let otherids = ['Passport', 'GCC ID', 'Driving License'];
        let sources = ['Event / Exibition', 'Flyer / Brochure', 'News Paper', 'Outdoor Advertisement', 'Passing by', 'Phone Call', 'Radio', 'Referral', 'SMS', 'Social Media', 'Website'];
        let patients = [{"_id":"5ca1c10f286328458f300ceb","index":0,"guid":"384fbcd8-bc3c-4648-bd15-ebfb742f3940","isActive":true,"balance":"3,944.18","gender":"Female","picture":"http://placehold.it/32x32","age":33,"eyeColor":"green","fullname":"Jagdeesh S","company":"VIXO","email":"jagdeesh s@vixo.me","mobile":["+971 (800) 565-3333"],"address":"900 Portal Street, Nescatunga, Virginia, 2625","registered":"17-10-2016 1:53 AM","source":"Advertise","nationality":"UAE","coordinator":"Jeen"},{"_id":"5ca1c10f524acb3cd4555046","index":1,"guid":"a3fad08b-b7b0-4b6b-86ff-d8a27a0af305","isActive":false,"balance":"1,226.44","gender":"Male","picture":"http://placehold.it/32x32","age":27,"eyeColor":"brown","fullname":"Jagdeesh S","company":"HARMONEY","email":"jagdeesh s@harmoney.name","mobile":["+971 (927) 474-3081"],"address":"537 Fulton Street, Vandiver, Illinois, 325","registered":"05-08-2015 5:36 PM","source":"Advertise","nationality":"Iran","coordinator":"Jeen"},{"_id":"5ca1c10f140e3d759918bfbe","index":2,"guid":"cc45d14c-6f6b-4038-b5b9-9585f95abdd9","isActive":false,"balance":"1,308.30","gender":"Female","picture":"http://placehold.it/32x32","age":26,"eyeColor":"green","fullname":"Doney S","company":"COMTENT","email":"doney s@comtent.us","mobile":["+971 (971) 465-2497"],"address":"271 Sharon Street, Kimmell, Colorado, 5720","registered":"02-12-2016 8:56 PM","source":"Advertise","nationality":"UAE","coordinator":"Anitha"},{"_id":"5ca1c10fe635ccf7e7a2cce6","index":3,"guid":"c1200ce0-3a55-4668-b67b-1648c622821f","isActive":false,"balance":"2,498.70","gender":"Female","picture":"http://placehold.it/32x32","age":40,"eyeColor":"brown","fullname":"Nidhiya","company":"GOLOGY","email":"nidhiya@gology.biz","mobile":["+971 (841) 400-3723"],"address":"139 Howard Alley, Skyland, Utah, 9034","registered":"25-12-2015 2:59 PM","source":"Advertise","nationality":"UAE","coordinator":"Anitha"},{"_id":"5ca1c10fd3682910206896d1","index":4,"guid":"e372097c-b903-41d4-800d-3b0560960a17","isActive":true,"balance":"1,992.08","gender":"Male","picture":"http://placehold.it/32x32","age":36,"eyeColor":"green","fullname":"Doney S","company":"STROZEN","email":"doney s@strozen.net","mobile":["+971 (993) 484-2871"],"address":"750 Ford Street, Lewis, Northern Mariana Islands, 2444","registered":"11-10-2016 3:19 AM","source":"Advertise","nationality":"India","coordinator":"Sharon"},{"_id":"5ca1c10f4753fbec1d9a8f5b","index":5,"guid":"ceddec1f-2c1f-4727-819a-834680744bd5","isActive":true,"balance":"2,422.41","gender":"Male","picture":"http://placehold.it/32x32","age":28,"eyeColor":"brown","fullname":"Alem A","company":"QUANTASIS","email":"alem a@quantasis.biz","mobile":["+971 (890) 489-2880"],"address":"794 Canarsie Road, Joppa, Maine, 1670","registered":"18-01-2014 12:12 AM","source":"Radio","nationality":"UAE","coordinator":"Sharon"},{"_id":"5ca1c10f0c8d17496e09dacb","index":6,"guid":"b2d92889-04d0-4ab8-989b-0c22dd13c87b","isActive":true,"balance":"1,821.82","gender":"Male","picture":"http://placehold.it/32x32","age":27,"eyeColor":"brown","fullname":"Divya Mariam","company":"KATAKANA","email":"divya mariam@katakana.io","mobile":["+971 (991) 562-3498"],"address":"518 Randolph Street, Hatteras, Michigan, 3084","registered":"13-04-2014 5:02 PM","source":"Advertise","nationality":"Iran","coordinator":"Kainat"},{"_id":"5ca1c10f0bed09a357f2a031","index":7,"guid":"2ed7b922-4dca-4b24-b78b-7bb63ef65944","isActive":false,"balance":"1,447.76","gender":"Male","picture":"http://placehold.it/32x32","age":30,"eyeColor":"green","fullname":"Doney S","company":"CENTICE","email":"doney s@centice.ca","mobile":["+971 (851) 551-2897"],"address":"962 Atlantic Avenue, Bayview, Federated States Of Micronesia, 7132","registered":"23-07-2014 7:18 PM","source":"Radio","nationality":"UAE","coordinator":"Anitha"},{"_id":"5ca1c10f3288ad3c0286e6e7","index":8,"guid":"66f02b6c-58ce-4bfb-aff0-1487020d4398","isActive":false,"balance":"2,050.77","gender":"Male","picture":"http://placehold.it/32x32","age":25,"eyeColor":"green","fullname":"Sreenathan N","company":"OPTICON","email":"sreenathan n@opticon.com","mobile":["+971 (936) 581-2271"],"address":"634 Henderson Walk, Outlook, California, 194","registered":"17-04-2018 3:51 AM","source":"Web","nationality":"Iran","coordinator":"Anitha"},{"_id":"5ca1c10ffa159771f6ecb898","index":9,"guid":"2b6199a5-c029-48bc-80c9-7f7b706510e7","isActive":true,"balance":"1,813.17","gender":"Female","picture":"http://placehold.it/32x32","age":23,"eyeColor":"green","fullname":"Divya Mariam","company":"ISOTERNIA","email":"divya mariam@isoternia.info","mobile":["+971 (849) 459-3470"],"address":"695 Gold Street, Greer, Nevada, 1407","registered":"22-12-2018 2:15 AM","source":"Radio","nationality":"UAE","coordinator":"Anitha"},{"_id":"5ca1c10f08b8a878adecb75a","index":10,"guid":"873781ff-e50e-496d-9504-dbcf46eefa87","isActive":true,"balance":"1,192.61","gender":"Female","picture":"http://placehold.it/32x32","age":38,"eyeColor":"blue","fullname":"Sreenathan N","company":"BICOL","email":"sreenathan n@bicol.co.uk","mobile":["+971 (913) 504-2505"],"address":"308 Barbey Street, Longbranch, Wyoming, 7721","registered":"24-09-2017 4:20 AM","source":"Advertise","nationality":"India","coordinator":"Anitha"},{"_id":"5ca1c10fb54d27d94be71e56","index":11,"guid":"d8410e06-9392-4d13-a4af-9c072e790b02","isActive":true,"balance":"2,708.59","gender":"Female","picture":"http://placehold.it/32x32","age":21,"eyeColor":"blue","fullname":"Alem A","company":"SLAX","email":"alem a@slax.tv","mobile":["+971 (820) 476-2101"],"address":"881 Hooper Street, Sheatown, Vermont, 3556","registered":"12-12-2017 7:04 PM","source":"Web","nationality":"Iran","coordinator":"Sharon"},{"_id":"5ca1c10ff7757c84ed075225","index":12,"guid":"c2e2965e-ee25-4f67-9166-4fdbd2c53178","isActive":false,"balance":"2,810.69","gender":"Male","picture":"http://placehold.it/32x32","age":29,"eyeColor":"green","fullname":"Talat M","company":"NAMEGEN","email":"talat m@namegen.me","mobile":["+971 (875) 451-3822"],"address":"794 Tabor Court, Witmer, Iowa, 5720","registered":"12-05-2016 8:43 AM","source":"Radio","nationality":"India","coordinator":"Kainat"},{"_id":"5ca1c10f4338d5e60d2eef43","index":13,"guid":"9b270dda-c5fa-4671-a84e-a5f75c3e2b64","isActive":false,"balance":"1,935.59","gender":"Male","picture":"http://placehold.it/32x32","age":39,"eyeColor":"brown","fullname":"Jagdeesh S","company":"ANIXANG","email":"jagdeesh s@anixang.name","mobile":["+971 (911) 506-3108"],"address":"448 Tompkins Place, Goldfield, North Carolina, 8509","registered":"22-12-2017 10:59 PM","source":"Advertise","nationality":"UAE","coordinator":"Anitha"},{"_id":"5ca1c10f4971add913da42a4","index":14,"guid":"49b80473-dc7f-4fcf-a8e3-0d52a3c9c972","isActive":true,"balance":"3,056.32","gender":"Female","picture":"http://placehold.it/32x32","age":39,"eyeColor":"green","fullname":"Talat M","company":"IDETICA","email":"talat m@idetica.us","mobile":["+971 (910) 581-2581"],"address":"534 Rewe Street, Belgreen, Delaware, 9117","registered":"15-11-2018 11:16 AM","source":"Web","nationality":"UAE","coordinator":"Kainat"},{"_id":"5ca1c10f2d3675c8b986ba2a","index":15,"guid":"c1d77a01-280d-41b3-b99d-9d24c90ef3ba","isActive":false,"balance":"1,272.06","gender":"Female","picture":"http://placehold.it/32x32","age":39,"eyeColor":"blue","fullname":"Doney S","company":"PODUNK","email":"doney s@podunk.biz","mobile":["+971 (991) 443-3639"],"address":"920 Farragut Road, Mansfield, Rhode Island, 8829","registered":"14-12-2018 6:06 AM","source":"Web","nationality":"India","coordinator":"Kainat"},{"_id":"5ca1c10fb8508691ef73a890","index":16,"guid":"82a052bf-5a5c-4adb-adfd-d32548cbe088","isActive":false,"balance":"1,490.92","gender":"Female","picture":"http://placehold.it/32x32","age":21,"eyeColor":"green","fullname":"Phllip Loon","company":"FANFARE","email":"phllip loon@fanfare.net","mobile":["+971 (821) 439-2496"],"address":"856 Chapel Street, Noblestown, New Jersey, 3035","registered":"19-04-2016 7:50 PM","source":"Advertise","nationality":"Iran","coordinator":"Sharon"}];
        let tags = [
            { text: 'just' },
            { text: 'some' },
            { text: 'cool' },
            { text: 'tags' }
        ];
        let notes = [{
            remark:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident accusantium, expedita labore assumenda ex eaque voluptatem quae quos numquam vitae eveniet omnis veritatis, officiis sunt et sint ea dolore consectetur! ",
            createdBy: "Kainat",
            createdDate: "12-12-2018"
        },{
            remark:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident accusantium, expedita labore assumenda ex eaque voluptatem quae quos numquam vitae eveniet omnis veritatis, officiis sunt et sint ea dolore consectetur! ",
            createdBy: "Jeen",
            createdDate: "01-01-2019"
        }]

        const userTypes = ["Admin","All"];
        const offices = [{"officeId":101,"officeName":"medas"},{"officeId":102,"officeName":"medas 2"}];
         const callTypes = ["Inbound","Outbound"];
        const statuss = ["Open","Close"];
        const alertTypes = ["Remainder","note"];
        const hairTypes = ["A","B","C"];
        const paymentTypes =  ["Cash", "Cheque","Card"];
       
        

        function getUserType(){
            return userTypes;
        }
        function getPaymentTypes(){
            return paymentTypes;
        }
        

        function getOffices(){
            return offices;
        }
        
        function getSources() {
            return sources;
        }
       

        function getCallTypes(){
            return callTypes;
        }

        function getStatuss(){
            return statuss;
        }

        function getAlertTypes(){
            return alertTypes;
        }
       
        function getPatients(id){
            if(!id) return patients;

            const result = patients.filter(p=>{
                if(p._id == id) return p;
            });
            return result;
        }
        function getNationality(){
            return nationalities;
        }

        function getNotes() {
            return notes;
        }
    
        function getOtherIds(){
            return otherids;
        }


        // function getTags(query) {
        //     if(!query) return tags;
        //     const result = tags.filter(s=>{
        //         if(s.text.includes(query)) return s;
        //     });
        //     if(!result) return []
        //     else return result;
        // }

        function checkTagToAdd(tag){
            const result = sources.filter(s=>{
                if(s.text === (tag.text)) return s;
            });
            console.log(result);

            if(!result.length) return false;
            else return true;
        }

        function dateFormat(eleID) {
            let doc = document.getElementById(eleID)
            doc.setAttribute(
                "data-date",
                moment(doc.value, "YYYY-MM-DD")
                    .format(doc.getAttribute("data-date-format")))
        }

        function ageCal(date){
            const age = parseInt(moment().diff(date,'years',true));
            return age + " years"
        }

        function validate(pageName, data){
            let required = true, fields = []
            page[pageName].forEach((field)=>{
                if(!data[field]) {
                    required = false;
                    fields.push(field)
                };
            }); 
            if(!required)
                alert(fields.join(","))
            return required;
        }

        function getHairType() {
             return hairTypes;
        }


        return {
            validatePage: validate,
            dateFormat: dateFormat,
            ageCal: ageCal,
            getNationality: getNationality,
            getSources: getSources,
            checkTagToAdd: checkTagToAdd,
            getOtherIds: getOtherIds,
            getPatients: getPatients,
            getNotes: getNotes,
            getUserType:getUserType,
            getOffices:getOffices,
            getCallTypes:getCallTypes,
            getStatuss:getStatuss,
            getAlertTypes:getAlertTypes,
            getHairType:getHairType,
            getPaymentTypes:getPaymentTypes

        }
    });
