# rfc-parser

A simple RFC date-time format detection library. Currently supports four commonly used RFC date-time formats on the web: 

* RFC3339 
* RFC822 
* RFC2822 
* RFC5322 

If you'd like to add support for more please feel free to submit a pull request. The regex for each RFC might not be inclusive or restrictive enough. If that is the case please let me know or submit an amendment. Thank you!

### Try it out

http://www.lolhistoryapp.com/whatdatetimeformatisthis/


### Java parsing Gist

If you're looking for a library to parse timestamps in java try this https://gist.github.com/oseparovic/d9ee771927ac5f3aefc8ba0b99c0cf38

### More discussion

Details on research and conclusions can be found here https://stackoverflow.com/questions/40369287/what-pattern-should-be-used-to-parse-rfc-3339-datetime-strings-in-java
