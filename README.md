# Mongoose Validation Error Handler
mongoose-validation-error-handler is responsilbe for processing and transfroming mongoose validation error(s) into a readable format.

## Index

* [Install](#install)
* [Usage](#usage)
* [License](#license)

## Install
```bash

npm install --save mongoose-validation-error-handler

```
## Usage
```js
import transform_mongoose_error from 'mongoose-validation-error-handler';

const transform_mongoose_error = require('mongoose-validation-error-handle');
model.save((error, savedModel) => {
	if (error) {
		var errorMessages = transform_mongoose_error(error, {capitalize: true, humanize: true});
	}

});
```
### Options
1. The capitalize option converts the first character of an attribute name to upper case.
    * The attribute first_name is converted to First_name if the capitalize option is true.
2. The humanize options replaces all underscore characters in an attribute name with a white space.
    * The attribute first_name is converted to first name if the humanize option is true.
    
### Error Messages
| Error Kind | Message |
|------------------------|---------------|
| boolean | 'is_active' must be a boolean. |
| buffer | 'bin_data' must be a buffer. |
| CastError | 'User' with the provided 'user_id' doesn't exist. |
| date | 'created_at' must be a date. |
| enum | 'unknown' is an invalid value for the attribute 'user_type'.|
| maxlength | 'identifier' is longer than the maximum allowed length. |
| max | 'fee' is greater than the maximum allowed value. |
| minlength | 'identifier' is shorter than the minimum allowed length. |
| min | 'fee' is less than the minimum allowed value. |
| number | 'age' must be a number. |
| ObjectId | 'user_id' must be an ObjectId |
| required | 'first_name' is Required. |
| unique | email 'youremail@email.com' already exists. |

## License
MIT ©  aderabiruk
