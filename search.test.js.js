var properSearch = require("../validate");
const song = 'Beyonce';
const key = ''

describe.only("Testing initial search", ()=>{
    test("Function returns 10 videos", ()=>{
        expect(properSearch('Beyonce',properSearch.opts)).toHaveLength(10); 
    })
  });

//     test("a valid phone number with -", ()=>{
//        expect(validatePhoneNumber("778-123-4567")).toBe("7781234567"); 
//     });
    
//     test("a valid phone number with ()", ()=>{
//        expect(validatePhoneNumber("(778)-123-4567")).toBe("7781234567");
//        expect(validatePhoneNumber("(778)1234567")).toBe("7781234567");
//        expect(validatePhoneNumber("(778)-1234567")).toBe("7781234567");
//        expect(validatePhoneNumber("(778)123-4567")).toBe("7781234567");
//     });
    
//     test("a valid phone number with space", ()=>{
//        expect(validatePhoneNumber("(778) 123 4567")).toBe("7781234567");
//        expect(validatePhoneNumber("(778)123 4567")).toBe("7781234567");
//        expect(validatePhoneNumber("(778)-123 4567")).toBe("7781234567");
//        expect(validatePhoneNumber("(778)123- 4567")).toBe("7781234567");
//     });
    
//     test("a valid phone number with .", ()=>{
//        expect(validatePhoneNumber("(778).123.4567")).toBe("7781234567");
//        expect(validatePhoneNumber("(778).123 4567")).toBe("7781234567");
//     });
    
//     test("a valid phone number with +1 or just 1", ()=>{
//        expect(validatePhoneNumber("+1(778).123.4567")).toBe("7781234567");
//        expect(validatePhoneNumber("1(778).123 4567")).toBe("7781234567");
//     });
    
//     test("invalid numbers", ()=>{
//         expect(validatePhoneNumber("778bbbeddd")).toBeFalsy();
//         expect(validatePhoneNumber("77812367")).toBeFalsy();
//     })
// });

// var db = [
//     {
//         id:1,
//         name:"blah",
//         age:15
//     },
//     {
//         id:2,
//         name:"blah",
//         age:15,
//         img:"",
//     },
//     {
//         id:3,
//         name:"blah",
//         age:17,
//         img:"",
//     }
// ];

// //pseudo code DOES NOT WORK

// function getDBinfo(callback){
//     db.connect().then(function(){
//         callback(data);
//     })
// }


// describe.only("my data in the database", ()=>{
//    test("right data?", ()=>{
//        /*getDBinfo((data)=>{
           
//        });*/
//        for(var i = 0; i<db.length; i++){
//            expect(db[i]).toHaveProperty("id");
//            expect(db[i]).toHaveProperty("age", 15);
//            expect(db[i]).toHaveProperty("name");
//        }
//    });
// });