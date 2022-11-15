import http from 'k6/http';
import { check, sleep } from "k6";

export let options = {
  stages: [
      // Ramp-up from 1 to 5 virtual users (VUs) in 5s
      { duration: "5s", target: 1000 },

      // Stay at rest on 5 VUs for 10s
      { duration: "50s", target: 5 },

      // Ramp-down from 5 to 0 VUs for 5s
      { duration: "5s", target: 0 }
  ]
};

export default  function () {
var raw = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\r\n\r\n<Request Operation='DecryptPAN'>\r\n\r\n<data>\r\n<EncryptedPan>@0002n22/OHauqW9EQlWTyffQVglzIFt3i42CyH2B9jMywJw=</EncryptedPan>\r\n</data>\r\n\r\n</Request>";
    var requestOptions = {
        headers: {
            "Content-Type": "text/html"
        },
    };
   let res = http.post("http://10.25.45.233:7520/DecryptPAN", raw, requestOptions);
    check(res, {
        'status is 200': (r) => r.status === 200,
      });  
    sleep(.300)  	  
  };