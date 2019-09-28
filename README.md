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