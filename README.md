##
An insurance company has requested the development of a server-side application that can manage some information about the company's insurance policies and customers.

**The company provided two data sources, available on the services:**
* The list of company clients can be found at: http://www.mocky.io/v2/5808862710000087232b75ac
* The list of company policies can be found at: http://www.mocky.io/v2/580891a4100000e8242b75c5

**Restrictions & Constraints**
* Get user data filtered by user id -> Can be accessed by users with role "users" and "admin"
* Get user data filtered by user name -> Can be accessed by users with role "users" and "admin"
* Get the list of policies linked to a user name -> Can be accessed by users with role "admin"
* Get the user linked to a policy number -> Can be accessed by users with role "admin"We have the 
* Think about licenses of 3d party libraries (if needed)
* Authentication and authorization. Take the user role from the web service that returns the list of company clients 







You need to turn on the SQL Server Browser. Go to start up menu or the search and look for SQL Server Configuration Manager. Run it! (Im using Microsoft SQL Server 2017 (RTM) - 14.0.1000.169 (X64)   Aug 22 2017 17:04:49   Copyright (C) 2017 Microsoft Corporation  Express Edition (64-bit) on Windows 10 Pro 10.0 <X64> (Build 18362: ) (Hypervisor))

In the left Tab click on SQL Server Services
now in the right tab double click on SQL Server Browser
will open a window, you will see 3 tabs, go for the Service tab
change start mode to Automatic and apply
left click on SQL Server Browser and click restart

Back to the right tab click on SQL Server Network Configuration

then Client Protocols
change TCP/IP to enable
Let me know if it works.

for simulation purposes the token expiration time has been set to 300 seconds (5minutes)


####Javascript　

```javascript
function test(){
	console.log("Hello world!");
}
 
(function(){
    var box = function(){
        return box.fn.init();
    };

    box.prototype = box.fn = {
        init : function(){
            console.log('box.init()');

			return this;
        },

		add : function(str){
			alert("add", str);

			return this;
		},

		remove : function(str){
			alert("remove", str);

			return this;
		}
    };
    
    box.fn.init.prototype = box.fn;
    
    window.box =box;
})();

var testBox = box();
testBox.add("jQuery").remove("jQuery");
```